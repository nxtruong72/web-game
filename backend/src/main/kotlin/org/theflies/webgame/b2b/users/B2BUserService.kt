package org.theflies.webgame.b2b.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.event.ApplicationEventPublisher
import jakarta.inject.Singleton
import org.theflies.webgame.shared.common.DeviceType
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
  fun create(userRequest: UserRegisterRequest, url: String, extraInfo: Pair<DeviceType, String>? = null): UserRegisterResponse {
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

    val (device, ip) = extraInfo ?: Pair(DeviceType.PC_UNKNOWN, "")
    eventPublisher.publishEvent(SendActivationCodeEvent(url, user, device, ip))
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

  fun resendActivationCode(request: UserResendActivationCodeRequest, url: String, extraInfo: Pair<DeviceType, String>?) {
    val user = userRepository.findByEmail(request.email) ?: throw UserException(400, "Email not found")
    if (user.accountStatus != AccountStatus.INACTIVATE) {
      throw UserException(400, "User already activated")
    }

    val (device, ip) = extraInfo ?: Pair(DeviceType.PC_UNKNOWN, "")
    eventPublisher.publishEvent(SendActivationCodeEvent(url, user, device, ip))
  }
}
