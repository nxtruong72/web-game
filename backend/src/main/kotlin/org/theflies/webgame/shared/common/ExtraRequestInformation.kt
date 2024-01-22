package org.theflies.webgame.shared.common

interface ExtraRequestInformation {
  val ipAddress: String?
  val device: DeviceType?
}

enum class DeviceType {
  PC_UNKNOWN,
  TABLET,
  MOBILE,
}