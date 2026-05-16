/**
 * Property-based tests for config validation.
 *
 * Feature: ha-garden-card
 * Validates: Requirements 1.2, 1.7
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { validateConfig } from "../../src/models/config-validator";
import type { GardenCardConfig, ZoneConfig } from "../../src/models/types";

// =============================================================================
// Arbitraries (Generators)
// =============================================================================

/** Generate a valid hex color (#RGB, #RRGGBB, or #RRGGBBAA). */
const hexColorArb = fc.oneof(
  fc.hexaString({ minLength: 6, maxLength: 6 }).map((s) => `#${s}`),
  fc.hexaString({ minLength: 3, maxLength: 3 }).map((s) => `#${s}`),
  fc.hexaString({ minLength: 8, maxLength: 8 }).map((s) => `#${s}`)
);

/** Generate a valid entity domain for zones. */
const zoneDomainArb = fc.constantFrom("switch", "valve", "input_boolean");

/** Generate a valid entity name (domain.suffix). */
const zoneEntityArb = zoneDomainArb.chain((domain) =>
  fc
    .stringMatching(/^[a-z][a-z0-9_]{0,20}$/)
    .map((suffix) => `${domain}.${suffix}`)
);

/** Generate a valid polygon coordinate pair [x, y] with values 0-100. */
const polygonPointArb: fc.Arbitrary<[number, number]> = fc.tuple(
  fc.double({ min: 0, max: 100, noNaN: true }),
  fc.double({ min: 0, max: 100, noNaN: true })
);

/** Generate a valid polygon (3-10 points, values 0-100). */
const polygonArb = fc.array(polygonPointArb, { minLength: 3, maxLength: 10 });

/** Generate a valid zone id. */
const zoneIdArb = fc.stringMatching(/^[a-z0-9_-]{1,20}$/).filter((s) => s.length > 0);

/** Generate a valid zone name. */
const zoneNameArb = fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0);

/** Generate a single valid ZoneConfig. */
const validZoneArb: fc.Arbitrary<ZoneConfig> = fc
  .record({
    id: zoneIdArb,
    name: zoneNameArb,
    entity: zoneEntityArb,
    color: hexColorArb,
    polygon: polygonArb,
  })
  .map((z) => z as ZoneConfig);

/** Generate a valid GardenCardConfig with 1-5 zones. */
const validConfigArb: fc.Arbitrary<GardenCardConfig> = fc
  .array(validZoneArb, { minLength: 1, maxLength: 5 })
  .map((zones) => ({
    type: "custom:ha-garden-card" as const,
    zones,
  }));

// =============================================================================
// Property Tests
// =============================================================================

describe("Feature: ha-garden-card, Property 1: Valid configuration acceptance", () => {
  // **Validates: Requirements 1.2**
  //
  // For any configuration object that contains a type of "custom:ha-garden-card"
  // and at least one zone with a valid id, name, entity (matching switch.* / valve.* / input_boolean.*),
  // color (valid hex), and polygon (array of 3+ [number, number] pairs with values 0-100),
  // validateConfig SHALL accept it without throwing.
  it("should accept any valid configuration without throwing", () => {
    fc.assert(
      fc.property(validConfigArb, (config) => {
        expect(() => validateConfig(config)).not.toThrow();
      }),
      { numRuns: 100 }
    );
  });
});

describe("Feature: ha-garden-card, Property 2: Invalid configuration rejection", () => {
  // **Validates: Requirements 1.7**
  //
  // For any configuration object that is missing the zones array, has an empty zones array,
  // or contains a zone missing a required field (id, name, entity, color, or polygon),
  // validateConfig SHALL throw an Error whose message describes the validation failure.

  it("should reject configs with missing zones array", () => {
    fc.assert(
      fc.property(
        fc.record({
          type: fc.constant("custom:ha-garden-card" as const),
        }),
        (config) => {
          expect(() => validateConfig(config as GardenCardConfig)).toThrow();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject configs with empty zones array", () => {
    fc.assert(
      fc.property(
        fc.constant({
          type: "custom:ha-garden-card" as const,
          zones: [] as ZoneConfig[],
        }),
        (config) => {
          expect(() => validateConfig(config)).toThrow(/at least one zone/i);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject zones missing required id field", () => {
    fc.assert(
      fc.property(
        validZoneArb.map((zone) => {
          const { id, ...rest } = zone;
          return {
            type: "custom:ha-garden-card" as const,
            zones: [rest as unknown as ZoneConfig],
          } as GardenCardConfig;
        }),
        (config) => {
          expect(() => validateConfig(config)).toThrow(/missing/i);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject zones missing required name field", () => {
    fc.assert(
      fc.property(
        validZoneArb.map((zone) => {
          const { name, ...rest } = zone;
          return {
            type: "custom:ha-garden-card" as const,
            zones: [rest as unknown as ZoneConfig],
          } as GardenCardConfig;
        }),
        (config) => {
          expect(() => validateConfig(config)).toThrow(/missing/i);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject zones missing required entity field", () => {
    fc.assert(
      fc.property(
        validZoneArb.map((zone) => {
          const { entity, ...rest } = zone;
          return {
            type: "custom:ha-garden-card" as const,
            zones: [rest as unknown as ZoneConfig],
          } as GardenCardConfig;
        }),
        (config) => {
          expect(() => validateConfig(config)).toThrow(/missing an entity/i);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject zones missing required color field", () => {
    fc.assert(
      fc.property(
        validZoneArb.map((zone) => {
          const { color, ...rest } = zone;
          return {
            type: "custom:ha-garden-card" as const,
            zones: [rest as unknown as ZoneConfig],
          } as GardenCardConfig;
        }),
        (config) => {
          expect(() => validateConfig(config)).toThrow(/missing a color/i);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject zones missing required polygon field", () => {
    fc.assert(
      fc.property(
        validZoneArb.map((zone) => {
          const { polygon, ...rest } = zone;
          return {
            type: "custom:ha-garden-card" as const,
            zones: [rest as unknown as ZoneConfig],
          } as GardenCardConfig;
        }),
        (config) => {
          expect(() => validateConfig(config)).toThrow(/missing polygon/i);
        }
      ),
      { numRuns: 100 }
    );
  });
});
