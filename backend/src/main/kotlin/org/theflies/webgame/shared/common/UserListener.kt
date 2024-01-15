package org.theflies.webgame.shared.common

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.annotation.Value
import io.micronaut.context.event.ApplicationEventListener
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.event.LoginFailedEvent
import io.micronaut.security.event.LoginSuccessfulEvent
import jakarta.inject.Singleton
import org.theflies.webgame.b2c.users.UserForgotPasswordEvent
import org.theflies.webgame.shared.models.AccountStatus
import org.theflies.webgame.shared.repositories.UserRepository
import java.time.Instant

private val logger = KotlinLogging.logger { }

@Singleton
class UserListener(
  private val userRepository: UserRepository,
  private val mailManager: MailManager?,
  private val codeManager: CodeManager,
  @Value("\${app.user.register.path:}")
  private val activatePath: String,
  @Value("\${app.user.forgot_pass.path:}")
  private val newPasswordPath: String,
  @Value("\${app.site_url:http://localhost:8080}")
  private val appDomain: String
) :
  ApplicationEventListener<Any> {
  override fun onApplicationEvent(event: Any) {
    when (event) {
      is RegisteredEvent -> {
        processRegisterEvent(event)
      }

      is LoginSuccessfulEvent -> {
        processLoginSuccessEvent(event)
      }

      is LoginFailedEvent -> {
        processLoginFailedEvent(event)
      }

      is UserForgotPasswordEvent -> {
        processForgotPasswordEvent(event)
      }
    }
  }

  private fun processLoginFailedEvent(event: LoginFailedEvent) {
    TODO("Not yet implemented")
  }

  private fun processForgotPasswordEvent(event: UserForgotPasswordEvent) {
    val user = event.user
    val newPassCode = codeManager.generateAndPersistNewPassword(user)
    val newPassUrl = "${appDomain}$newPasswordPath/$newPassCode"
    if (mailManager != null) {
      mailManager.sendNewPassMailFor(user, newPassCode, newPassUrl)
    } else {
      logger.debug { "New password code for user: $newPassCode, user: ${user.username}, url: $newPassUrl" }
    }
  }

  private fun processLoginSuccessEvent(event: LoginSuccessfulEvent) {
    val obj = event.source as Authentication
    logger.debug { "${obj.name} logged in at ${Instant.now()}" }
    val user = userRepository.findByUsername(obj.name)
    // success login, update lastVisited
    user?.let {
      userRepository.updateLastVisitedAt(it.id!!, Instant.now())
    }
  }

  private fun processRegisterEvent(
    event: RegisteredEvent,
  ) {
    val user = event.user
    if (user.accountStatus == AccountStatus.INACTIVATE) {
      val activationCode = codeManager.generateAndPersistActivateCode(user)
      val activateUrl = "${appDomain}$activatePath/$activationCode"
      if (mailManager != null) {
        mailManager.sendActivateMailFor(user, activationCode, activateUrl)
      } else {
        logger.debug { "Activation code is: $activationCode, user: ${user.username} url: $activateUrl" }
      }
    }
  }
}