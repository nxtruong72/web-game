package org.theflies.webgame.b2b.users

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable.Serializable
import jakarta.validation.constraints.NotBlank
import org.theflies.webgame.shared.models.User

@Introspected
@Serializable
data class UserRegisterResponse(
  @NotBlank
  val id: Long,
  @NotBlank
  val username: String,
  @NotBlank
  val phone: String,
  @NotBlank
  val email: String
)

// Event data
data class UserRegisterEvent(
  @NotBlank
  val url: String,

  @NotBlank
  val user: User
)