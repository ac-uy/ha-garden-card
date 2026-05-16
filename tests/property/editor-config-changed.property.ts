/**
 * Property-based tests for editor config-changed event dispatch.
 *
 * Feature: ha-garden-card, Property 17: Editor config-changed event dispatch
 *
 * For any modification to a configuration field in the Card Editor, a
 * config-changed CustomEvent SHALL be dispatched whose detail.config contains
 * the complete updated configuration object reflecting that modification.
 *
 * **Validates: Requirements 10.9**
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import type { GardenCardConfig, ZoneConfig } from "../../src/models/types";
import "../../src/editor/ha-garden-card-editor";
import { HaGardenCardEditor } from "../../src/editor/ha-garden-card-editor";

// =============================================================================
// Arbitraries (Generators)
// =============================================================================

/** Generate a valid hex color (#RRGGBB). */
const hexColorArb = fc
  .tuple(
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 })
  )
  .map(
    ([r, g, b]) =>
      `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  );

/** Generate a valid zone ID (UUID-like). */
const zoneIdArb = fc
  .stringMatching(/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/)
  .filter((s) => s.length > 0);

/** Generate a valid zone name. */
const zoneNameArb = fc
  .string({ minLength: 1, maxLength: 30 })
  .filter((s) => s.trim().length > 0);

/** Generate a valid entity domain for zones. */
const zoneDomainArb = fc.constantFrom("switch", "valve", "input_boolean");

/** Generate a valid zone entity ID. */
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

/** Generate a valid polygon (3-8 points). */
const polygonArb = fc.array(polygonPointArb, { minLength: 3, maxLength: 8 });

/** Generate a single valid ZoneConfig. */
const validZoneArb: fc.Arbitrary<ZoneConfig> = fc.record({
  id: zoneIdArb,
  name: zoneNameArb,
  entity: zoneEntityArb,
  color: hexColorArb,
  polygon: polygonArb,
});

/** Generate an optional title string. */
const titleArb = fc.option(
  fc.string({ minLength: 1, maxLength: 40 }).filter((s) => s.trim().length > 0),
  { nil: undefined }
);

/** Generate an optional image URL. */
const imageArb = fc.option(
  fc.stringMatching(/^\/local\/[a-z0-9_-]{1,20}\.(jpg|png|webp)$/),
  { nil: undefined }
);

/** Generate a valid GardenCardConfig with 1-5 zones. */
const validConfigArb: fc.Arbitrary<GardenCardConfig> = fc
  .record({
    title: titleArb,
    image: imageArb,
    zones: fc.array(validZoneArb, { minLength: 1, maxLength: 5 }),
  })
  .map((cfg) => ({
    type: "custom:ha-garden-card" as const,
    ...cfg,
  }));

/** Generate a modified config (simulating a user edit). */
const modifiedConfigArb: fc.Arbitrary<GardenCardConfig> = validConfigArb.chain(
  (baseConfig) =>
    fc.oneof(
      // Modify title
      titleArb.map((newTitle) => ({
        ...baseConfig,
        title: newTitle,
      })),
      // Modify image
      imageArb.map((newImage) => ({
        ...baseConfig,
        image: newImage,
      })),
      // Modify a zone name
      zoneNameArb.map((newName) => {
        const zones = [...baseConfig.zones];
        if (zones.length > 0) {
          zones[0] = { ...zones[0], name: newName };
        }
        return { ...baseConfig, zones };
      }),
      // Modify a zone color
      hexColorArb.map((newColor) => {
        const zones = [...baseConfig.zones];
        if (zones.length > 0) {
          zones[0] = { ...zones[0], color: newColor };
        }
        return { ...baseConfig, zones };
      }),
      // Modify a zone entity
      zoneEntityArb.map((newEntity) => {
        const zones = [...baseConfig.zones];
        if (zones.length > 0) {
          zones[0] = { ...zones[0], entity: newEntity };
        }
        return { ...baseConfig, zones };
      }),
      // Add a zone
      validZoneArb.map((newZone) => ({
        ...baseConfig,
        zones: [...baseConfig.zones, newZone],
      })),
      // Remove a zone (keep at least 1)
      fc.constant(
        baseConfig.zones.length > 1
          ? { ...baseConfig, zones: baseConfig.zones.slice(0, -1) }
          : baseConfig
      )
    )
);

// =============================================================================
// Helper
// =============================================================================

/**
 * Creates an HaGardenCardEditor instance, sets an initial config,
 * then calls _dispatchConfigChanged with the given config and captures
 * the dispatched event.
 */
function dispatchAndCapture(
  initialConfig: GardenCardConfig,
  modifiedConfig: GardenCardConfig
): CustomEvent | null {
  const editor = new HaGardenCardEditor();
  editor.setConfig(initialConfig);

  let capturedEvent: CustomEvent | null = null;
  editor.addEventListener("config-changed", ((e: Event) => {
    capturedEvent = e as CustomEvent;
  }) as EventListener);

  // Call the private method directly (accessible at runtime)
  (editor as any)._dispatchConfigChanged(modifiedConfig);

  return capturedEvent;
}

// =============================================================================
// Property Tests
// =============================================================================

describe("Feature: ha-garden-card, Property 17: Editor config-changed event dispatch", () => {
  /**
   * **Validates: Requirements 10.9**
   */

  it("should dispatch a config-changed event for any config modification", () => {
    fc.assert(
      fc.property(validConfigArb, modifiedConfigArb, (initial, modified) => {
        const event = dispatchAndCapture(initial, modified);

        // An event must always be dispatched
        expect(event).not.toBeNull();
        expect(event!.type).toBe("config-changed");
      }),
      { numRuns: 100 }
    );
  });

  it("should include the complete updated config in event detail.config", () => {
    fc.assert(
      fc.property(validConfigArb, modifiedConfigArb, (initial, modified) => {
        const event = dispatchAndCapture(initial, modified);

        expect(event).not.toBeNull();
        expect(event!.detail).toBeDefined();
        expect(event!.detail.config).toBeDefined();

        // The event's detail.config should be the exact modified config
        expect(event!.detail.config).toEqual(modified);
      }),
      { numRuns: 100 }
    );
  });

  it("should dispatch event with bubbles and composed set to true", () => {
    fc.assert(
      fc.property(validConfigArb, modifiedConfigArb, (initial, modified) => {
        const event = dispatchAndCapture(initial, modified);

        expect(event).not.toBeNull();
        expect(event!.bubbles).toBe(true);
        expect(event!.composed).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it("should update internal _config state to match the dispatched config", () => {
    fc.assert(
      fc.property(validConfigArb, modifiedConfigArb, (initial, modified) => {
        const editor = new HaGardenCardEditor();
        editor.setConfig(initial);

        // Call _dispatchConfigChanged
        (editor as any)._dispatchConfigChanged(modified);

        // Internal state should be updated
        expect((editor as any)._config).toEqual(modified);
      }),
      { numRuns: 100 }
    );
  });

  it("should preserve all zone configurations in the dispatched event", () => {
    fc.assert(
      fc.property(validConfigArb, modifiedConfigArb, (initial, modified) => {
        const event = dispatchAndCapture(initial, modified);

        expect(event).not.toBeNull();

        const dispatchedConfig = event!.detail.config as GardenCardConfig;

        // Zones array should match exactly
        expect(dispatchedConfig.zones).toHaveLength(modified.zones.length);

        for (let i = 0; i < modified.zones.length; i++) {
          expect(dispatchedConfig.zones[i].id).toBe(modified.zones[i].id);
          expect(dispatchedConfig.zones[i].name).toBe(modified.zones[i].name);
          expect(dispatchedConfig.zones[i].entity).toBe(modified.zones[i].entity);
          expect(dispatchedConfig.zones[i].color).toBe(modified.zones[i].color);
          expect(dispatchedConfig.zones[i].polygon).toEqual(modified.zones[i].polygon);
        }
      }),
      { numRuns: 100 }
    );
  });
});
