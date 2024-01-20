package org.theflies.webgame.shared.common

data class GameException(val code: Int, override val message: String) : Throwable(message)

data class RoundException(val code: Int, override val message: String) : Throwable(message)

data class BetException(val code: Int, override val message: String) : Throwable(message)