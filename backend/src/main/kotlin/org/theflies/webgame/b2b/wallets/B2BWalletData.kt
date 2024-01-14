package org.theflies.webgame.b2b.wallets

import io.micronaut.core.annotation.Introspected
import io.micronaut.data.annotation.DateCreated
import io.micronaut.data.annotation.DateUpdated
import io.micronaut.data.annotation.MappedProperty
import io.micronaut.data.annotation.Relation
import io.micronaut.serde.annotation.Serdeable.Deserializable
import io.micronaut.serde.annotation.Serdeable.Serializable
import jakarta.validation.constraints.*
import org.theflies.webgame.shared.common.RegisterEvent
import org.theflies.webgame.shared.models.*
import java.math.BigDecimal
import java.time.Instant
import java.util.StringJoiner

@Introspected
@Deserializable
data class UserDepositRequest(
  @NotBlank
  val userId: Long,

  @NotBlank
  @Positive
  val amount: BigDecimal,

  @NotBlank
  val transactionMethod: Method,

  @NotBlank
  val notes: String,
)


@Introspected
@Deserializable
data class UserWithdrawApprovalRequest(
  @NotBlank
  @Positive
  val approval: Boolean
)

@Introspected
@Serializable
data class TransactionResponse(
  @NotBlank
  val id: Long,

  @NotBlank
  var amount: BigDecimal,

  @NotBlank
  var transactionMethod: Method,

  @NotBlank
  var transactionType: TransactionType,

  @NotBlank
  var transactionStatus: TransactionStatus,

  @NotBlank
  var notes: String,

  @NotBlank
  var createdAt: Instant,

  @NotBlank
  var updatedAt: Instant
)