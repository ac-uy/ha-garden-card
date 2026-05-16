import { describe, it, expect } from "vitest";
import { validateConfig } from "../../src/models/config-validator";
import type { GardenCardConfig, ZoneConfig } from "../../src/models/types";

/**
 * Unit tests for the config-validator module.
 * Tests specific examples and edge cases for configuration validation.
 */

function makeValidZone(overrides?: Partial<ZoneConfig>): ZoneConfig {
  return {
    id: "zone-1",
    name: "Front Lawn",
    entity: "switch.front_lawn",
    color: "#00FF00",
    polygon: [
      [10, 10],
      [90, 10],
      [90, 90],
    ],
    ...overrides,
  };
}

function makeValidConfig(
  overrides?: Partial<GardenCardConfig>
): GardenCardConfig {
  return {
    type: "custom:ha-garden-card",
    zones: [makeValidZone()],
    ...overrides,
  };
}

describe("validateConfig", () => {
  describe("valid configurations", () => {
    it("accepts a minimal valid config with one zone", () => {
      expect(() => validateConfig(makeValidConfig())).not.toThrow();
    });

    it("accepts a config with multiple zones", () => {
      const config = makeValidConfig({
        zones: [
          makeValidZone({ id: "z1", name: "Zone 1" }),
          makeValidZone({ id: "z2", name: "Zone 2", entity: "valve.garden" }),
        ],
      });
      expect(() => validateConfig(config)).not.toThrow();
    });

    it("accepts a config with optional fields", () => {
      const config = makeValidConfig({
        title: "My Garden",
        image: "https://example.com/garden.jpg",
        mower: { entity: "lawn_mower.robomow" },
      });
      expect(() => validateConfig(config)).not.toThrow();
    });

    it("accepts valve entity", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ entity: "valve.sprinkler" })],
      });
      expect(() => validateConfig(config)).not.toThrow();
    });

    it("accepts input_boolean entity", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ entity: "input_boolean.irrigation_zone_1" })],
      });
      expect(() => validateConfig(config)).not.toThrow();
    });

    it("accepts 3-digit hex color", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ color: "#0F0" })],
      });
      expect(() => validateConfig(config)).not.toThrow();
    });

    it("accepts 8-digit hex color with alpha", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ color: "#00FF00AA" })],
      });
      expect(() => validateConfig(config)).not.toThrow();
    });

    it("accepts polygon with exactly 3 points", () => {
      const config = makeValidConfig({
        zones: [
          makeValidZone({
            polygon: [
              [0, 0],
              [50, 0],
              [25, 50],
            ],
          }),
        ],
      });
      expect(() => validateConfig(config)).not.toThrow();
    });

    it("accepts polygon with boundary values 0 and 100", () => {
      const config = makeValidConfig({
        zones: [
          makeValidZone({
            polygon: [
              [0, 0],
              [100, 0],
              [100, 100],
              [0, 100],
            ],
          }),
        ],
      });
      expect(() => validateConfig(config)).not.toThrow();
    });
  });

  describe("missing or empty zones", () => {
    it("throws when config is null", () => {
      expect(() => validateConfig(null as unknown as GardenCardConfig)).toThrow(
        "Configuration is required"
      );
    });

    it("throws when zones array is missing", () => {
      const config = { type: "custom:ha-garden-card" } as GardenCardConfig;
      expect(() => validateConfig(config)).toThrow(
        "Please define at least one zone"
      );
    });

    it("throws when zones array is empty", () => {
      const config = makeValidConfig({ zones: [] });
      expect(() => validateConfig(config)).toThrow(
        "Please define at least one zone"
      );
    });
  });

  describe("zone field validation", () => {
    it("throws when zone is missing id", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ id: "" })],
      });
      expect(() => validateConfig(config)).toThrow("is missing an id");
    });

    it("throws when zone is missing name", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ name: "" })],
      });
      expect(() => validateConfig(config)).toThrow("is missing a name");
    });

    it("throws when zone is missing entity", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ entity: "" })],
      });
      expect(() => validateConfig(config)).toThrow("is missing an entity");
    });

    it("throws when zone entity has invalid domain", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ entity: "light.garden" })],
      });
      expect(() => validateConfig(config)).toThrow("has invalid entity");
    });

    it("throws when zone entity is just a domain without id", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ entity: "switch." })],
      });
      expect(() => validateConfig(config)).toThrow("has invalid entity");
    });

    it("throws when zone is missing color", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ color: "" })],
      });
      expect(() => validateConfig(config)).toThrow("is missing a color");
    });

    it("throws when zone color is invalid hex", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ color: "red" })],
      });
      expect(() => validateConfig(config)).toThrow("has invalid color format");
    });

    it("throws when zone color is missing hash", () => {
      const config = makeValidConfig({
        zones: [makeValidZone({ color: "00FF00" })],
      });
      expect(() => validateConfig(config)).toThrow("has invalid color format");
    });
  });

  describe("polygon validation", () => {
    it("throws when polygon is missing", () => {
      const zone = makeValidZone();
      (zone as Record<string, unknown>).polygon = undefined;
      const config = makeValidConfig({ zones: [zone] });
      expect(() => validateConfig(config)).toThrow(
        "is missing polygon coordinates"
      );
    });

    it("throws when polygon has fewer than 3 points", () => {
      const config = makeValidConfig({
        zones: [
          makeValidZone({
            polygon: [
              [10, 10],
              [90, 90],
            ],
          }),
        ],
      });
      expect(() => validateConfig(config)).toThrow(
        "polygon must have at least 3 points"
      );
    });

    it("throws when polygon coordinate exceeds 100", () => {
      const config = makeValidConfig({
        zones: [
          makeValidZone({
            polygon: [
              [10, 10],
              [101, 10],
              [50, 50],
            ],
          }),
        ],
      });
      expect(() => validateConfig(config)).toThrow(
        "has invalid polygon coordinates"
      );
    });

    it("throws when polygon coordinate is negative", () => {
      const config = makeValidConfig({
        zones: [
          makeValidZone({
            polygon: [
              [-1, 10],
              [50, 10],
              [50, 50],
            ],
          }),
        ],
      });
      expect(() => validateConfig(config)).toThrow(
        "has invalid polygon coordinates"
      );
    });

    it("throws when polygon point is not a pair", () => {
      const config = makeValidConfig({
        zones: [
          makeValidZone({
            polygon: [[10, 10], [50], [50, 50]] as [number, number][],
          }),
        ],
      });
      expect(() => validateConfig(config)).toThrow(
        "has invalid polygon coordinates"
      );
    });
  });
});
