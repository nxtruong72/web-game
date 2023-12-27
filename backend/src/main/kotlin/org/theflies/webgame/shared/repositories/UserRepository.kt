package org.theflies.webgame.shared.repositories

import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.PageableRepository
import org.theflies.webgame.shared.models.User

@JdbcRepository(dialect = Dialect.POSTGRES)
interface UserRepository: PageableRepository<User, Long> {
  fun findByUsername(identity: String): User?
  fun findByUsernameOrEmailOrPhone(username: String, email: String, phone: String): Array<User>
}