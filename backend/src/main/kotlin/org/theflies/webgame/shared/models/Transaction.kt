package org.theflies.webgame.shared.models

import io.micronaut.data.annotation.*
import jakarta.validation.constraints.NotBlank
import java.math.BigDecimal
import java.time.Instant

@MappedEntity("transactions")
class Transaction (
    @field:Id
    @field:GeneratedValue(GeneratedValue.Type.IDENTITY)
    var id: Long? = null,

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

    @Relation(value = Relation.Kind.MANY_TO_ONE)
    @MappedProperty("wallet_id")
    var wallet: Wallet? = null,

    @field:DateCreated
    var createdAt: Instant? = null,

    @field:DateUpdated
    var updatedAt: Instant? = null,
)