package org.theflies.webgame.shared.common

import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.server.exceptions.ExceptionHandler
import jakarta.inject.Singleton
import org.theflies.webgame.shared.models.ErrorResponse

@Singleton
class GameExceptionHandler: ExceptionHandler<GameException, HttpResponse<ErrorResponse>> {
  override fun handle(request: HttpRequest<*>, exception: GameException): HttpResponse<ErrorResponse> {
    val error = ErrorResponse(listOf(exception.message))
    return HttpResponse.serverError(error).status(exception.code)
  }
}