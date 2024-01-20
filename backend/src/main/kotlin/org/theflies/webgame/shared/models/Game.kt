package org.theflies.webgame.shared.models

import io.micronaut.data.annotation.*
import io.micronaut.data.model.DataType
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.math.BigDecimal
import java.time.Instant

@MappedEntity("games")
class Game (
    @field:Id
    @field:GeneratedValue(GeneratedValue.Type.IDENTITY)
    var id: Long? = null,

    @NotBlank
    var name: String,

    @NotBlank
    var gameStatus: GameStatus,

    @NotBlank
    var teamOne: String,

    @NotBlank
    var teamTwo: String,

    @MappedProperty(type = DataType.STRING)
    @Size(min = 1)
    @NotNull
    var gameTypes: List<GameType>,

    @NotBlank
    var totalBet: Long,

    @NotBlank
    var profit: BigDecimal,

    @NotBlank
    var streamURL: String,

    var startTime: Instant? = null,

    var avatarURL: String? = null,

    @field:DateCreated
    var createdAt: Instant? = null,

    @field:DateUpdated
    var updatedAt: Instant? = null,
)