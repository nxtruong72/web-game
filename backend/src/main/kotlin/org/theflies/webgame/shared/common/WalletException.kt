package org.theflies.webgame.shared.common

data class WalletException(val code: Int, override val message: String) : Throwable(message)