package org.theflies.webgame.shared.repositories

import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.Join
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.CrudRepository
import org.theflies.webgame.shared.models.Token

@JdbcRepository(dialect = Dialect.POSTGRES)
interface TokenRepository : CrudRepository<Token, Long> {
  fun update(@Id id: Long, used: Boolean)
  @Join("user")
  fun findByToken(code: String): Token?
}
