package org.theflies.webgame.b2c.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
import io.micronaut.http.server.util.HttpHostResolver
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import org.theflies.webgame.b2b.authentication.UserRegisterRequest

private val logger = KotlinLogging.logger {  }

@Controller("/b2c/users")
class UserController(
  private val userService: UserService,
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
  fun activation(@Body token: UserActivateRequest, request: HttpRequest<*>): HttpResponse<Any> {
    userService.activate(token)
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