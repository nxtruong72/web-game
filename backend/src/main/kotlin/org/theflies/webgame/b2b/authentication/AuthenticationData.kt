package org.theflies.webgame.b2b.authentication

import io.micronaut.core.annotation.Introspected
import io.micronaut.security.authentication.AuthenticationRequest
import io.micronaut.serde.annotation.Serdeable.Deserializable
import jakarta.validation.constraints.NotBlank

@Introspected
@Deserializable
data class UserRegisterRequest(
  @NotBlank
  val username: String,
  @NotBlank
  val password: String,
  @NotBlank
  val phone: String,
  @NotBlank
  val email: String
)

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