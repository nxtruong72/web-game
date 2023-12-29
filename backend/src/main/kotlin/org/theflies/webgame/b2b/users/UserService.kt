package org.theflies.webgame.b2b.users

import io.micronaut.context.event.ApplicationEventPublisher
import jakarta.inject.Singleton
import org.theflies.webgame.b2b.authentication.PasswordEncoder
import org.theflies.webgame.b2b.authentication.UserRegisterRequest
import org.theflies.webgame.shared.models.AccountStatus
import org.theflies.webgame.shared.models.User
import org.theflies.webgame.shared.repositories.UserRepository

@Singleton
class UserService(
  private val repo: UserRepository,
  private val eventPublisher: ApplicationEventPublisher<Any>,
  private val encoder: PasswordEncoder
) {
  fun create(userRequest: UserRegisterRequest, url: String): UserRegisterResponse {
    val existed = repo.findByUsernameOrEmailOrPhone(userRequest.username, userRequest.email, userRequest.phone)
    if (existed.isNotEmpty()) {
      throw UserException(400, "User already existed")
    }

    val user = repo.save(
      User(
        null,
        userRequest.username,
        userRequest.email,
        userRequest.phone,
        encoder.encode(userRequest.password),
        accountStatus = userRequest.accountStatus ?: AccountStatus.INACTIVATE
      )
    )
    eventPublisher.publishEvent(UserRegisterEvent(url, user))

    return UserRegisterResponse(user.id!!, user.username, user.phone, user.email)
  }
}
