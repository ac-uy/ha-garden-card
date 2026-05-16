/**
 * Configuration validator for the HA Garden Card.
 *
 * Validates the GardenCardConfig object and throws descriptive errors
 * when required fields are missing or have invalid values.
 *
 * @module config-validator
 */

import type { GardenCardConfig, ZoneConfig } from "./types";

/**
 * Regular expression for valid hex color values (#RGB, #RRGGBB, #RRGGBBAA).
 */
const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/**
 * Regular expression for valid zone entity domains.
 * Zones can be bound to switch, valve, or input_boolean entities.
 */
const ZONE_ENTITY_REGEX = /^(switch|valve|input_boolean)\..+$/;

/**
 * Validates a GardenCardConfig object, throwing descriptive errors
 * if required fields are missing or invalid.
 *
 * @param config - The configuration object to validate
 * @throws {Error} If the configuration is invalid
 */
export function validateConfig(config: GardenCardConfig): void {
  if (!config) {
    throw new Error("Configuration is required");
  }

  if (!config.zones || !Array.isArray(config.zones)) {
    throw new Error("Please define at least one zone");
  }

  if (config.zones.length === 0) {
    throw new Error("Please define at least one zone");
  }

  for (const zone of config.zones) {
    validateZone(zone);
  }
}

/**
 * Validates a single ZoneConfig object.
 *
 * @param zone - The zone configuration to validate
 * @throws {Error} If the zone configuration is invalid
 */
function validateZone(zone: ZoneConfig): void {
  const name = zone.name || zone.id || "unnamed";

  if (!zone.id) {
    throw new Error(`Zone '${name}' is missing an id`);
  }

  if (!zone.name) {
    throw new Error(`Zone '${zone.id}' is missing a name`);
  }

  if (!zone.entity) {
    throw new Error(`Zone '${name}' is missing an entity`);
  }

  if (!ZONE_ENTITY_REGEX.test(zone.entity)) {
    throw new Error(
      `Zone '${name}' has invalid entity '${zone.entity}'. Must be switch.*, valve.*, or input_boolean.*`
    );
  }

  if (!zone.color) {
    throw new Error(`Zone '${name}' is missing a color`);
  }

  if (!HEX_COLOR_REGEX.test(zone.color)) {
    throw new Error(`Zone '${name}' has invalid color format`);
  }

  if (!zone.polygon || !Array.isArray(zone.polygon)) {
    throw new Error(`Zone '${name}' is missing polygon coordinates`);
  }

  if (zone.polygon.length < 3) {
    throw new Error(
      `Zone '${name}' polygon must have at least 3 points`
    );
  }

  for (const point of zone.polygon) {
    if (
      !Array.isArray(point) ||
      point.length !== 2 ||
      typeof point[0] !== "number" ||
      typeof point[1] !== "number" ||
      point[0] < 0 ||
      point[0] > 100 ||
      point[1] < 0 ||
      point[1] > 100
    ) {
      throw new Error(`Zone '${name}' has invalid polygon coordinates`);
    }
  }
}
