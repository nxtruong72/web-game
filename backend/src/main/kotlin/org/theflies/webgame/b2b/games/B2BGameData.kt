package org.theflies.webgame.b2b.games

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable.Deserializable
import io.micronaut.serde.annotation.Serdeable.Serializable
import jakarta.validation.constraints.*
import org.theflies.webgame.shared.models.*
import java.math.BigDecimal
import java.time.Instant

@Introspected
@Deserializable
data class CreateGameRequest(
  @NotBlank
  var name: String,

  @NotBlank
  var teamOne: String,

  @NotBlank
  var teamTwo: String,

  @Size(min = 1)
  @NotNull
  var gameTypes: List<GameType>,

  @NotBlank
  var streamURL: String,

  var startTime: Instant? = null,
  var planStartTime: Instant? = null,
)

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

  @NotBlank
  var totalBet: Long,

  @NotBlank
  var profit: BigDecimal,

  @NotNull
  var gameTypes: List<GameType>,

  @NotBlank
  var streamURL: String,

  var planStartTime: Instant? = null,

  @NotBlank
  var startTime: Instant? = null,

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
  var totalBetTeamOne: BigDecimal,

  @NotBlank
  var totalBetTeamTwo: BigDecimal,

  @NotBlank
  var profit: BigDecimal,

  @NotBlank
  var createdAt: Instant,

  @NotBlank
  var updatedAt: Instant,
)

@Introspected
@Deserializable
data class RoundEndRequest(
  @Min(1)
  @Max(2)
  var teamWin: Int
)

data class RoundEndedEvent(
  var id: Long,
  var roundStatus: RoundStatus,
  var teamWin: Int
)