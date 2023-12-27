package org.theflies.webgame.b2b.users

class UserException(val code: Int, message: String) : Throwable(message) {
}
