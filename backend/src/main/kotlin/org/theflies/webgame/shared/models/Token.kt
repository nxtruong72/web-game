package org.theflies.webgame.shared.models

import io.micronaut.data.annotation.*
import jakarta.validation.constraints.NotBlank
import java.time.Instant

@MappedEntity("tokens")
data class Token(
  @field:Id
  @field:GeneratedValue(GeneratedValue.Type.IDENTITY)
  var id: Long? = null,

  @NotBlank
  var token: String,

  @NotBlank
  var type: TokenType,

  @Relation(value = Relation.Kind.MANY_TO_ONE)
  @MappedProperty("user_id")
  var user: User,

  var expireAt: Instant? = null,

  var used: Boolean = false,

  @field:DateCreated
  var createdAt: Instant? = null,

  @field:DateUpdated
  var updatedAt: Instant? = null,
)
