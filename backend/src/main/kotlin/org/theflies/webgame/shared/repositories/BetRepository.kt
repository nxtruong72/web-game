package org.theflies.webgame.shared.repositories;

import io.micronaut.core.annotation.NonNull
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.Join;
import io.micronaut.data.annotation.repeatable.JoinSpecifications
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.PageableRepository;
import org.theflies.webgame.shared.models.*
import java.time.Instant
import java.util.*

@JdbcRepository(dialect = Dialect.POSTGRES)
interface BetRepository: PageableRepository<Bet, Long> {
    @Join("round")
    @Join("wallet")
    fun findByIdForUpdate(@Id id: Long): Bet?

    @JoinSpecifications(
        Join(value = "round"),
        Join(value = "round.game"),
        Join(value = "wallet"),
        Join(value = "wallet.user"),
    )
    fun findByRoundIdForUpdate(@Id roundId: Long): List<Bet>

    fun findByRoundIdAndWalletId(@Id roundId: Long, @Id walletId: Long): List<Bet>

    fun findByWalletIdAndUpdatedAtAfterAndBetStatusInList(@Id walletId: Long, updateAt: Instant, betStatus: List<BetStatus>): List<Bet>
}
