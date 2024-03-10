package org.theflies.webgame.shared.models

import io.micronaut.data.annotation.*
import io.micronaut.data.annotation.Relation.Cascade
import jakarta.validation.constraints.NotBlank
import java.math.BigDecimal
import java.time.Instant

@MappedEntity("bets")
class Bet (
    @field:Id
    @field:GeneratedValue(GeneratedValue.Type.IDENTITY)
    var id: Long? = null,

    @NotBlank
    var teamBet: Int,

    @NotBlank
    var betStatus: BetStatus,

    @NotBlank
    var amount: BigDecimal,

    @Relation(value = Relation.Kind.MANY_TO_ONE)
    @MappedProperty("round_id")
    var round: Round? = null,

    @Relation(value = Relation.Kind.MANY_TO_ONE)
    @MappedProperty("wallet_id")
    var wallet: Wallet? = null,

    @field:DateCreated
    var createdAt: Instant? = null,

    @field:DateUpdated
    var updatedAt: Instant? = null,
)