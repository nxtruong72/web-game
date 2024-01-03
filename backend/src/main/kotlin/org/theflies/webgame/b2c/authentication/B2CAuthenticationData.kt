package org.theflies.webgame.b2c.authentication

import io.micronaut.core.annotation.Introspected
import io.micronaut.security.authentication.AuthenticationRequest
import io.micronaut.serde.annotation.Serdeable.Deserializable

@Introspected
@Deserializable
data class UserLoginRequest(
  val username: String,
  val password: String
): AuthenticationRequest<String, String> {
  override fun getIdentity(): String {
    return username
  }

  override fun getSecret(): String {
    return password
  }
}