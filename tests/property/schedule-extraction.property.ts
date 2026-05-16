import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { extractNextSchedule } from "../../src/utils/schedule-parser";
import { HassEntity } from "../../src/models/types";

/**
 * Feature: ha-garden-card, Property 15: Schedule extraction from entity
 *
 * Validates: Requirements 8.1
 *
 * For any schedule entity that has either a next_run attribute (ISO datetime
 * string) or a state representing a datetime, the function SHALL extract and
 * display a time string (HH:MM format) that corresponds to the entity's data.
 * For entities in "unavailable" state or with no parseable schedule, it SHALL
 * return null.
 */

// Helper to build a HassEntity
function makeEntity(
  state: string,
  attributes: Record<string, unknown> = {}
): HassEntity {
  return {
    state,
    attributes: { ...attributes },
    last_changed: "2024-01-01T00:00:00Z",
  };
}

// Arbitrary for valid ISO datetime strings with known hours/minutes
function isoDatetimeArb() {
  return fc
    .record({
      year: fc.integer({ min: 2000, max: 2099 }),
      month: fc.integer({ min: 1, max: 12 }),
      day: fc.integer({ min: 1, max: 28 }), // safe for all months
      hour: fc.integer({ min: 0, max: 23 }),
      minute: fc.integer({ min: 0, max: 59 }),
      second: fc.integer({ min: 0, max: 59 }),
    })
    .map(({ year, month, day, hour, minute, second }) => ({
      iso: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`,
      hour,
      minute,
    }));
}

describe("Feature: ha-garden-card, Property 15: Schedule extraction from entity", () => {
  it("extracts HH:MM from next_run attribute for any valid ISO datetime", () => {
    fc.assert(
      fc.property(isoDatetimeArb(), ({ iso, hour, minute }) => {
        const entity = makeEntity("on", { next_run: iso });
        const result = extractNextSchedule(entity);
        const expected = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        return result === expected;
      }),
      { numRuns: 100 }
    );
  });

  it("extracts HH:MM from entity state as datetime for any valid ISO datetime", () => {
    fc.assert(
      fc.property(isoDatetimeArb(), ({ iso, hour, minute }) => {
        const entity = makeEntity(iso);
        const result = extractNextSchedule(entity);
        const expected = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        return result === expected;
      }),
      { numRuns: 100 }
    );
  });

  it("returns null for entities with 'unavailable' state regardless of attributes", () => {
    fc.assert(
      fc.property(isoDatetimeArb(), ({ iso }) => {
        const entity = makeEntity("unavailable", { next_run: iso });
        return extractNextSchedule(entity) === null;
      }),
      { numRuns: 100 }
    );
  });

  it("returns null for entities with 'unknown' state regardless of attributes", () => {
    fc.assert(
      fc.property(isoDatetimeArb(), ({ iso }) => {
        const entity = makeEntity("unknown", { next_run: iso });
        return extractNextSchedule(entity) === null;
      }),
      { numRuns: 100 }
    );
  });

  it("returns null for undefined entity", () => {
    expect(extractNextSchedule(undefined)).toBeNull();
  });

  it("returns null when entity has no parseable schedule data", () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.constantFrom("a", "b", "c", "1", " ", "x", "z")),
        (randomState) => {
          // Ensure the random state is not accidentally a valid date
          const date = new Date(randomState);
          if (!isNaN(date.getTime())) return true; // skip valid dates
          const entity = makeEntity(randomState, {
            friendly_name: "Test",
          });
          return extractNextSchedule(entity) === null;
        }
      ),
      { numRuns: 100 }
    );
  });

  it("output always matches HH:MM format when a valid datetime is provided", () => {
    fc.assert(
      fc.property(isoDatetimeArb(), ({ iso }) => {
        const entity = makeEntity("on", { next_run: iso });
        const result = extractNextSchedule(entity);
        if (result === null) return false;
        // Verify HH:MM format
        const match = result.match(/^(\d{2}):(\d{2})$/);
        if (!match) return false;
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
      }),
      { numRuns: 100 }
    );
  });

  it("prefers next_run attribute over entity state for any valid datetimes", () => {
    fc.assert(
      fc.property(
        isoDatetimeArb(),
        isoDatetimeArb(),
        (nextRunData, stateData) => {
          const entity = makeEntity(stateData.iso, {
            next_run: nextRunData.iso,
          });
          const result = extractNextSchedule(entity);
          const expected = `${String(nextRunData.hour).padStart(2, "0")}:${String(nextRunData.minute).padStart(2, "0")}`;
          return result === expected;
        }
      ),
      { numRuns: 100 }
    );
  });
});
