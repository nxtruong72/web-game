package org.theflies.webgame.shared.common

import io.micronaut.context.annotation.Requires
import io.micronaut.email.BodyType
import io.micronaut.email.Email
import io.micronaut.email.EmailSender
import io.micronaut.email.MultipartBody
import io.micronaut.email.template.TemplateBody
import io.micronaut.views.ModelAndView
import jakarta.inject.Singleton
import org.theflies.webgame.shared.models.User

@Singleton
@Requires(property = "mailjet.enabled", value = "true", defaultValue = "false")
class MailManager(
  private val emailSender: EmailSender<Any, Any>
) {

  fun sendActivateMailFor(user: User, activationCode: String, url: String) {
    val body = mapOf(
      "username" to user.username,
      "activationCode" to activationCode,
      "activationUrl" to url
    )
    emailSender.send(
      Email.builder()
        .from("Web Game <noreply@theflies.live>")
        .to(user.email)
        .subject("Activate your account")
        .body(
          MultipartBody(
            TemplateBody(BodyType.HTML, ModelAndView("activate_html", body)),
            TemplateBody(BodyType.TEXT, ModelAndView("activate_text", body))
          )
        )
    )
  }

  fun sendNewPassMailFor(user: User, newPass: String, appUrl: String) {
    val body = mapOf(
      "username" to user.username,
      "newPassCode" to newPass,
      "newPassUrl" to appUrl,
    )
    emailSender.send(
      Email.builder()
        .from("Web Game <noreply@theflies.live>")
        .to(user.email)
        .subject("Your password is refreshed")
        .body(
          MultipartBody(
            TemplateBody(BodyType.HTML, ModelAndView("forgot_pass_html", body)),
            TemplateBody(BodyType.TEXT, ModelAndView("forgot_pass_text", body))
          )
        )
    )
  }
}
