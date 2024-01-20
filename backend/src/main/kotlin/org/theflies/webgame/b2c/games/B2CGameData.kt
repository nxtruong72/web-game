package org.theflies.webgame.b2c.games

import io.micronaut.core.annotation.Introspected
import io.micronaut.data.annotation.*
import io.micronaut.serde.annotation.Serdeable.Deserializable
import io.micronaut.serde.annotation.Serdeable.Serializable
import jakarta.validation.constraints.*
import org.theflies.webgame.shared.models.*
import java.math.BigDecimal
import java.time.Instant

@Introspected
@Serializable
data class GameResponse(
  @NotBlank
  val id: Long,

  @NotBlank
  var name: String,

  @NotBlank
  var gameStatus: GameStatus,

  @NotBlank
  var teamOne: String,

  @NotBlank
  var teamTwo: String,

  @NotNull
  var gameTypes: List<GameType>,

  @NotBlank
  var streamURL: String,

  @NotBlank
  var startTime: Instant,

  @NotBlank
  var createdAt: Instant,

  @NotBlank
  var updatedAt: Instant
)

@Introspected
@Serializable
data class RoundResponse (
  var id: Long,

  @NotBlank
  var teamWin: Int,

  @NotBlank
  var roundStatus: RoundStatus,

  @NotBlank
  var createdAt: Instant,

  @NotBlank
  var updatedAt: Instant,
)

@Introspected
@Deserializable
data class BetRequest (
  @NotBlank
  var roundInd: Long,

  @NotBlank
  @Max(2)
  @Min(1)
  var teamBet: Int,

  @Positive
  var amount: BigDecimal,
)

@Introspected
@Deserializable
data class BetResponse (
  @NotBlank
  var id: Long,

  @NotBlank
  var teamBet: Int,

  @NotBlank
  var betStatus: BetStatus,

  @NotBlank
  var amount: BigDecimal,

  @NotBlank
  var createdAt: Instant,

  @NotBlank
  var updatedAt: Instant,
)