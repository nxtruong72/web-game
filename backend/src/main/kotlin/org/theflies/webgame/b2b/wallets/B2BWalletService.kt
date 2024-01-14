package org.theflies.webgame.b2b.wallets

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.transaction.annotation.Transactional
import jakarta.inject.Singleton
import org.theflies.webgame.b2b.users.*
import org.theflies.webgame.shared.common.WalletException
import org.theflies.webgame.shared.models.*
import org.theflies.webgame.shared.repositories.TransactionRepository
import org.theflies.webgame.shared.repositories.WalletRepository

private val logger = KotlinLogging.logger {  }

@Singleton
open class B2BWalletService(
    private val walletRepository: WalletRepository,
    private val transactionRepository: TransactionRepository,
) {
    @Transactional
    open fun deposit(request: UserDepositRequest) {
        logger.info { "Deposit money for user ${request.userId} with amount ${request.amount}" }
        val wallet = walletRepository.findByUserIdForUpdate(request.userId) ?: throw WalletException(
            400,
            "Wallet is not existing"
        )
        transactionRepository.save(
            Transaction(
                null,
                request.amount,
                request.transactionMethod,
                TransactionType.DEPOSIT,
                TransactionStatus.SUCCESS,
                request.notes,
                wallet,
            )
        )
        wallet.balance = wallet.balance.add(request.amount)
        walletRepository.update(wallet)
    }

    @Transactional
    open fun withdrawApproval(id: Long, request: UserWithdrawApprovalRequest) {
        logger.info { "approval money for transaction $id with approval ${request.approval}" }
        val transaction = transactionRepository.findByIdForUpdate(id) ?: throw WalletException(
            400,
            "Withdraw request is not existing"
        )
        val wallet = walletRepository.findByIdForUpdate(transaction.wallet!!.id!!) ?: throw WalletException(
            400,
            "Wallet is not existing"
        )
        if (transaction.transactionStatus != TransactionStatus.PENDING) {
            throw WalletException(400, "Withdraw request is not pending state")
        }
        if (request.approval) {
            transaction.transactionStatus = TransactionStatus.SUCCESS;
            wallet.blockedBalance = wallet.blockedBalance.subtract(transaction.amount)
        } else {
            transaction.transactionStatus = TransactionStatus.REJECT;
            wallet.blockedBalance = wallet.blockedBalance.subtract(transaction.amount)
            wallet.balance = wallet.balance.add(transaction.amount)
        }
        transactionRepository.update(transaction)
        walletRepository.update(wallet)
    }

    fun getDepositWithdrawTransaction(pageable: Pageable): Page<TransactionResponse> {
        return transactionRepository
            .findAll(pageable)
            .map {
                TransactionResponse(
                it.id!!,
                it.amount,
                it.transactionMethod,
                it.transactionType,
                it.transactionStatus,
                it.notes,
                it.createdAt!!,
                it.updatedAt!!
            ) }
    }
}