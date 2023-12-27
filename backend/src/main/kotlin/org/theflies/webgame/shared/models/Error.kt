package org.theflies.webgame.shared.models

import io.micronaut.core.annotation.Introspected
import io.micronaut.serde.annotation.Serdeable.Serializable

@Introspected
@Serializable
data class ErrorResponse(
  val errors: List<String?>
)
