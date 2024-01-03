package org.theflies.webgame.shared.models

import io.micronaut.data.annotation.*
import io.micronaut.data.model.DataType
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.time.Instant

@MappedEntity("users")
data class User(
  @field:Id
  @field:GeneratedValue(GeneratedValue.Type.IDENTITY)
  var id: Long? = null,

  @NotBlank
  var username: String,

  @NotBlank
  var email: String,

  @NotBlank
  var phone: String,

  @NotBlank
  var password: String,

  @field:DateCreated
  var createdAt: Instant? = null,

  @field:DateUpdated
  var updatedAt: Instant? = null,

  var lastVisitedAt: Instant? = null,

  var ipCreated: String? = null,

  var ipVisited: String? = null,

  var deviceUsedForLogin: String? = null,

  var deviceUsedForRegister: String? = null,

  @NotNull
  var accountStatus: AccountStatus = AccountStatus.INACTIVATE, // Assuming true means active and false means locked

  @MappedProperty(type = DataType.STRING)
  @Size(min = 1)
  @NotNull
  var roles: List<RoleType>
)
