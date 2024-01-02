package org.theflies.webgame.shared.common

import jakarta.inject.Singleton
import jakarta.validation.constraints.NotBlank
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Singleton
class BCryptPasswordEncoder: PasswordEncoder {
  private val delegate: org.springframework.security.crypto.password.PasswordEncoder = BCryptPasswordEncoder()
  override fun encode(@NotBlank rawPassword: String): String {
    return delegate.encode(rawPassword)
  }

  override fun matches(@NotBlank rawPassword: String, @NotBlank encodedPassword: String): Boolean {
    return delegate.matches(rawPassword, encodedPassword)
  }
}