package org.theflies.webgame.b2c.users

class UserException(val code: Int, message: String) : Throwable(message) {
}
