package org.theflies.webgame.shared.repositories;

import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.Join;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.Pageable
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.PageableRepository;
import org.theflies.webgame.shared.models.Transaction
import org.theflies.webgame.shared.models.TransactionType
import java.util.*

@JdbcRepository(dialect = Dialect.POSTGRES)
interface TransactionRepository: PageableRepository<Transaction, Long> {
    @Join("wallet")
    fun findByIdForUpdate(@Id id: Long): Transaction?

    @Join("wallet")
    fun findByWalletIdForUpdate(@Id id: Long): Transaction?

    fun findByTransactionTypeInList(transactionTypes: List<TransactionType>, pageable: Pageable): List<Transaction>
}
