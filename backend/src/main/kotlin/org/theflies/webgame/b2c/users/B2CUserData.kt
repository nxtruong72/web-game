package org.theflies.webgame.b2c.users

import io.micronaut.core.annotation.Introspected
import io.micronaut.data.annotation.DateCreated
import io.micronaut.data.annotation.DateUpdated
import io.micronaut.data.annotation.GeneratedValue
import io.micronaut.data.annotation.Id
import io.micronaut.serde.annotation.Serdeable.Deserializable
import io.micronaut.serde.annotation.Serdeable.Serializable
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Positive
import org.theflies.webgame.shared.common.RegisterEvent
import org.theflies.webgame.shared.models.Method
import org.theflies.webgame.shared.models.User
import java.math.BigDecimal
import java.time.Instant

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
@Deserializable
data class UserForgotPasswordRequest(
  @NotBlank
  val email: String
)

@Introspected
@Serializable
data class UserProfile(
  @NotBlank
  var id: Long,

  @NotBlank
  var username: String,

  @NotBlank
  var email: String,

  @NotBlank
  var phone: String,

  @field:DateCreated
  var createdAt: Instant? = null,

  @field:DateUpdated
  var updatedAt: Instant? = null,
)

@Introspected
@Serializable
data class UserBalance(
  @NotBlank
  val balance: BigDecimal
)

@Introspected
@Deserializable
data class NewPasswordRequest(
  @NotBlank
  val code: String,
  @NotBlank
  val newPassword: String,
)

@Introspected
@Deserializable
data class ChangePasswordRequest(
  @NotBlank
  val oldPassword: String,
  @NotBlank
  val newPassword: String,
)

@Introspected
@Deserializable
data class WithdrawRequest(
  @NotBlank
  @Positive
  val amount: BigDecimal,

  @NotBlank
  val transactionMethod: Method,

  @NotBlank
  val notes: String,
)

data class UserForgotPasswordEvent(
  @NotBlank
  val user: User
)

// Event data
data class UserRegisterEvent(
  @NotBlank
  override val url: String,

  @NotBlank
  override val user: User
): RegisterEvent