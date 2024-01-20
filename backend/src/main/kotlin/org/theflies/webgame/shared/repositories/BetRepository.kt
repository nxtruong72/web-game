package org.theflies.webgame.shared.repositories;

import io.micronaut.core.annotation.NonNull
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.Join;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.PageableRepository;
import org.theflies.webgame.shared.models.Bet
import org.theflies.webgame.shared.models.Game
import org.theflies.webgame.shared.models.Round
import org.theflies.webgame.shared.models.Wallet
import java.util.*

@JdbcRepository(dialect = Dialect.POSTGRES)
interface BetRepository: PageableRepository<Bet, Long> {
    @Join("round")
    @Join("wallet")
    fun findByIdForUpdate(@Id id: Long): Bet?

    @Join("round")
    @Join("wallet")
    fun findByRoundIdForUpdate(@Id roundId: Long): List<Bet>
}
