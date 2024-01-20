package org.theflies.webgame.b2b.games

import io.github.oshai.kotlinlogging.KotlinLogging
import io.micronaut.context.event.ApplicationEventPublisher
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.transaction.annotation.Transactional
import io.micronaut.transaction.annotation.TransactionalEventListener
import jakarta.inject.Singleton
import org.theflies.webgame.shared.common.GameException
import org.theflies.webgame.shared.common.RoundException
import org.theflies.webgame.shared.models.*
import org.theflies.webgame.shared.repositories.*
import java.math.BigDecimal
import java.math.RoundingMode
import java.util.Collections.emptyList

private val logger = KotlinLogging.logger {  }

@Singleton
open class B2BGameService(
    private val gameRepository: GameRepository,
    private val roundRepository: RoundRepository,
    private val betRepository: BetRepository,
    private val eventPublisher: ApplicationEventPublisher<Any>,
) {
    fun createGame(createGameRequest: CreateGameRequest): GameResponse {
        val game = gameRepository.save(Game(
           null,
            createGameRequest.name,
            GameStatus.PENDING,
            createGameRequest.teamOne,
            createGameRequest.teamTwo,
            createGameRequest.gameTypes,
            0,
            BigDecimal(0),
            createGameRequest.streamURL,
            createGameRequest.startTime
        ))
        return mapGameToGameResponse(game)
    }

    @Transactional
    open fun startGame(gameId: Long): GameResponse {
        val game = gameRepository.findByIdForUpdate(gameId) ?: throw GameException(404, "Game is not existing")
        if (game.gameStatus != GameStatus.PENDING) {
            throw GameException(400, "Game can't start, because status is not pending")
        }
        game.gameStatus = GameStatus.START
        val updatedGame = gameRepository.update(game)
        return mapGameToGameResponse(updatedGame)
    }

    @Transactional
    open fun stopGame(gameId: Long): GameResponse {
        val game = gameRepository.findByIdForUpdate(gameId) ?: throw GameException(404, "Game is not existing")
        if (game.gameStatus != GameStatus.START) {
            throw GameException(400, "Game can't stop, because status is not started yet")
        }
        game.gameStatus = GameStatus.END
        val updatedGame = gameRepository.update(game)
        return mapGameToGameResponse(updatedGame)
    }

    @Transactional
    open fun cancelGame(gameId: Long): GameResponse {
        val game = gameRepository.findByIdForUpdate(gameId) ?: throw GameException(404, "Game is not existing")
        if (game.gameStatus != GameStatus.PENDING
            || game.gameStatus != GameStatus.START ) {
            throw GameException(400, "Game can't start, because status is not pending or start")
        }
        game.gameStatus = GameStatus.CANCEL
        val updatedGame = gameRepository.update(game)
        return mapGameToGameResponse(updatedGame)
    }

    fun createNewRound(gameId: Long): RoundResponse {
        val game = gameRepository.findByIdForUpdate(gameId) ?: throw GameException(404, "Game is not existing")
        if (game.gameStatus != GameStatus.START) {
            throw GameException(400, "Game is not started yet")
        }
        val round = roundRepository.update(Round(
            null,
            0,
            RoundStatus.START,
            0,
            BigDecimal(0),
            game
        ))
        return mapRoundToRoundResponse(round)
    }

    @Transactional
    open fun endRound(roundId: Long, roundEndRequest: RoundEndRequest): RoundResponse {
        val round = roundRepository.findByIdForUpdate(roundId) ?: throw RoundException(404, "Round is not existing")
        if (round.roundStatus != RoundStatus.START) {
            throw RoundException(400, "Round is not in start state")
        }

        round.teamWin = roundEndRequest.teamWin;
        round.roundStatus = RoundStatus.CALCULATE;
        val roundUpdated = roundRepository.update(round);
        eventPublisher.publishEvent(RoundEndedEvent(
            roundUpdated.id!!,
            roundUpdated.roundStatus,
            roundUpdated.teamWin
        ))
        return mapRoundToRoundResponse(roundUpdated)
    }

    @Transactional
    open fun cancelRound(roundId: Long): RoundResponse {
        val round = roundRepository.findByIdForUpdate(roundId) ?: throw RoundException(404, "Round is not existing")
        if (round.roundStatus != RoundStatus.START) {
            throw RoundException(400, "Round is not in start state")
        }

        round.roundStatus = RoundStatus.CANCELING;
        val roundUpdated = roundRepository.update(round);
        eventPublisher.publishEvent(RoundEndedEvent(
            roundUpdated.id!!,
            roundUpdated.roundStatus,
            roundUpdated.teamWin
        ))

        return mapRoundToRoundResponse(roundUpdated)
    }

    fun getGame(pageable: Pageable): Page<GameResponse> {
        return gameRepository
            .findAll(pageable)
            .map { mapGameToGameResponse(it) }
    }

    fun getRoundByGameId(gameId: Long, pageable: Pageable): Page<RoundResponse> {
        return roundRepository
            .findByGameId(gameId, pageable)
            .map { mapRoundToRoundResponse(it) }
    }

    @TransactionalEventListener
    open fun onRoundEndedEvent(roundEndedEvent: RoundEndedEvent) {
        when(roundEndedEvent.roundStatus) {
            RoundStatus.CALCULATE -> processBestResult(roundEndedEvent)
            RoundStatus.CANCELING -> processCancel(roundEndedEvent)
            else -> {}
        }
    }

    @Transactional
    open fun processBestResult(roundEndedEvent: RoundEndedEvent) {
        val round = roundRepository.findByIdForUpdate(roundEndedEvent.id) ?: throw RoundException(404, "Round is not existing")
        val bets = betRepository.findByRoundIdForUpdate(roundEndedEvent.id)
        if (bets.isEmpty()) {
            return
        }
        val teamBets = bets.groupBy {it.teamBet}
        val winBets = teamBets[round.teamWin] ?: emptyList()
        val loseBets = teamBets[if (round.teamWin == 1) 2 else 1] ?: emptyList()
        val totalLoseValue = loseBets.sumOf {it.amount}
        val totalWinValue = winBets.sumOf {it.amount}
        loseBets.forEach {
            it.betStatus  = BetStatus.LOSE
            it.wallet!!.blockedBalance = it.wallet!!.blockedBalance.subtract(it.amount)
        }
        betRepository.updateAll(loseBets)
        winBets.forEach {
            it.betStatus  = BetStatus.WIN
            it.wallet!!.blockedBalance = it.wallet!!.blockedBalance.subtract(it.amount)
            val winAmount = it.amount.add(it.amount.divide(totalWinValue, RoundingMode.DOWN).multiply(totalLoseValue))
            it.wallet!!.balance = it.wallet!!.balance.add(winAmount)
        }
        betRepository.updateAll(winBets)
        round.roundStatus = RoundStatus.COMPLETED
        roundRepository.update(round)
    }

    @Transactional
    open fun processCancel(roundEndedEvent: RoundEndedEvent) {
        val round = roundRepository.findByIdForUpdate(roundEndedEvent.id) ?: throw RoundException(404, "Round is not existing")
        val bets = betRepository.findByRoundIdForUpdate(roundEndedEvent.id)
        if (bets.isEmpty()) {
            return
        }
        bets.forEach {
            it.betStatus  = BetStatus.CANCEL
            it.wallet!!.blockedBalance = it.wallet!!.blockedBalance.subtract(it.amount)
            it.wallet!!.balance = it.wallet!!.balance.add(it.amount)
        }
        betRepository.updateAll(bets)
        round.roundStatus = RoundStatus.CANCELED
    }

    private fun mapRoundToRoundResponse(round: Round): RoundResponse {
        return RoundResponse(
            round.id!!,
            round.teamWin,
            round.roundStatus,
            round.totalBet,
            round.profit,
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
            game.totalBet,
            game.profit,
            game.gameTypes,
            game.streamURL,
            game.startTime!!,
            game.createdAt!!,
            game.updatedAt!!
        )
    }
}