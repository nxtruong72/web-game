package org.theflies.webgame.shared.common

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.event.ApplicationEventListener
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.event.LoginSuccessfulEvent
import jakarta.inject.Singleton
import org.theflies.webgame.shared.models.AccountStatus
import org.theflies.webgame.shared.repositories.UserRepository
import java.time.Instant

private val logger = KotlinLogging.logger { }

@Singleton
class UserListener(private val userRepository: UserRepository, private val mailManager: MailManager?, private val codeManager: CodeManager) :
  ApplicationEventListener<Any> {
  override fun onApplicationEvent(event: Any) {
    if (event is RegisterEvent) {
      val user = event.user
      if (user.accountStatus == AccountStatus.INACTIVATE) {
        val activationCode = codeManager.generateAndPersistActivateCode(user)
        if (mailManager != null) {
          mailManager.sendActivateMailFor(user, activationCode)
        } else {
          logger.debug { "Activation code is: $activationCode" }
        }
      }
    } else if (event is LoginSuccessfulEvent) {
      val obj = event.source as Authentication
      logger.debug { "${obj.name} logged in at ${Instant.now()}" }
      val user = userRepository.findByUsername(obj.name)
      // success login, update lastVisited
      user?.let {
        userRepository.update(it.id!!, Instant.now())
      }
    }
  }
}