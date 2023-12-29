package org.theflies.webgame.b2b.users

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.event.ApplicationEventPublisher
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.HttpStatus
import io.micronaut.http.MediaType
import io.micronaut.http.MutableHttpResponse
import io.micronaut.http.annotation.*
import io.micronaut.http.context.ServerRequestContext
import io.micronaut.http.server.util.HttpHostResolver
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.AuthenticationResponse
import io.micronaut.security.event.LoginFailedEvent
import io.micronaut.security.event.LoginSuccessfulEvent
import io.micronaut.security.handlers.LoginHandler
import io.micronaut.security.rules.SecurityRule
import org.reactivestreams.Publisher
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.theflies.webgame.b2b.authentication.UserRegisterRequest
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal

private val logger = KotlinLogging.logger {  }

@Controller("/b2b/users")
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
}