package org.theflies.webgame.b2c.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.event.ApplicationEventPublisher
import jakarta.inject.Singleton
import org.theflies.webgame.shared.common.PasswordEncoder
import org.theflies.webgame.shared.common.UserException
import org.theflies.webgame.shared.models.AccountStatus
import org.theflies.webgame.shared.models.RoleType
import org.theflies.webgame.shared.models.User
import org.theflies.webgame.shared.repositories.TokenRepository
import org.theflies.webgame.shared.repositories.UserRepository
import java.time.Instant

private val logger = KotlinLogging.logger {  }

@Singleton
class B2CUserService(
  private val userRepository: UserRepository,
  private val tokenRepository: TokenRepository,
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
        accountStatus = AccountStatus.INACTIVATE,
        roles = listOf(RoleType.MEMBER)
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
      userRepository.update(tok.user.id!!, AccountStatus.ACTIVATED)
      tokenRepository.update(tok.id!!, true)
    } ?: {
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
}
