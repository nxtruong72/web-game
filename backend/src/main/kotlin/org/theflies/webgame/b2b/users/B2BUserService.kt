package org.theflies.webgame.b2b.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.event.ApplicationEventPublisher
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import jakarta.inject.Singleton
import org.theflies.webgame.shared.common.PasswordEncoder
import org.theflies.webgame.shared.common.UserException
import org.theflies.webgame.shared.models.*
import org.theflies.webgame.shared.repositories.TokenRepository
import org.theflies.webgame.shared.repositories.UserRepository
import org.theflies.webgame.shared.repositories.WalletRepository
import java.math.BigDecimal
import java.time.Instant

private val logger = KotlinLogging.logger {  }

@Singleton
open class B2BUserService(
  private val userRepository: UserRepository,
  private val tokenRepository: TokenRepository,
  private val walletRepository: WalletRepository,
  private val eventPublisher: ApplicationEventPublisher<Any>,
  private val encoder: PasswordEncoder,
) {
  fun create(userRequest: UserRegisterRequest, url: String): UserRegisterResponse {
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
        accountStatus = userRequest.accountStatus ?: AccountStatus.INACTIVATE,
        roles = userRequest.roles
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

  fun getUser(pageable: Pageable): Page<UserResponse> {
    return userRepository
      .findAll(pageable)
      .map { mapUserToUserResponse(it) }
  }

  private fun mapUserToUserResponse(user: User): UserResponse {
    return UserResponse(
      user.id!!,
      user.username,
      user.phone,
      user.email,
      user.roles,
      user.accountStatus,
      user.wallet?.balance
    )
  }

  fun resendActivationCode(request: UserResendActivationCodeRequest, url: String) {
    val user = userRepository.findByEmail(request.email) ?: throw UserException(400, "Email not found")
    if (user.accountStatus != AccountStatus.INACTIVATE) {
      throw UserException(400, "User already activated")
    }

    eventPublisher.publishEvent(UserRegisterEvent(url, user))
  }
}
