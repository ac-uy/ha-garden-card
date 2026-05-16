import { describe, it } from "vitest";
import * as fc from "fast-check";
import { calculateProgress } from "../../src/utils/progress";

/**
 * Feature: ha-garden-card, Property 10: Progress calculation correctness
 *
 * Validates: Requirements 4.5
 *
 * For any zone with a countdown entity showing remaining seconds and a total
 * duration of total seconds (where total > 0), the progress percentage SHALL
 * equal ((total - remaining) / total) * 100, clamped to [0, 100].
 */
describe("Feature: ha-garden-card, Property 10: Progress calculation correctness", () => {
  it("result is always in [0, 100] for any remaining and positive total", () => {
    fc.assert(
      fc.property(
        fc.double({ min: -1000, max: 10000, noNaN: true }),
        fc.double({ min: 0.001, max: 10000, noNaN: true }),
        (remaining, total) => {
          const result = calculateProgress(remaining, total);
          return result >= 0 && result <= 100;
        }
      ),
      { numRuns: 100 }
    );
  });

  it("when 0 <= remaining <= total, result matches formula exactly", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.001, max: 10000, noNaN: true }),
        fc.double({ min: 0, max: 1, noNaN: true }),
        (total, fraction) => {
          const remaining = fraction * total;
          const result = calculateProgress(remaining, total);
          const expected = ((total - remaining) / total) * 100;
          return Math.abs(result - expected) < 1e-9;
        }
      ),
      { numRuns: 100 }
    );
  });

  it("when remaining > total, result is 0 (clamped)", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.001, max: 10000, noNaN: true }),
        fc.double({ min: 0.001, max: 10000, noNaN: true }),
        (total, excess) => {
          const remaining = total + excess;
          const result = calculateProgress(remaining, total);
          return result === 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  it("when remaining < 0, result is 100 (clamped)", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.001, max: 10000, noNaN: true }),
        fc.double({ min: 0.001, max: 10000, noNaN: true }),
        (total, negAmount) => {
          const remaining = -negAmount;
          const result = calculateProgress(remaining, total);
          return result === 100;
        }
      ),
      { numRuns: 100 }
    );
  });

  it("when total <= 0, result is 0", () => {
    fc.assert(
      fc.property(
        fc.double({ min: -10000, max: 0, noNaN: true }),
        fc.double({ min: -1000, max: 10000, noNaN: true }),
        (total, remaining) => {
          const result = calculateProgress(remaining, total);
          return result === 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
