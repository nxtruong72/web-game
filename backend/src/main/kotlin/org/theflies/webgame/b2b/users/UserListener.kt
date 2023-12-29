package org.theflies.webgame.b2b.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.event.ApplicationEventListener
import jakarta.inject.Singleton
import org.theflies.webgame.shared.common.MailManager
import org.theflies.webgame.shared.models.AccountStatus

private val logger = KotlinLogging.logger { }

@Singleton
class UserListener(private val mailManager: MailManager?) : ApplicationEventListener<Any> {
  override fun onApplicationEvent(event: Any) {
    if (event is UserRegisterEvent) {
      val user = event.user
      if (user.accountStatus == AccountStatus.INACTIVATE && mailManager != null) {
        mailManager.sendActivateMailFor(user)
      }
    }
  }
}