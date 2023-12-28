package org.theflies.webgame.b2b.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.annotation.Factory
import io.micronaut.data.event.listeners.PostPersistEventListener
import io.micronaut.email.Email
import io.micronaut.email.EmailException
import io.micronaut.email.EmailSender
import io.micronaut.email.MultipartBody
import jakarta.inject.Inject
import jakarta.inject.Singleton
import org.theflies.webgame.shared.models.User

private val logger = KotlinLogging.logger { }

@Factory
class UserListener {
  @Inject
  lateinit var emailSender: EmailSender<Any, Any>

  @Singleton
  fun afterUserPersist(): PostPersistEventListener<User> { // (3)
    return PostPersistEventListener { user: User ->
      logger.debug { "New user ${user.id} created: ${user.username}" }
      emailSender.send(
        Email.builder()
          .from("noreply@theflies.live")
          .to(user.email)
          .subject("Welcome ${user.username}")
          .body(
            MultipartBody(
              "<html><body><strong>Hello</strong> dear Micronaut user.</body></html>", "Hello dear Micronaut user"
            )
          )
      )
    }
  }
}