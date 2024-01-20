package org.theflies.webgame.shared.models

import io.micronaut.data.annotation.*
import io.micronaut.data.model.DataType
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.math.BigDecimal
import java.time.Instant

@MappedEntity("wallets")
class Wallet(
    @field:Id
    @field:GeneratedValue(GeneratedValue.Type.IDENTITY)
    var id: Long? = null,

    @Version
    var version: Long? = null,

    @NotBlank
    var balance: BigDecimal,

    @NotBlank
    var blockedBalance: BigDecimal,

    @NotBlank
    var reward: BigDecimal,

    @NotBlank
    var blockedReward: BigDecimal,

    @Relation(value = Relation.Kind.ONE_TO_ONE)
    @MappedProperty("user_id")
    var user: User? = null,

    @field:DateCreated
    var createdAt: Instant? = null,

    @field:DateUpdated
    var updatedAt: Instant? = null,
)