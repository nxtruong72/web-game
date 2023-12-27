package org.theflies.webgame.b2b.users

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable.Serializable
import jakarta.validation.constraints.NotBlank

@Introspected
@Serializable
data class UserRegisterResponse (
  @NotBlank
  val id: Long,
  @NotBlank
  val username: String,
  @NotBlank
  val phone: String,
  @NotBlank
  val email: String
)
