package org.theflies.webgame.b2b.games

import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import jakarta.annotation.security.RolesAllowed

@Controller("/b2b/games")
class B2BGameController(
    private val gameService: B2BGameService,
) {
    @Post("/")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun createGame(@Body createGameRequest: CreateGameRequest, request: HttpRequest<*>): HttpResponse<GameResponse> {
        val gameResponse = gameService.createGame(createGameRequest)
        return HttpResponse.ok(gameResponse)
    }

    @Post("/{gameId}/start")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun startGame(gameId: Long, request: HttpRequest<*>): HttpResponse<GameResponse> {
        val gameResponse = gameService.startGame(gameId)
        return HttpResponse.ok(gameResponse)
    }

    @Post("/{gameId}/stop")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun stopGame(gameId: Long, request: HttpRequest<*>): HttpResponse<GameResponse> {
        val gameResponse = gameService.stopGame(gameId)
        return HttpResponse.ok(gameResponse)
    }

    @Post("/{gameId}/cancel")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun cancelGame(gameId: Long, request: HttpRequest<*>): HttpResponse<GameResponse> {
        val gameResponse = gameService.cancelGame(gameId)
        return HttpResponse.ok(gameResponse)
    }

    @Post("/{gameId}/rounds")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun createRounds(gameId: Long, request: HttpRequest<*>): HttpResponse<RoundResponse> {
        val roundResponse = gameService.createNewRound(gameId)
        return HttpResponse.ok(roundResponse)
    }

    @Post("/{gameId}/rounds/{roundId}/end")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun endRound (gameId: Long, roundId: Long, @Body endRequest: RoundEndRequest, request: HttpRequest<*>): HttpResponse<RoundResponse> {
        val roundResponse = gameService.endRound(roundId, endRequest)
        return HttpResponse.ok(roundResponse)
    }

    @Post("/{gameId}/rounds/{roundId}/cancel")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun cancelRounds(gameId: Long, roundId: Long, request: HttpRequest<*>): HttpResponse<RoundResponse> {
        val roundResponse = gameService.cancelRound(roundId)
        return HttpResponse.ok(roundResponse)
    }

    @Get("/")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun withdraw(pageable: Pageable, request: HttpRequest<*>): HttpResponse<Page<GameResponse>> {
        return HttpResponse.ok(gameService.getGame(pageable))
    }

    @Get("/round/{id}")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun withdraw(id: Long, pageable: Pageable, request: HttpRequest<*>): HttpResponse<Page<RoundResponse>> {
        return HttpResponse.ok(gameService.getRoundByGameId(id, pageable))
    }
}