package org.theflies.webgame.shared.models

import io.micronaut.data.annotation.*
import jakarta.validation.constraints.NotBlank
import java.math.BigDecimal
import java.time.Instant

@MappedEntity("rounds")
class Round (
    @field:Id
    @field:GeneratedValue(GeneratedValue.Type.IDENTITY)
    var id: Long? = null,

    @NotBlank
    var teamWin: Int,

    @NotBlank
    var roundStatus: RoundStatus,

    @NotBlank
    var totalBetTeamOne: BigDecimal,

    @NotBlank
    var totalBetTeamTwo: BigDecimal,

    @NotBlank
    var profit: BigDecimal,

    @Relation(value = Relation.Kind.MANY_TO_ONE)
    @MappedProperty("game_id")
    var game: Game,

    @field:DateCreated
    var createdAt: Instant? = null,

    @field:DateUpdated
    var updatedAt: Instant? = null,
)