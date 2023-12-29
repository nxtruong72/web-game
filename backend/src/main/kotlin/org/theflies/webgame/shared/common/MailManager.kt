package org.theflies.webgame.shared.common

import io.micronaut.context.annotation.Requires
import io.micronaut.context.annotation.Value
import io.micronaut.email.BodyType
import io.micronaut.email.Email
import io.micronaut.email.EmailSender
import io.micronaut.email.MultipartBody
import io.micronaut.email.template.TemplateBody
import io.micronaut.views.ModelAndView
import jakarta.inject.Singleton
import org.theflies.webgame.shared.models.User

@Singleton
@Requires(property="mailjet.enabled", value="true", defaultValue = "false")
class MailManager(
  private val emailSender: EmailSender<Any, Any>,
  @Value("\${mail.enabled:true}")
  private val enabled: Boolean
) {

  fun sendActivateMailFor(user: User) {
    if (enabled) {
      emailSender.send(
        Email.builder()
          .from("noreply@theflies.live")
          .to(user.email)
          .subject("Activate your account")
          .body(
            MultipartBody(
              TemplateBody(BodyType.HTML, ModelAndView("activate_html", user)),
              TemplateBody(BodyType.TEXT, ModelAndView("activate_text", user))
            )
          )
      )
    }
  }
}
