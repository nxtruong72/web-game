package org.theflies.webgame.shared.models

import io.micronaut.data.annotation.*
import jakarta.validation.constraints.NotBlank
import java.time.Instant
import java.time.LocalDateTime

@MappedEntity("users")
data class User(
  @field:Id
  @field:GeneratedValue(GeneratedValue.Type.IDENTITY)
  var id: Long? = null,

  @NotBlank
  val username: String,

  @NotBlank
  val email: String,

  @NotBlank
  val phone: String,

  @NotBlank
  val password: String,

  @field:DateCreated
  val createdAt: Instant? = null,

  @field:DateUpdated
  val lastVisitedAt: Instant? = null,

  val ipCreated: String? = null,

  val ipVisited: String? = null,

  val deviceUsedForLogin: String? = null,

  val deviceUsedForRegister: String? = null,

  val accountStatus: Boolean = false // Assuming true means active and false means locked
)
