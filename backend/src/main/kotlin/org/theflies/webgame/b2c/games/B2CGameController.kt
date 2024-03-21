package org.theflies.webgame.b2c.games

import io.micronaut.core.convert.format.Format
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
import io.micronaut.http.server.util.HttpHostResolver
import jakarta.annotation.security.RolesAllowed
import org.theflies.webgame.b2c.games.GameResponse
import org.theflies.webgame.b2c.users.*
import java.security.Principal
import java.time.Instant
import java.time.ZonedDateTime

@Controller("/b2c/games")
class B2CGameController(
    private val gameService: B2CGameService,
    private val hostResolver: HttpHostResolver
) {
  @Post("/bet")
  @RolesAllowed("MEMBER")
  fun bet(@Body betRequest: BetRequest,  principal: Principal, request: HttpRequest<*>): HttpResponse<BetResponse> {
    val betResponse = gameService.bet(betRequest, principal)
    return HttpResponse.ok(betResponse);
  }

    @Get("/{id}")
    @RolesAllowed("MEMBER")
    fun getGameById(id: Long, request: HttpRequest<*>): HttpResponse<GameResponse> {
        return HttpResponse.ok(gameService.getGameById(id))
    }

    @Get("/")
    @RolesAllowed("MEMBER")
    fun listGames(pageable: Pageable, request: HttpRequest<*>): HttpResponse<Page<GameResponse>> {
        return HttpResponse.ok(gameService.listGame(pageable))
    }

    @Get("/{gameId}/rounds")
    @RolesAllowed("MEMBER")
    fun listRounds(gameId: Long, principal: Principal, pageable: Pageable, request: HttpRequest<*>): HttpResponse<Page<RoundResponse>> {
        return HttpResponse.ok(gameService.listRoundByGameId(gameId, principal, pageable))
    }

    @Get("/rounds/{roundId}")
    @RolesAllowed("MEMBER")
    fun getSpecificRounds(roundId: Long, principal: Principal, request: HttpRequest<*>): HttpResponse<RoundResponse> {
        return HttpResponse.ok(gameService.getRoundById(roundId, principal))
    }

    @Get("/rounds/{roundId}/bets")
    @RolesAllowed("MEMBER")
    fun listBestByRounds(roundId: Long, principal: Principal, request: HttpRequest<*>): HttpResponse<List<BetResponse>> {
        return HttpResponse.ok(gameService.listBetByRoundIdAndPrincipal(roundId, principal))
    }

    @Get("/bets")
    @RolesAllowed("MEMBER")
    fun listBetAfterTime(@QueryValue time: Long, principal: Principal, request: HttpRequest<*>): HttpResponse<List<BetResponse>> {
        return HttpResponse.ok(gameService.listBetAfterTime(Instant.ofEpochSecond(time), principal))
    }
}