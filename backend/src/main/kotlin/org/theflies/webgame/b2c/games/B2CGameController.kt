package org.theflies.webgame.b2c.games

import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Post
import io.micronaut.http.server.util.HttpHostResolver
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import jakarta.annotation.security.RolesAllowed
import org.theflies.webgame.b2c.users.*
import java.security.Principal

@Controller("/b2c/games")
class B2CGameController(
    private val gameService: B2BGameService,
    private val hostResolver: HttpHostResolver
) {
  @Post("/bet")
  @Secured(SecurityRule.IS_AUTHENTICATED)
  @RolesAllowed("MEMBER")
  fun register(@Body betRequest: BetRequest,  principal: Principal, request: HttpRequest<*>): HttpResponse<BetResponse> {
    val betResponse = gameService.bet(betRequest, principal)
    return HttpResponse.ok(betResponse);
  }
}