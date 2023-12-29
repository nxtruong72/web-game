package org.theflies.webgame.b2b.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.annotation.Factory
import io.micronaut.context.event.ApplicationEventListener
import io.micronaut.data.event.listeners.PostPersistEventListener
import io.micronaut.data.event.listeners.PrePersistEventListener
import io.micronaut.email.Email
import io.micronaut.email.EmailException
import io.micronaut.email.EmailSender
import io.micronaut.email.MultipartBody
import jakarta.inject.Inject
import jakarta.inject.Singleton
import org.theflies.webgame.shared.common.MailManager
import org.theflies.webgame.shared.common.thenRun
import org.theflies.webgame.shared.models.AccountStatus
import org.theflies.webgame.shared.models.User

private val logger = KotlinLogging.logger { }

@Singleton
class UserListener(private val mailManager: MailManager): ApplicationEventListener<Any> {
  override fun onApplicationEvent(event: Any) {
    if (event is UserRegisterEvent) {
      val user = event.user
      (user.accountStatus == AccountStatus.INACTIVATE) thenRun mailManager.sendActivateMailFor(user)
    }
  }
}