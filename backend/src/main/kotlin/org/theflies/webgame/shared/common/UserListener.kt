package org.theflies.webgame.shared.common

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.annotation.Value
import io.micronaut.context.event.ApplicationEventListener
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.event.LoginSuccessfulEvent
import jakarta.inject.Singleton
import org.theflies.webgame.shared.models.AccountStatus
import org.theflies.webgame.shared.repositories.UserRepository
import java.time.Instant

private val logger = KotlinLogging.logger { }

@Singleton
class UserListener(
  private val userRepository: UserRepository,
  private val mailManager: MailManager?,
  private val codeManager: CodeManager,
  @Value("\${app.register.activate_path:}")
  private val activatePath: String,
  @Value("\${app.site_url:http://localhost:8080}")
  private val activateDomain: String) :
  ApplicationEventListener<Any> {
  override fun onApplicationEvent(event: Any) {
    if (event is RegisterEvent) {
      processRegisterEvent(event, mailManager)
    } else if (event is LoginSuccessfulEvent) {
      processLoginSuccessEvent(event)
    }
  }

  private fun processLoginSuccessEvent(event: LoginSuccessfulEvent) {
    val obj = event.source as Authentication
    logger.debug { "${obj.name} logged in at ${Instant.now()}" }
    val user = userRepository.findByUsername(obj.name)
    // success login, update lastVisited
    user?.let {
      userRepository.update(it.id!!, Instant.now())
    }
  }

  private fun processRegisterEvent(
    event: RegisterEvent,
    mailManager: MailManager?
  ) {
    val user = event.user
    if (user.accountStatus == AccountStatus.INACTIVATE) {
      val activationCode = codeManager.generateAndPersistActivateCode(user)
      val activateUrl = "${activateDomain}$activatePath/$activationCode"
      if (mailManager != null) {
        mailManager.sendActivateMailFor(user, activationCode, activateUrl)
      } else {
        logger.debug { "Activation code is: $activationCode, url: $activateUrl" }
      }
    }
  }
}