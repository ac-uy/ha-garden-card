/**
 * Property-based tests for SVG polygon rendering and zone state mapping.
 *
 * Feature: ha-garden-card
 * Validates: Requirements 2.2, 2.3, 2.4, 2.5
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import type { ZoneConfig, HomeAssistant, HassEntity } from "../../src/models/types";
import "../../src/components/garden-image-layer";
import { GardenImageLayer } from "../../src/components/garden-image-layer";

// =============================================================================
// Arbitraries (Generators)
// =============================================================================

/** Generate a valid hex color (#RRGGBB). */
const hexColorArb = fc
  .hexaString({ minLength: 6, maxLength: 6 })
  .map((s) => `#${s}`);

/** Generate a valid entity domain for zones. */
const zoneDomainArb = fc.constantFrom("switch", "valve", "input_boolean");

/** Generate a valid entity name (domain.suffix). */
const zoneEntityArb = zoneDomainArb.chain((domain) =>
  fc
    .stringMatching(/^[a-z][a-z0-9_]{0,15}$/)
    .map((suffix) => `${domain}.${suffix}`)
);

/** Generate a valid polygon coordinate pair [x, y] with values 0-100. */
const polygonPointArb: fc.Arbitrary<[number, number]> = fc.tuple(
  fc.double({ min: 0, max: 100, noNaN: true, noDefaultInfinity: true }),
  fc.double({ min: 0, max: 100, noNaN: true, noDefaultInfinity: true })
);

/** Generate a valid polygon (3-8 points, values 0-100). */
const polygonArb = fc.array(polygonPointArb, { minLength: 3, maxLength: 8 });

/** Generate a valid zone id. */
const zoneIdArb = fc
  .stringMatching(/^[a-z][a-z0-9_-]{0,15}$/)
  .filter((s) => s.length > 0);

/** Generate a valid zone name. */
const zoneNameArb = fc
  .string({ minLength: 1, maxLength: 20 })
  .filter((s) => s.trim().length > 0);

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

/** Entity state values relevant for zone state mapping. */
const entityStateArb = fc.constantFrom("on", "off", "unavailable", "unknown");

/**
 * Generate a list of 1-10 zones with unique IDs and entities,
 * along with a matching hass states object.
 */
const zonesWithStatesArb = fc
  .array(
    fc.record({
      zone: validZoneArb,
      state: entityStateArb,
    }),
    { minLength: 1, maxLength: 10 }
  )
  .map((entries) => {
    // Ensure unique IDs and entities
    const seen = new Set<string>();
    const seenEntities = new Set<string>();
    const unique = entries.filter((e) => {
      if (seen.has(e.zone.id) || seenEntities.has(e.zone.entity)) return false;
      seen.add(e.zone.id);
      seenEntities.add(e.zone.entity);
      return true;
    });

    // Must have at least 1 zone
    if (unique.length === 0) return null;

    const zones: ZoneConfig[] = unique.map((e) => e.zone);
    const states: Record<string, HassEntity> = {};
    for (const entry of unique) {
      states[entry.zone.entity] = {
        state: entry.state,
        attributes: {},
        last_changed: new Date().toISOString(),
      };
    }

    const hass: HomeAssistant = {
      states,
      callService: async () => {},
      themes: { darkMode: false },
      locale: { language: "en" },
    };

    return { zones, hass, entries: unique };
  })
  .filter((v): v is NonNullable<typeof v> => v !== null);

// =============================================================================
// Helper
// =============================================================================

/**
 * Creates a GardenImageLayer instance with the given zones and hass,
 * then calls _computeZoneRenderData() and returns the result.
 * We instantiate the class directly — the method only reads reactive
 * properties and doesn't require DOM attachment.
 */
function computeRenderData(
  zones: ZoneConfig[],
  hass: HomeAssistant
) {
  const el = new GardenImageLayer();
  el.zones = zones;
  el.hass = hass;
  return (el as any)._computeZoneRenderData();
}

// =============================================================================
// Property Tests
// =============================================================================

describe("Feature: ha-garden-card, Property 4: SVG polygon rendering matches zone configuration", () => {
  /**
   * **Validates: Requirements 2.2**
   *
   * For any valid configuration with N zones each having polygon coordinates,
   * _computeZoneRenderData SHALL return exactly N entries, and each entry's
   * points attribute SHALL contain the same coordinate values as the
   * corresponding zone's polygon array.
   */
  it("should return exactly N entries for N zones with matching polygon points", () => {
    fc.assert(
      fc.property(zonesWithStatesArb, ({ zones, hass }) => {
        const renderData = computeRenderData(zones, hass);

        // Exactly N entries
        expect(renderData).toHaveLength(zones.length);

        // Each entry's points match the zone's polygon coordinates
        for (let i = 0; i < zones.length; i++) {
          const zone = zones[i];
          const rendered = renderData[i];

          // The points string should be "x1,y1 x2,y2 x3,y3 ..."
          const expectedPoints = zone.polygon
            .map(([x, y]) => `${x},${y}`)
            .join(" ");

          expect(rendered.points).toBe(expectedPoints);
          expect(rendered.id).toBe(zone.id);
          expect(rendered.name).toBe(zone.name);
        }
      }),
      { numRuns: 100 }
    );
  });
});

describe("Feature: ha-garden-card, Property 5: Zone state-to-visual mapping", () => {
  /**
   * **Validates: Requirements 2.3, 2.4**
   *
   * For any set of zones with associated entity states:
   * - Zones with entity state "on" SHALL have isActive=true and isUnavailable=false
   * - Zones with entity state "off" SHALL have isActive=false and isUnavailable=false
   * - Zones with entity state "unavailable" or "unknown" SHALL have isUnavailable=true and isActive=false
   * The sets are mutually exclusive.
   */
  it("should map entity states to correct isActive/isUnavailable flags", () => {
    fc.assert(
      fc.property(zonesWithStatesArb, ({ zones, hass, entries }) => {
        const renderData = computeRenderData(zones, hass);

        for (let i = 0; i < entries.length; i++) {
          const { state } = entries[i];
          const rendered = renderData[i];

          if (state === "on") {
            expect(rendered.isActive).toBe(true);
            expect(rendered.isUnavailable).toBe(false);
          } else if (state === "off") {
            expect(rendered.isActive).toBe(false);
            expect(rendered.isUnavailable).toBe(false);
          } else if (state === "unavailable" || state === "unknown") {
            expect(rendered.isUnavailable).toBe(true);
            expect(rendered.isActive).toBe(false);
          }

          // Mutual exclusivity: isActive and isUnavailable cannot both be true
          expect(rendered.isActive && rendered.isUnavailable).toBe(false);
        }
      }),
      { numRuns: 100 }
    );
  });
});

describe("Feature: ha-garden-card, Property 6: Zone color applied to polygon fill", () => {
  /**
   * **Validates: Requirements 2.5**
   *
   * For any zone configuration with a hex color value, the corresponding
   * render data entry's color SHALL equal that configured color value.
   */
  it("should preserve the configured color in render data for each zone", () => {
    fc.assert(
      fc.property(zonesWithStatesArb, ({ zones, hass }) => {
        const renderData = computeRenderData(zones, hass);

        for (let i = 0; i < zones.length; i++) {
          const zone = zones[i];
          const rendered = renderData[i];

          expect(rendered.color).toBe(zone.color);
        }
      }),
      { numRuns: 100 }
    );
  });
});
