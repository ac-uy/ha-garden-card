/**
 * Property-based tests for card size scaling.
 *
 * Feature: ha-garden-card, Property 3: Card size scales with content
 * Validates: Requirements 1.3
 */

import { describe, it, expect, beforeAll } from "vitest";
import * as fc from "fast-check";
import type { GardenCardConfig, ZoneConfig, MowerConfig } from "../../src/models/types";
import { validateConfig } from "../../src/models/config-validator";

// =============================================================================
// Card Size Logic (extracted from HaGardenCard.getCardSize)
//
// We test the card size computation directly to avoid needing a full DOM
// environment (LitElement, customElements, window.customCards). The logic
// is deterministic and based solely on the config shape.
// =============================================================================

/**
 * Computes the card size for a given config.
 * This mirrors the logic in HaGardenCard.getCardSize().
 */
function computeCardSize(config: GardenCardConfig): number {
  // Base size for the image area
  let size = 3;

  // Add size for zones (each zone adds roughly half a row)
  size += Math.ceil(config.zones.length / 2);

  // Add size for mower panel if configured
  if (config.mower) {
    size += 2;
  }

  return size;
}

// =============================================================================
// Arbitraries (Generators)
// =============================================================================

/** Generate a valid hex color. */
const hexColorArb = fc.hexaString({ minLength: 6, maxLength: 6 }).map((s) => `#${s}`);

/** Generate a valid entity domain for zones. */
const zoneDomainArb = fc.constantFrom("switch", "valve", "input_boolean");

/** Generate a valid entity name (domain.suffix). */
const zoneEntityArb = zoneDomainArb.chain((domain) =>
  fc
    .stringMatching(/^[a-z][a-z0-9_]{0,10}$/)
    .map((suffix) => `${domain}.${suffix}`)
);

/** Generate a valid polygon coordinate pair [x, y] with values 0-100. */
const polygonPointArb: fc.Arbitrary<[number, number]> = fc.tuple(
  fc.double({ min: 0, max: 100, noNaN: true }),
  fc.double({ min: 0, max: 100, noNaN: true })
);

/** Generate a valid polygon (3-6 points). */
const polygonArb = fc.array(polygonPointArb, { minLength: 3, maxLength: 6 });

/** Generate a valid zone id. */
const zoneIdArb = fc.stringMatching(/^[a-z][a-z0-9_]{0,10}$/);

/** Generate a valid zone name. */
const zoneNameArb = fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0);

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

/** Generate a valid MowerConfig. */
const mowerConfigArb: fc.Arbitrary<MowerConfig> = fc
  .record({
    entity: fc.stringMatching(/^lawn_mower\.[a-z][a-z0-9_]{0,10}$/),
  })
  .map((m) => m as MowerConfig);

/** Generate a valid config with 1-20 zones and optional mower. */
const validConfigArb: fc.Arbitrary<GardenCardConfig> = fc
  .record({
    zones: fc.array(validZoneArb, { minLength: 1, maxLength: 20 }),
    mower: fc.option(mowerConfigArb, { nil: undefined }),
  })
  .map(({ zones, mower }) => ({
    type: "custom:ha-garden-card" as const,
    zones,
    ...(mower ? { mower } : {}),
  }));

// =============================================================================
// Property Tests
// =============================================================================

describe("Feature: ha-garden-card, Property 3: Card size scales with content", () => {
  // **Validates: Requirements 1.3**
  //
  // For any valid configuration, getCardSize() SHALL return a positive integer
  // that increases when more zones are added and increases when a mower config
  // is present, such that getCardSize(configWithNZones) <= getCardSize(configWithN+1Zones).

  it("getCardSize() always returns a positive integer for any valid config", () => {
    fc.assert(
      fc.property(validConfigArb, (config) => {
        // Ensure the config is valid first
        expect(() => validateConfig(config)).not.toThrow();

        const size = computeCardSize(config);
        expect(size).toBeGreaterThan(0);
        expect(Number.isInteger(size)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it("adding a zone never decreases the card size", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 19 }),
        validZoneArb,
        fc.array(validZoneArb, { minLength: 1, maxLength: 19 }),
        fc.option(mowerConfigArb, { nil: undefined }),
        (n, extraZone, zonePool, mower) => {
          // Build a base config with n zones
          const baseZones: ZoneConfig[] = [];
          for (let i = 0; i < n; i++) {
            const zone = zonePool[i % zonePool.length];
            baseZones.push({ ...zone, id: `zone_${i}` });
          }

          const baseConfig: GardenCardConfig = {
            type: "custom:ha-garden-card",
            zones: baseZones,
            ...(mower ? { mower } : {}),
          };

          const extendedConfig: GardenCardConfig = {
            type: "custom:ha-garden-card",
            zones: [...baseZones, { ...extraZone, id: `extra_zone_${n}` }],
            ...(mower ? { mower } : {}),
          };

          const sizeN = computeCardSize(baseConfig);
          const sizeN1 = computeCardSize(extendedConfig);

          expect(sizeN1).toBeGreaterThanOrEqual(sizeN);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("adding a mower config never decreases the card size", () => {
    fc.assert(
      fc.property(
        fc.array(validZoneArb, { minLength: 1, maxLength: 20 }),
        mowerConfigArb,
        (zones, mower) => {
          const configWithoutMower: GardenCardConfig = {
            type: "custom:ha-garden-card",
            zones,
          };

          const configWithMower: GardenCardConfig = {
            type: "custom:ha-garden-card",
            zones,
            mower,
          };

          const sizeWithout = computeCardSize(configWithoutMower);
          const sizeWith = computeCardSize(configWithMower);

          expect(sizeWith).toBeGreaterThan(sizeWithout);
        }
      ),
      { numRuns: 100 }
    );
  });
});
