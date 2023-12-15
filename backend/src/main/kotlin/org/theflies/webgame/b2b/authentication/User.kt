package org.theflies.webgame.b2b.authentication

import io.micronaut.data.annotation.*
import jakarta.validation.constraints.NotBlank
import java.time.LocalDateTime

@MappedEntity
data class User(
  @field:Id
  @GeneratedValue
  var id: Long? = null,

  @NotBlank
  val username: String,

  @NotBlank
  val email: String,

  @NotBlank
  val phone: String? = null,

  @NotBlank
  val password: String,

  @field:DateCreated
  val createdAt: LocalDateTime? = null,

  @field:DateUpdated
  val lastVisitedAt: LocalDateTime? = null,

  val ipCreated: String? = null,

  val ipVisited: String? = null,

  val deviceUsedForLogin: String? = null,

  val deviceUsedForRegister: String? = null,

  val accountStatus: Boolean = true // Assuming true means active and false means locked
)