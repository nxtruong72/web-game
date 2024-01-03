package org.theflies.webgame.shared.models

import io.micronaut.core.convert.ConversionContext
import io.micronaut.data.model.runtime.convert.AttributeConverter
import jakarta.inject.Singleton

@Singleton
class RolesAttributeConverter : AttributeConverter<List<RoleType>?, String?> {
  override fun convertToPersistedValue(entityValue: List<RoleType>?, context: ConversionContext?): String? {
    return entityValue?.map {
      it.name
    }?.joinToString(",")
  }

  override fun convertToEntityValue(persistedValue: String?, context: ConversionContext?): List<RoleType>? {
    if (persistedValue == null) return null;
    return persistedValue.split(",").map { RoleType.valueOf(it) }
  }
}
