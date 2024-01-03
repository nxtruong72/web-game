package org.theflies.webgame.b2c.authentication

import io.micronaut.security.token.RolesFinder

class RolesFinder: RolesFinder {
  override fun resolveRoles(attributes: MutableMap<String, Any>?): MutableList<String> {
    TODO("Not yet implemented")
  }
}