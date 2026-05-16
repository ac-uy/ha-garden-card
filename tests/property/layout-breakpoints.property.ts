import { describe, it } from "vitest";
import * as fc from "fast-check";
import { getLayoutMode } from "../../src/utils/layout";

/**
 * Feature: ha-garden-card, Property 14: Layout breakpoint mapping
 *
 * Validates: Requirements 7.1, 7.2, 7.3
 *
 * For any positive card width value, the computed layout mode SHALL be
 * "compact" when width < 400, "medium" when 400 ≤ width ≤ 800, and
 * "wide" when width > 800. The mapping is deterministic and total
 * (every positive width maps to exactly one mode).
 */
describe("Feature: ha-garden-card, Property 14: Layout breakpoint mapping", () => {
  it("returns 'compact' for any width in (0, 400)", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.01, max: 399.99, noNaN: true }),
        (width) => {
          return getLayoutMode(width) === "compact";
        }
      ),
      { numRuns: 100 }
    );
  });

  it("returns 'medium' for any width in [400, 800]", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 400, max: 800, noNaN: true }),
        (width) => {
          return getLayoutMode(width) === "medium";
        }
      ),
      { numRuns: 100 }
    );
  });

  it("returns 'wide' for any width > 800", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 800.01, max: 10000, noNaN: true }),
        (width) => {
          return getLayoutMode(width) === "wide";
        }
      ),
      { numRuns: 100 }
    );
  });

  it("is deterministic: same input always produces same output", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.01, max: 10000, noNaN: true }),
        (width) => {
          const result1 = getLayoutMode(width);
          const result2 = getLayoutMode(width);
          return result1 === result2;
        }
      ),
      { numRuns: 100 }
    );
  });

  it("is total: every positive width maps to exactly one valid mode", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.01, max: 100000, noNaN: true }),
        (width) => {
          const mode = getLayoutMode(width);
          const validModes = ["compact", "medium", "wide"];
          return validModes.includes(mode);
        }
      ),
      { numRuns: 100 }
    );
  });
});
