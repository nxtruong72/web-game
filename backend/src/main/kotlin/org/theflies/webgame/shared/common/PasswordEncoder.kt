package org.theflies.webgame.shared.common

import jakarta.validation.constraints.NotBlank

interface PasswordEncoder {
  fun encode(rawPassword: @NotBlank String): String
  fun matches(
    rawPassword: @NotBlank String,
    encodedPassword: @NotBlank String
  ): Boolean
}