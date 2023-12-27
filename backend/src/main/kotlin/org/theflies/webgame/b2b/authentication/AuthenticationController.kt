package org.theflies.webgame.b2b.authentication

import io.micronaut.context.event.ApplicationEventPublisher
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.HttpStatus
import io.micronaut.http.MediaType
import io.micronaut.http.MutableHttpResponse
import io.micronaut.http.annotation.*
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.AuthenticationResponse
import io.micronaut.security.authentication.UsernamePasswordCredentials
import io.micronaut.security.event.LoginFailedEvent
import io.micronaut.security.event.LoginSuccessfulEvent
import io.micronaut.security.handlers.LoginHandler
import io.micronaut.security.rules.SecurityRule
import org.reactivestreams.Publisher
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal


@Controller("/b2b")
class AuthenticationController(
//  private val refreshTokenGenerator: RefreshTokenGenerator,
  private val authenticator: AuthenticationProvider,
  private val loginSuccessfulEventPublisher: ApplicationEventPublisher<LoginSuccessfulEvent>,
  private val loginFailedEventPublisher : ApplicationEventPublisher<LoginFailedEvent>,
  private val loginHandler: LoginHandler<HttpRequest<*>, MutableHttpResponse<*>>,
//  private val jwtTokenValidator: JwtTokenValidator
) {
  private val logger: Logger = LoggerFactory.getLogger(AuthenticationController::class.java)

  @Post("/register")
  fun register(@Body user: UserRegisterRequest): HttpResponse<String> {
    // Add logic to register the user (e.g., store in a database)
    return HttpResponse.ok("B2B Registration Successful")
  }

  @Secured(SecurityRule.IS_ANONYMOUS)
  @Post("/login")
  fun login(@Body credentials: UsernamePasswordCredentials, request: HttpRequest<*>): Publisher<MutableHttpResponse<*>> {
    return Flux.from(authenticator.authenticate(request, credentials))
      .map { authenticationResponse: AuthenticationResponse ->
        if (authenticationResponse.isAuthenticated && authenticationResponse.authentication.isPresent) {
          val authentication = authenticationResponse.authentication.get()
          loginSuccessfulEventPublisher.publishEvent(LoginSuccessfulEvent(authentication))
          return@map loginHandler.loginSuccess(authentication, request)
        } else {
          if (logger.isTraceEnabled) {
            logger.trace("login failed for username: {}", credentials.username)
          }
          loginFailedEventPublisher.publishEvent(LoginFailedEvent(authenticationResponse, credentials))
          return@map loginHandler.loginFailed(authenticationResponse, request)
        }
      }.switchIfEmpty(Mono.defer {
        Mono.just<MutableHttpResponse<Any>>(
          HttpResponse.status(HttpStatus.UNAUTHORIZED)
        )
      })
  }

  @Secured(SecurityRule.IS_AUTHENTICATED)
  @Post("/logout")
  fun logout(): HttpResponse<String> {
    // Add logic to handle logout (if needed)
    return HttpResponse.ok("B2B Logout Successful")
  }

  @Secured(SecurityRule.IS_AUTHENTICATED)
  @Produces(MediaType.TEXT_PLAIN)
  @Get("/me")
  fun me(principal: Principal): String = principal.name
}