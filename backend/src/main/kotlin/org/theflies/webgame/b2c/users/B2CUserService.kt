package org.theflies.webgame.b2c.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.event.ApplicationEventPublisher
import io.micronaut.core.type.Argument.listOf
import io.micronaut.transaction.annotation.Transactional
import jakarta.inject.Singleton
import org.theflies.webgame.shared.common.PasswordEncoder
import org.theflies.webgame.shared.common.UserException
import org.theflies.webgame.shared.common.WalletException
import org.theflies.webgame.shared.models.*
import org.theflies.webgame.shared.repositories.TokenRepository
import org.theflies.webgame.shared.repositories.TransactionRepository
import org.theflies.webgame.shared.repositories.UserRepository
import org.theflies.webgame.shared.repositories.WalletRepository
import java.math.BigDecimal
import java.security.Principal
import java.time.Instant

private val logger = KotlinLogging.logger {  }

@Singleton
open class B2CUserService(
  private val userRepository: UserRepository,
  private val tokenRepository: TokenRepository,
  private val walletRepository: WalletRepository,
  private val transactionRepository: TransactionRepository,
  private val eventPublisher: ApplicationEventPublisher<Any>,
  private val encoder: PasswordEncoder,
) {
  @Transactional
  open fun create(userRequest: UserRegisterRequest, url: String): UserRegisterResponse {
    val existed =
      userRepository.findByUsernameOrEmailOrPhone(userRequest.username, userRequest.email, userRequest.phone)
    if (existed.isNotEmpty()) {
      throw UserException(400, "User already existed")
    }

    val user = userRepository.save(
      User(
        null,
        userRequest.username,
        userRequest.email,
        userRequest.phone,
        encoder.encode(userRequest.password),
        accountStatus = AccountStatus.INACTIVATE,
        roles = listOf(RoleType.MEMBER)
      )
    )
    walletRepository.save(
      Wallet(
        null,
        0,
        BigDecimal(0),
        BigDecimal(0),
        BigDecimal(0),
        BigDecimal(0),
        user,
      )
    )
    eventPublisher.publishEvent(UserRegisterEvent(url, user))

    return UserRegisterResponse(user.id!!, user.username, user.phone, user.email)
  }

  fun activate(request: UserActivateRequest) {
    val token = tokenRepository.findByToken(request.code)
    token?.let { tok ->
      if (tok.used) {
        throw UserException(400, "Token is used")
      }

      if (tok.user.accountStatus != AccountStatus.INACTIVATE) {
        throw UserException(400, "User already activated")
      }

      if (Instant.now() >= token.expireAt) {
        tokenRepository.delete(token)
        throw UserException(400, "Token is expired")
      }

      logger.debug { "Update user ${tok.user.id}" }
      userRepository.updateAccountStatus(tok.user.id!!, AccountStatus.ACTIVATED)
      tokenRepository.update(tok.id!!, true)
    } ?: run {
      throw UserException(400, "Token not found")
    }
  }

  fun resendActivationCode(request: UserResendActivationCodeRequest, url: String) {
    val user = userRepository.findByEmail(request.email) ?: throw UserException(400, "Email not found")
    if (user.accountStatus != AccountStatus.INACTIVATE) {
      throw UserException(400, "User already activated")
    }

    eventPublisher.publishEvent(UserRegisterEvent(url, user))
  }

  fun forgotPass(request: UserForgotPasswordRequest) {
    val user = userRepository.findByEmail(request.email) ?: throw UserException(400, "Email not found")

    eventPublisher.publishEvent(UserForgotPasswordEvent(user))
  }

  fun newPass(request: NewPasswordRequest) {
    val token = tokenRepository.findByToken(request.code)
    token?.let { tok ->
      if (tok.used) {
        throw UserException(400, "Token is used")
      }
      if (Instant.now() >= token.expireAt) {
        tokenRepository.delete(token)
        throw UserException(400, "Token is expired")
      }

      val password = request.newPassword
      userRepository.updatePassword(tok.user.id!!, encoder.encode(password))
      tokenRepository.update(tok.id!!, true)
    } ?: run {
      throw UserException(400, "Token not found")
    }
  }
  @Transactional
  open fun withdraw(request: WithdrawRequest, principal: Principal) {
    logger.info { "User ${principal.name} request withdraw ${request.amount}" }
    val user = userRepository.findByUsername(principal.name) ?: throw UserException(404, "Username not found")
    val wallet = walletRepository.findByUserIdForUpdate(user.id!!) ?:  throw WalletException(404, "Wallet not found")
    if (wallet.balance < request.amount) {
      throw WalletException(400, "Balance insufficient")
    }
    transactionRepository.save(Transaction(
      null,
      request.amount,
      request.transactionMethod,
      TransactionType.WITHDRAW,
      TransactionStatus.PENDING,
      request.notes,
      wallet
    ))
    wallet.balance = wallet.balance.subtract(request.amount);
    wallet.blockedBalance = wallet.blockedBalance.add(request.amount);
    walletRepository.update(wallet)
  }

  fun balance(principal: Principal): UserBalance {
    logger.info { "Get Balance of user: ${principal.name}" }
    val user = userRepository.findByUsername(principal.name) ?: throw UserException(404, "Username not found")
    val wallet = walletRepository.findByUserIdForUpdate(user.id!!) ?:  throw WalletException(404, "Wallet not found")
    return UserBalance(wallet.balance)
  }
}
