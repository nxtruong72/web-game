package org.theflies.webgame.shared.repositories;

import io.micronaut.core.annotation.NonNull
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.Join;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.PageableRepository;
import org.theflies.webgame.shared.models.Wallet
import java.util.*

@JdbcRepository(dialect = Dialect.POSTGRES)
interface WalletRepository: PageableRepository<Wallet, Long> {
    @Join("user")
    fun findByIdForUpdate(@Id id: Long): Wallet?

    @Join("user")
    fun findByUserIdForUpdate(@Id id: Long): Wallet?
}
