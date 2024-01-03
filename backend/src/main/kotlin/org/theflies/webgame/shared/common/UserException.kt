package org.theflies.webgame.shared.common

data class UserException(val code: Int, override val message: String) : Throwable(message)
