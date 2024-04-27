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
import java.time.Instant
import java.util.Collections.emptyList
import java.util.HashMap

private val logger = KotlinLogging.logger {  }

@Singleton
open class B2BGameService(
    private val gameRepository: GameRepository,
    private val roundRepository: RoundRepository,
    private val betRepository: BetRepository,
    private val walletRepository: WalletRepository,
    private val eventPublisher: ApplicationEventPublisher<Any>,
) {
    fun createGame(createGameRequest: CreateGameRequest): GameResponse {
        logger.info { "Create Game $createGameRequest" }
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
            createGameRequest.planStartTime,
            createGameRequest.startTime
        ))
        return mapGameToGameResponse(game)
    }

    @Transactional
    open fun startGame(gameId: Long): GameResponse {
        logger.info {"Start game for $gameId"}
        val game = gameRepository.findByIdForUpdate(gameId) ?: throw GameException(404, "Game is not existing")
        if (game.gameStatus != GameStatus.PENDING) {
            throw GameException(400, "Game can't start, because status is not pending")
        }
        game.gameStatus = GameStatus.START
        game.startTime = Instant.now()
        val updatedGame = gameRepository.update(game)
        return mapGameToGameResponse(updatedGame)
    }

    @Transactional
    open fun stopGame(gameId: Long): GameResponse {
        logger.info {"Stop game for $gameId"}
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
        logger.info {"Cancel game for $gameId"}
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
        logger.info { "Create round for gameId $gameId" }
        val game = gameRepository.findByIdForUpdate(gameId) ?: throw GameException(404, "Game is not existing")
        if (game.gameStatus != GameStatus.START) {
            throw GameException(400, "Game is not started yet")
        }
        val rounds = roundRepository.findByGameIdAndRoundStatusInList(gameId, listOf(RoundStatus.START, RoundStatus.CLOSE))
        if (!rounds.isEmpty()) {
            throw GameException(400, "Game has round is in-progress")
        }
        val round = roundRepository.save(Round(
            null,
            0,
            RoundStatus.START,
            BigDecimal(0),
            BigDecimal(0),
            BigDecimal(0),
            game
        ))
        return mapRoundToRoundResponse(round)
    }

    @Transactional
    open fun endRound(roundId: Long, roundEndRequest: RoundEndRequest): RoundResponse {
        logger.info { "End round id $roundId with info $roundEndRequest" }
        val round = roundRepository.findByIdForUpdate(roundId) ?: throw RoundException(404, "Round is not existing")
        if (round.roundStatus != RoundStatus.CLOSE && round.roundStatus != RoundStatus.START) {
            throw RoundException(400, "Round is not in start or close state")
        }
        if (roundEndRequest.teamWin != 1 && roundEndRequest.teamWin != 2) {
            throw RoundException(400, "Team win must be 1 or 2")
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
    open fun closeRound(roundId: Long): RoundResponse {
        logger.info { "Close round id $roundId" }
        val round = roundRepository.findByIdForUpdate(roundId) ?: throw RoundException(404, "Round is not existing")
        if (round.roundStatus != RoundStatus.START) {
            throw RoundException(400, "Round is not in start state")
        }

        round.roundStatus = RoundStatus.CLOSE;
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

    fun getRoundById(roundId: Long): RoundResponse {
        val round = roundRepository.findById(roundId).orElseThrow { throw RoundException(404, "Round is not exit") }
        return mapRoundToRoundResponse(round)
    }

    fun getGameById(gameId: Long): GameResponse {
        val game = gameRepository.findById(gameId).orElseThrow { throw GameException(404, "Game is not exit") }
        return mapGameToGameResponse(game)
    }

    @TransactionalEventListener
    open fun onRoundEndedEvent(roundEndedEvent: RoundEndedEvent) {
        when(roundEndedEvent.roundStatus) {
            RoundStatus.CALCULATE -> processBetResult(roundEndedEvent)
            RoundStatus.CANCELING -> processCancel(roundEndedEvent)
            else -> {}
        }
    }

    @Transactional
    open fun processBetResult(roundEndedEvent: RoundEndedEvent) {
        logger.info {"Process Bet with $roundEndedEvent"}
        val round = roundRepository.findByIdForUpdate(roundEndedEvent.id) ?: throw RoundException(404, "Round is not existing")
        val bets = betRepository.findByRoundIdForUpdate(roundEndedEvent.id)
        val teamBets = bets.groupBy {it.teamBet}
        val winBets = teamBets[round.teamWin] ?: emptyList()
        val loseBets = teamBets[if (round.teamWin == 1) 2 else 1] ?: emptyList()
        val totalLoseValue = loseBets.sumOf {it.amount}
        val totalWinValue = winBets.sumOf {it.amount}
        var walletMap: MutableMap<Long, Wallet> = HashMap()
        loseBets.forEach {
            it.betStatus  = BetStatus.LOSE
            if (!walletMap.containsKey(it.wallet!!.id)) {
                it.wallet!!.blockedBalance = it.wallet!!.blockedBalance.subtract(it.amount)
                walletMap.put(it.wallet!!.id!!, it.wallet!!)
            } else {
                val wallet = walletMap.get(it.wallet!!.id)
                wallet!!.blockedBalance = wallet.blockedBalance.subtract(it.amount)
            }
        }
        winBets.forEach {
            it.betStatus  = BetStatus.WIN
            val winAmount = it.amount.add(it.amount.divide(totalWinValue, RoundingMode.DOWN).multiply(totalLoseValue))
            if (!walletMap.containsKey(it.wallet!!.id)) {
                it.wallet!!.blockedBalance = it.wallet!!.blockedBalance.subtract(it.amount)
                it.wallet!!.balance = it.wallet!!.balance.add(winAmount)
                walletMap.put(it.wallet!!.id!!, it.wallet!!)
            } else {
                val wallet = walletMap.get(it.wallet!!.id)
                wallet!!.blockedBalance = wallet.blockedBalance.subtract(it.amount)
                wallet!!.balance = wallet!!.balance.add(winAmount)
            }
        }
        betRepository.updateAll(loseBets)
        betRepository.updateAll(winBets)
        round.roundStatus = RoundStatus.COMPLETED
        round.profit = if ( round.teamWin == 1 ) round.totalBetTeamOne.subtract(round.totalBetTeamTwo) else round.totalBetTeamTwo.subtract(round.totalBetTeamOne)
        roundRepository.update(round)
        walletRepository.updateAll(walletMap.values)
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
            round.totalBetTeamOne,
            round.totalBetTeamTwo,
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
            game.planStartTime,
            game.startTime,
            game.createdAt!!,
            game.updatedAt!!
        )
    }
}