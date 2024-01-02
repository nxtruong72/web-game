package org.theflies.webgame.shared.common

import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton
import org.theflies.webgame.shared.models.Token
import org.theflies.webgame.shared.models.TokenType
import org.theflies.webgame.shared.models.User
import org.theflies.webgame.shared.repositories.TokenRepository
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.UUID

@Singleton
class CodeManager(
  private val tokenRepository: TokenRepository,
  @Value("\${app.register.code_expire:1}")
  val expiryTime: Long
) {
  fun generateAndPersistActivateCode(user: User): String {
    val code = UUID.randomUUID().toString()
    val expireAt = Instant.now().plus(expiryTime, ChronoUnit.MINUTES)

    val token = Token(null, code, TokenType.REGISTER_ACTIVATION_CODE, user, expireAt)
    tokenRepository.save(token)
    return code
  }
}
