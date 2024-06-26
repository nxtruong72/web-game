package org.theflies.webgame.shared.common

import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton
import org.theflies.webgame.shared.models.Token
import org.theflies.webgame.shared.models.TokenType
import org.theflies.webgame.shared.models.User
import org.theflies.webgame.shared.repositories.TokenRepository
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*


@Singleton
class CodeManager(
  private val tokenRepository: TokenRepository,
  @Value("\${app.user.register.code_expire:1}")
  val registerCodeExpireTime: Long,
  @Value("\${app.user.forgot_pass.code_expire:1}")
  val forgotPassCodeExpireTime: Long
) {
  fun generateAndPersistActivateCode(user: User): String {
    return generateAndPersistToken(user, registerCodeExpireTime, TokenType.REGISTER_ACTIVATION_CODE)
  }

  fun generateAndPersistNewPassword(user: User): String {
    return generateAndPersistToken(user, forgotPassCodeExpireTime, TokenType.FORGOT_PASSWORD_CODE)
  }

  private fun generateAndPersistToken(user: User, time: Long, type: TokenType): String {
    val code = UUID.randomUUID().toString()
    val expireAt = Instant.now().plus(time, ChronoUnit.MINUTES)

    val token = Token(null, code, type, user, expireAt)
    tokenRepository.save(token)
    return code
  }
}
