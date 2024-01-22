package org.theflies.webgame.shared.common

import org.theflies.webgame.shared.models.User

interface RegisteredEvent: ExtraRequestInformation {
  val url: String
  val user: User
}