package org.theflies.webgame.shared.repositories;

import io.micronaut.core.annotation.NonNull
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.Join;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.PageableRepository;
import org.theflies.webgame.shared.models.Game
import org.theflies.webgame.shared.models.Round
import org.theflies.webgame.shared.models.Wallet
import java.util.*

@JdbcRepository(dialect = Dialect.POSTGRES)
interface RoundRepository: PageableRepository<Round, Long> {
    @Join("game")
    fun findByIdForUpdate(@Id id: Long): Round?

    @Join("game")
    fun findByGameId(gameId: Long, pageable: Pageable): Page<Round>
}
