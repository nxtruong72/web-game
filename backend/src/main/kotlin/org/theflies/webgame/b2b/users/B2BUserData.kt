package org.theflies.webgame.b2b.users

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable.Deserializable
import io.micronaut.serde.annotation.Serdeable.Serializable
import jakarta.validation.constraints.*
import org.theflies.webgame.b2c.users.UserBalance
import org.theflies.webgame.shared.common.RegisterEvent
import org.theflies.webgame.shared.models.AccountStatus
import org.theflies.webgame.shared.models.RoleType
import org.theflies.webgame.shared.models.User
import java.math.BigDecimal

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
  val email: String,
  @Size(min = 1)
  @NotNull
  val roles: List<RoleType>,
  val accountStatus: AccountStatus?
)

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

@Introspected
@Deserializable
data class UserActivateRequest(
  @NotBlank
  val code: String
)

@Introspected
@Deserializable
data class UserResendActivationCodeRequest(
  @NotBlank
  val email: String
)

@Introspected
@Serializable
data class UserResponse(
  @NotBlank
  val id: Long,

  @NotBlank
  val username: String,
  @NotBlank
  val phone: String,
  @NotBlank
  val email: String,
  @Size(min = 1)
  @NotNull
  val roles: List<RoleType>,
  val accountStatus: AccountStatus?,
  val balance: BigDecimal?
)

// Event data
data class UserRegisterEvent(
  @NotBlank
  override val url: String,

  @NotBlank
  override val user: User
): RegisterEvent