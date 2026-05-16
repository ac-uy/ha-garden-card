import { describe, it } from "vitest";
import * as fc from "fast-check";
import { formatRemainingTime } from "../../src/utils/time-format";

/**
 * Feature: ha-garden-card, Property 11: Time formatting
 *
 * Validates: Requirements 4.6
 *
 * For any non-negative integer number of seconds s, the formatted remaining
 * time string SHALL equal floor(s/60) minutes and s % 60 seconds displayed
 * in M:SS or MM:SS format.
 */
describe("Feature: ha-garden-card, Property 11: Time formatting", () => {
  it("formatRemainingTime(s) returns correct M:SS or MM:SS format for any non-negative integer", () => {
    fc.assert(
      fc.property(fc.nat(), (s) => {
        const result = formatRemainingTime(s);
        const expectedMinutes = Math.floor(s / 60);
        const expectedSeconds = s % 60;
        const expected = `${expectedMinutes}:${expectedSeconds.toString().padStart(2, "0")}`;
        return result === expected;
      }),
      { numRuns: 100 }
    );
  });
});
