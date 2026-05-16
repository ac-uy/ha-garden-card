/**
 * Property-based tests for service call routing.
 *
 * Feature: ha-garden-card, Property 8: Service call routing for zone actions
 * Validates: Requirements 4.1, 4.2
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  getStartService,
  getStopService,
} from "../../src/components/zone-control";

// =============================================================================
// Arbitraries (Generators)
// =============================================================================

/** Generate a valid entity suffix (lowercase letters, digits, underscores). */
const entitySuffixArb = fc
  .stringMatching(/^[a-z][a-z0-9_]{0,20}$/)
  .filter((s) => s.length > 0);

/** Generate a switch entity ID. */
const switchEntityArb = entitySuffixArb.map(
  (suffix) => `switch.${suffix}`
);

/** Generate a valve entity ID. */
const valveEntityArb = entitySuffixArb.map(
  (suffix) => `valve.${suffix}`
);

/** Generate an input_boolean entity ID. */
const inputBooleanEntityArb = entitySuffixArb.map(
  (suffix) => `input_boolean.${suffix}`
);

/** Generate any valid zone entity ID (switch, valve, or input_boolean). */
const zoneEntityArb = fc.oneof(
  switchEntityArb,
  valveEntityArb,
  inputBooleanEntityArb
);

// =============================================================================
// Property Tests
// =============================================================================

describe("Feature: ha-garden-card, Property 8: Service call routing for zone actions", () => {
  // **Validates: Requirements 4.1, 4.2**
  //
  // For any zone configuration with an entity matching domain switch or valve,
  // triggering the start action SHALL call with domain matching the entity's domain,
  // service "turn_on" (or "open" for valve), and entity_id matching the zone's
  // configured entity. Triggering stop SHALL call the corresponding off/close service.

  it("should route switch entities to switch.turn_on for start", () => {
    fc.assert(
      fc.property(switchEntityArb, (entityId) => {
        const result = getStartService(entityId);
        expect(result.domain).toBe("switch");
        expect(result.service).toBe("turn_on");
      }),
      { numRuns: 100 }
    );
  });

  it("should route switch entities to switch.turn_off for stop", () => {
    fc.assert(
      fc.property(switchEntityArb, (entityId) => {
        const result = getStopService(entityId);
        expect(result.domain).toBe("switch");
        expect(result.service).toBe("turn_off");
      }),
      { numRuns: 100 }
    );
  });

  it("should route valve entities to valve.open for start", () => {
    fc.assert(
      fc.property(valveEntityArb, (entityId) => {
        const result = getStartService(entityId);
        expect(result.domain).toBe("valve");
        expect(result.service).toBe("open");
      }),
      { numRuns: 100 }
    );
  });

  it("should route valve entities to valve.close for stop", () => {
    fc.assert(
      fc.property(valveEntityArb, (entityId) => {
        const result = getStopService(entityId);
        expect(result.domain).toBe("valve");
        expect(result.service).toBe("close");
      }),
      { numRuns: 100 }
    );
  });

  it("should route input_boolean entities to homeassistant.turn_on for start", () => {
    fc.assert(
      fc.property(inputBooleanEntityArb, (entityId) => {
        const result = getStartService(entityId);
        expect(result.domain).toBe("homeassistant");
        expect(result.service).toBe("turn_on");
      }),
      { numRuns: 100 }
    );
  });

  it("should route input_boolean entities to homeassistant.turn_off for stop", () => {
    fc.assert(
      fc.property(inputBooleanEntityArb, (entityId) => {
        const result = getStopService(entityId);
        expect(result.domain).toBe("homeassistant");
        expect(result.service).toBe("turn_off");
      }),
      { numRuns: 100 }
    );
  });

  it("should always return a domain matching the entity domain for switch and valve start", () => {
    fc.assert(
      fc.property(
        fc.oneof(switchEntityArb, valveEntityArb),
        (entityId) => {
          const entityDomain = entityId.split(".")[0];
          const result = getStartService(entityId);
          expect(result.domain).toBe(entityDomain);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should always return a domain matching the entity domain for switch and valve stop", () => {
    fc.assert(
      fc.property(
        fc.oneof(switchEntityArb, valveEntityArb),
        (entityId) => {
          const entityDomain = entityId.split(".")[0];
          const result = getStopService(entityId);
          expect(result.domain).toBe(entityDomain);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should have start and stop services as inverse operations for any zone entity", () => {
    fc.assert(
      fc.property(zoneEntityArb, (entityId) => {
        const start = getStartService(entityId);
        const stop = getStopService(entityId);

        // Start and stop should use the same domain
        expect(start.domain).toBe(stop.domain);

        // Start and stop services should be different
        expect(start.service).not.toBe(stop.service);

        // Services should be valid on/off or open/close pairs
        if (start.service === "turn_on") {
          expect(stop.service).toBe("turn_off");
        } else if (start.service === "open") {
          expect(stop.service).toBe("close");
        }
      }),
      { numRuns: 100 }
    );
  });
});
