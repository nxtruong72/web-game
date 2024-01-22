package org.theflies.webgame.shared.common

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.http.HttpRequest
import io.micronaut.http.MutableHttpResponse
import io.micronaut.http.annotation.RequestFilter
import io.micronaut.http.annotation.ServerFilter
import io.micronaut.http.filter.FilterContinuation
import io.micronaut.scheduling.TaskExecutors
import io.micronaut.scheduling.annotation.ExecuteOn

private val logger = KotlinLogging.logger { }

@ServerFilter("/**")
class IPFilter {

  @RequestFilter
  @ExecuteOn(TaskExecutors.BLOCKING) // (3)
  fun filterRequest(request: HttpRequest<*>, continuation: FilterContinuation<MutableHttpResponse<*>>) {
    val (device, ip) = request.extraInfo()
    logger.debug { "filter here for ip and device $ip $device" }

    continuation.proceed()
  }
}