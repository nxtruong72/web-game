package org.theflies.webgame.b2b.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
import io.micronaut.http.server.util.HttpHostResolver
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import jakarta.annotation.security.RolesAllowed
import org.theflies.webgame.shared.common.extraInfo

private val logger = KotlinLogging.logger {  }

@Controller("/b2b/users")
class B2BUserController(
  private val userService: B2BUserService,
  private val hostResolver: HttpHostResolver
) {
  @Post("/")
  @RolesAllowed("ADMIN", "STAFF")
  fun register(@Body user: UserRegisterRequest, request: HttpRequest<*>): HttpResponse<UserRegisterResponse> {
    val appUrl = hostResolver.resolve(request)
    val response = userService.create(user, appUrl, request.extraInfo())

    return HttpResponse.ok(response)
  }
//
  @Post("/activate")
  @RolesAllowed("ADMIN", "STAFF")
  fun activation(@Body token: UserActivateRequest, request: HttpRequest<*>): HttpResponse<Any> {
    userService.activate(token)
    return HttpResponse.ok()
  }
//
  @Post("/resend-activate")
  @RolesAllowed("ADMIN", "STAFF")
  fun resendActivation(@Body reactivate: UserResendActivationCodeRequest, request: HttpRequest<*>): HttpResponse<Any> {
    val appUrl = hostResolver.resolve(request)
    userService.resendActivationCode(reactivate, appUrl, request.extraInfo())
    return HttpResponse.ok()
  }
}