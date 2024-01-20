package org.theflies.webgame.b2c.games

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.transaction.annotation.Transactional
import jakarta.inject.Singleton
import org.theflies.webgame.shared.common.GameException
import org.theflies.webgame.shared.common.RoundException
import org.theflies.webgame.shared.common.UserException
import org.theflies.webgame.shared.common.WalletException
import org.theflies.webgame.shared.models.*
import org.theflies.webgame.shared.repositories.*
import java.security.Principal

private val logger = KotlinLogging.logger {  }

@Singleton
open class B2CGameService(
    private val gameRepository: GameRepository,
    private val roundRepository: RoundRepository,
    private val betRepository: BetRepository,
    private val userRepository: UserRepository,
    private val walletRepository: WalletRepository
) {
    fun getGameById(id: Long): GameResponse {
        val game = gameRepository.findById(id).orElseThrow { throw GameException(404, "Game is not existing") }
        return mapGameToGameResponse(game)
    }

    fun getRoundById(id: Long): RoundResponse {
        val round = roundRepository.findById(id).orElseThrow { throw RoundException(404, "Game is not existing") }
        return mapRoundToRoundResponse(round)
    }

    fun listGame(pageable: Pageable): Page<GameResponse> {
        return gameRepository
            .findAll(pageable)
            .map { mapGameToGameResponse(it) }
    }

    fun listRoundByGameId(gameId: Long, pageable: Pageable): Page<RoundResponse> {
        return roundRepository
            .findByGameId(gameId, pageable)
            .map { mapRoundToRoundResponse(it) }
    }

    @Transactional
    open fun bet(request: BetRequest, principal: Principal): BetResponse {
        val user = userRepository.findByUsername(principal.name) ?: throw UserException(404, "Username not found")
        val wallet = walletRepository.findByUserIdForUpdate(user.id!!) ?:  throw WalletException(404, "Wallet not found")
        if (wallet.balance < request.amount) {
            throw WalletException(400, "Balance insufficient")
        }
        val round = roundRepository.findByIdForUpdate(request.roundInd) ?:  throw RoundException(404, "Round not found")
        if (round.roundStatus != RoundStatus.START) {
            throw RoundException(400, "Round is not in start")
        }
        val bet = betRepository.save(Bet(
            null,
            request.teamBet,
            BetStatus.PENDING,
            request.amount,
            round,
            wallet
        ))
        wallet.balance = wallet.balance.subtract(request.amount);
        wallet.blockedBalance = wallet.blockedBalance.add(request.amount);
        walletRepository.update(wallet)
        return mapBetToBetResponse(bet)
    }

    private fun mapRoundToRoundResponse(round: Round): RoundResponse {
        return RoundResponse(
            round.id!!,
            round.teamWin,
            round.roundStatus,
            round.createdAt!!,
            round.updatedAt!!
        )
    }

    private fun mapGameToGameResponse(game: Game): GameResponse {
        return GameResponse(
            game.id!!,
            game.name,
            game.gameStatus,
            game.teamOne,
            game.teamTwo,
            game.gameTypes,
            game.streamURL,
            game.startTime!!,
            game.createdAt!!,
            game.updatedAt!!
        )
    }

    private fun mapBetToBetResponse(bet: Bet): BetResponse {
        return BetResponse(
            bet.id!!,
            bet.teamBet,
            bet.betStatus,
            bet.amount,
            bet.createdAt!!,
            bet.updatedAt!!
        )
    }
}