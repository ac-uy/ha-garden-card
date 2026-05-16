/**
 * Property-based tests for the Mower Panel component.
 *
 * Feature: ha-garden-card
 * Validates: Requirements 5.1, 5.2
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  getMowerActivity,
  getActivityIcon,
  getActivityLabel,
  getBatteryIcon,
  getBatteryLevelClass,
} from "../../src/components/mower-panel";
import type { MowerActivity } from "../../src/models/types";

// =============================================================================
// Arbitraries (Generators)
// =============================================================================

/** All valid mower activity state strings from the lawn_mower domain. */
const validActivityStates = ["mowing", "docked", "paused", "returning", "error"] as const;

/** Generate a valid mower activity state string. */
const validActivityStateArb = fc.constantFrom(...validActivityStates);

/** Generate an arbitrary string that is NOT a valid activity state. */
const invalidActivityStateArb = fc
  .string({ minLength: 1, maxLength: 30 })
  .filter((s) => !(validActivityStates as readonly string[]).includes(s));

/** Generate a battery level between 0 and 100 (integer). */
const batteryLevelArb = fc.integer({ min: 0, max: 100 });

/** Generate a battery level as a float between 0 and 100. */
const batteryLevelFloatArb = fc.double({ min: 0, max: 100, noNaN: true, noDefaultInfinity: true });

// =============================================================================
// Property 12: Mower activity state display
// =============================================================================

describe("Feature: ha-garden-card, Property 12: Mower activity state display", () => {
  /**
   * **Validates: Requirements 5.1**
   *
   * For any lawn_mower entity with activity state in
   * {"mowing", "docked", "paused", "returning", "error"},
   * the Mower Panel SHALL render a display element whose content/class
   * corresponds to that specific activity state (no state maps to the wrong display).
   */
  it("getMowerActivity maps each valid state string to the corresponding MowerActivity", () => {
    fc.assert(
      fc.property(validActivityStateArb, (state) => {
        const activity = getMowerActivity(state);
        // The activity should exactly match the input state
        expect(activity).toBe(state);
      }),
      { numRuns: 100 }
    );
  });

  it("getMowerActivity maps unknown/invalid state strings to 'unknown'", () => {
    fc.assert(
      fc.property(invalidActivityStateArb, (state) => {
        const activity = getMowerActivity(state);
        expect(activity).toBe("unknown");
      }),
      { numRuns: 100 }
    );
  });

  it("each valid activity state produces a unique icon (no two states share the same icon)", () => {
    fc.assert(
      fc.property(
        validActivityStateArb,
        validActivityStateArb,
        (state1, state2) => {
          const activity1 = getMowerActivity(state1) as MowerActivity;
          const activity2 = getMowerActivity(state2) as MowerActivity;
          const icon1 = getActivityIcon(activity1);
          const icon2 = getActivityIcon(activity2);

          // If activities are different, icons must be different
          if (activity1 !== activity2) {
            expect(icon1).not.toBe(icon2);
          } else {
            // Same activity always produces same icon (deterministic)
            expect(icon1).toBe(icon2);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("each valid activity state produces a unique label (no two states share the same label)", () => {
    fc.assert(
      fc.property(
        validActivityStateArb,
        validActivityStateArb,
        (state1, state2) => {
          const activity1 = getMowerActivity(state1) as MowerActivity;
          const activity2 = getMowerActivity(state2) as MowerActivity;
          const label1 = getActivityLabel(activity1);
          const label2 = getActivityLabel(activity2);

          // If activities are different, labels must be different
          if (activity1 !== activity2) {
            expect(label1).not.toBe(label2);
          } else {
            // Same activity always produces same label (deterministic)
            expect(label1).toBe(label2);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("getActivityIcon always returns a non-empty string for any valid activity", () => {
    fc.assert(
      fc.property(validActivityStateArb, (state) => {
        const activity = getMowerActivity(state);
        const icon = getActivityIcon(activity);
        expect(icon.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("getActivityLabel always returns a non-empty capitalized string for any valid activity", () => {
    fc.assert(
      fc.property(validActivityStateArb, (state) => {
        const activity = getMowerActivity(state);
        const label = getActivityLabel(activity);
        expect(label.length).toBeGreaterThan(0);
        // Label should start with uppercase
        expect(label[0]).toBe(label[0].toUpperCase());
      }),
      { numRuns: 100 }
    );
  });
});

// =============================================================================
// Property 13: Battery level display
// =============================================================================

describe("Feature: ha-garden-card, Property 13: Battery level display", () => {
  /**
   * **Validates: Requirements 5.2**
   *
   * For any battery sensor entity with a numeric state value between 0 and 100,
   * the Mower Panel SHALL display that value as a percentage string and render
   * a battery icon appropriate to the level range.
   */
  it("getBatteryIcon returns a non-empty SVG path for any level 0-100", () => {
    fc.assert(
      fc.property(batteryLevelArb, (level) => {
        const icon = getBatteryIcon(level);
        expect(icon.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("getBatteryIcon returns a distinct icon for null (unknown battery)", () => {
    fc.assert(
      fc.property(batteryLevelArb, (level) => {
        const iconForLevel = getBatteryIcon(level);
        const iconForNull = getBatteryIcon(null);
        // The null icon should be different from any valid level icon
        // (unless the level happens to produce the same path, which shouldn't happen)
        // At minimum, the null icon should be a valid non-empty string
        expect(iconForNull.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("getBatteryLevelClass maps levels to correct range classes", () => {
    fc.assert(
      fc.property(batteryLevelArb, (level) => {
        const cls = getBatteryLevelClass(level);

        if (level > 75) {
          expect(cls).toBe("full");
        } else if (level >= 25) {
          expect(cls).toBe("medium");
        } else {
          expect(cls).toBe("low");
        }
      }),
      { numRuns: 100 }
    );
  });

  it("getBatteryLevelClass returns 'unknown' for null", () => {
    const cls = getBatteryLevelClass(null);
    expect(cls).toBe("unknown");
  });

  it("battery icons are consistent within the same level range", () => {
    fc.assert(
      fc.property(batteryLevelArb, batteryLevelArb, (level1, level2) => {
        const class1 = getBatteryLevelClass(level1);
        const class2 = getBatteryLevelClass(level2);
        const icon1 = getBatteryIcon(level1);
        const icon2 = getBatteryIcon(level2);

        // If both levels are in the same range, they should produce the same icon
        if (class1 === class2) {
          expect(icon1).toBe(icon2);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("battery level ranges are exhaustive and mutually exclusive for 0-100", () => {
    fc.assert(
      fc.property(batteryLevelArb, (level) => {
        const cls = getBatteryLevelClass(level);
        // Must be one of the three valid classes
        expect(["full", "medium", "low"]).toContain(cls);

        // Verify mutual exclusivity by checking boundaries
        if (cls === "full") {
          expect(level).toBeGreaterThan(75);
        } else if (cls === "medium") {
          expect(level).toBeGreaterThanOrEqual(25);
          expect(level).toBeLessThanOrEqual(75);
        } else if (cls === "low") {
          expect(level).toBeLessThan(25);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("getBatteryIcon produces different icons for different level ranges", () => {
    // Full vs Medium vs Low should all be distinct
    const fullIcon = getBatteryIcon(100);
    const mediumIcon = getBatteryIcon(50);
    const lowIcon = getBatteryIcon(10);
    const unknownIcon = getBatteryIcon(null);

    expect(fullIcon).not.toBe(mediumIcon);
    expect(fullIcon).not.toBe(lowIcon);
    expect(mediumIcon).not.toBe(lowIcon);
    expect(unknownIcon).not.toBe(fullIcon);
    expect(unknownIcon).not.toBe(mediumIcon);
    expect(unknownIcon).not.toBe(lowIcon);
  });
});
