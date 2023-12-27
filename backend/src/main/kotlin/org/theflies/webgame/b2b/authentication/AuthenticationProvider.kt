package org.theflies.webgame.b2b.authentication

import io.micronaut.http.HttpRequest
import io.micronaut.security.authentication.AuthenticationProvider
import io.micronaut.security.authentication.AuthenticationRequest
import io.micronaut.security.authentication.AuthenticationResponse
import jakarta.inject.Singleton
import org.reactivestreams.Publisher
import reactor.core.publisher.Flux
import reactor.core.publisher.FluxSink

@Singleton
class AuthenticationProvider: AuthenticationProvider<HttpRequest<*>> {
  override fun authenticate(
    httpRequest: HttpRequest<*>?,
    authenticationRequest: AuthenticationRequest<*, *>?
  ): Publisher<AuthenticationResponse> {
    return Flux.create({ emitter ->
                       if (authenticationRequest?.identity == "admin" && authenticationRequest.secret == "admin") {
                         emitter.next(AuthenticationResponse.success(authenticationRequest.identity as String))
                         emitter.complete()
                       } else {
                         emitter.error(AuthenticationResponse.exception())
                       }
    }, FluxSink.OverflowStrategy.ERROR)
  }
}