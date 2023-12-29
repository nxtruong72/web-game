package org.theflies.webgame.b2b.authentication

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.http.HttpRequest
import io.micronaut.security.authentication.AuthenticationFailureReason
import io.micronaut.security.authentication.AuthenticationProvider
import io.micronaut.security.authentication.AuthenticationRequest
import io.micronaut.security.authentication.AuthenticationResponse
import jakarta.inject.Singleton
import org.reactivestreams.Publisher
import org.theflies.webgame.shared.models.AccountStatus
import org.theflies.webgame.shared.repositories.UserRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.FluxSink

private val logger = KotlinLogging.logger {}

@Singleton
class AuthenticationProvider(
  private val userRepository: UserRepository,
  private val passwordEncoder: PasswordEncoder
) : AuthenticationProvider<HttpRequest<*>> {
  override fun authenticate(
    httpRequest: HttpRequest<*>?,
    authenticationRequest: AuthenticationRequest<*, *>,
  ): Publisher<AuthenticationResponse> {
    return Flux.create({ emitter ->

      val user = userRepository.findByUsernameAndAccountStatus(
        authenticationRequest.identity as String, AccountStatus.ACTIVATED
      )
      user?.let {
        // TODO check user is activated, check user is blocked
        if (passwordEncoder.matches(authenticationRequest.secret as String, user.password)) {
          emitter.next(AuthenticationResponse.success(authenticationRequest.identity as String))
          emitter.complete()
        } else {
          emitter.error(AuthenticationResponse.exception(AuthenticationFailureReason.CREDENTIALS_DO_NOT_MATCH))
        }
      } ?: run {
        emitter.error(AuthenticationResponse.exception(AuthenticationFailureReason.USER_NOT_FOUND))
      }

    }, FluxSink.OverflowStrategy.ERROR)
  }
}