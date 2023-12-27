package org.theflies.webgame.b2b.authentication

import jakarta.validation.constraints.NotBlank

interface PasswordEncoder {
  fun encode(rawPassword: @NotBlank String): String
  fun matches(
    rawPassword: @NotBlank String,
    encodedPassword: @NotBlank String
  ): Boolean
}