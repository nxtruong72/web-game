package org.theflies.webgame.shared.repositories

import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.Join
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.PageableRepository
import org.theflies.webgame.shared.models.AccountStatus
import org.theflies.webgame.shared.models.Round
import org.theflies.webgame.shared.models.User
import java.time.Instant

@JdbcRepository(dialect = Dialect.POSTGRES)
interface UserRepository: PageableRepository<User, Long> {
  fun findByUsernameOrEmailOrPhone(username: String, email: String, phone: String): List<User>
  fun findByUsernameAndAccountStatus(username: String, accountStatus: AccountStatus): User?
  fun findByEmail(email: String): User?
  fun findByUsername(name: String): User?

  fun updateLastVisitedAt(@Id id: Long, lastVisitedAt: Instant)
  fun updateAccountStatus(@Id id: Long, accountStatus: AccountStatus)
  fun updatePassword(@Id id: Long, password: String)

  @Join("wallet")
  override fun findAll(pageable: Pageable): Page<User>
}