package org.theflies.webgame.b2c.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Post
import io.micronaut.http.server.util.HttpHostResolver
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule

private val logger = KotlinLogging.logger {  }

@Controller("/b2c/users")
class B2CUserController(
  private val userService: B2CUserService,
  private val hostResolver: HttpHostResolver
) {
  @Post("/")
  @Secured(SecurityRule.IS_ANONYMOUS)
  fun register(@Body user: UserRegisterRequest, request: HttpRequest<*>): HttpResponse<UserRegisterResponse> {
    val appUrl = hostResolver.resolve(request)
    val response = userService.create(user, appUrl)

    return HttpResponse.ok(response)
  }

  @Post("/activate")
  @Secured(SecurityRule.IS_ANONYMOUS)
  fun activation(@Body token: UserActivateRequest): HttpResponse<Any> {
    userService.activate(token)
    return HttpResponse.ok()
  }

  @Post("/forgot-pass")
  @Secured(SecurityRule.IS_ANONYMOUS)
  fun forgotPassword(@Body request: UserForgotPasswordRequest): HttpResponse<Any> {
    userService.forgotPass(request)
    return HttpResponse.ok()
  }

  @Post("/new-pass")
  @Secured(SecurityRule.IS_ANONYMOUS)
  fun newPassword(@Body request: NewPasswordRequest): HttpResponse<Any> {
    userService.newPass(request)
    return HttpResponse.ok()
  }

  @Post("/resend-activate")
  @Secured(SecurityRule.IS_ANONYMOUS)
  fun resendActivation(@Body reactivate: UserResendActivationCodeRequest, request: HttpRequest<*>): HttpResponse<Any> {
    val appUrl = hostResolver.resolve(request)
    userService.resendActivationCode(reactivate, appUrl)
    return HttpResponse.ok()
  }
}