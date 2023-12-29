package org.theflies.webgame.shared.common
// if condition==true then T else null
infix fun <T> Boolean.thenRun(output: T) = if (this) output else null