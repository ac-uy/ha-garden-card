import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { pixelToPercent } from "../../src/utils/coordinates";

/**
 * Feature: ha-garden-card, Property 7: Coordinate transformation correctness
 *
 * For any click event at pixel position (px, py) on an image element of dimensions
 * (width, height), the computed percentage coordinates SHALL equal
 * (px / width * 100, py / height * 100) clamped to the range [0, 100].
 *
 * **Validates: Requirements 3.2**
 */
describe("Property 7: Coordinate transformation correctness", () => {
  it("computes correct percentage coordinates for any valid pixel position within bounds", () => {
    fc.assert(
      fc.property(
        fc.float({ min: 1, max: 10000, noNaN: true }),  // width
        fc.float({ min: 1, max: 10000, noNaN: true }),  // height
        fc.float({ min: 0, max: 10000, noNaN: true }),  // px
        fc.float({ min: 0, max: 10000, noNaN: true }),  // py
        (width, height, px, py) => {
          const [xPercent, yPercent] = pixelToPercent(px, py, width, height);

          const expectedX = Math.min(100, Math.max(0, (px / width) * 100));
          const expectedY = Math.min(100, Math.max(0, (py / height) * 100));

          expect(xPercent).toBeCloseTo(expectedX, 5);
          expect(yPercent).toBeCloseTo(expectedY, 5);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("clamps negative pixel values to 0", () => {
    fc.assert(
      fc.property(
        fc.float({ min: 1, max: 10000, noNaN: true }),    // width
        fc.float({ min: 1, max: 10000, noNaN: true }),    // height
        fc.float({ min: -10000, max: Math.fround(-0.001), noNaN: true }), // negative px
        fc.float({ min: -10000, max: Math.fround(-0.001), noNaN: true }), // negative py
        (width, height, px, py) => {
          const [xPercent, yPercent] = pixelToPercent(px, py, width, height);

          expect(xPercent).toBe(0);
          expect(yPercent).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("clamps pixel values exceeding dimensions to 100", () => {
    fc.assert(
      fc.property(
        fc.float({ min: 1, max: 10000, noNaN: true }),  // width
        fc.float({ min: 1, max: 10000, noNaN: true }),  // height
        (width, height) => {
          // px exceeds width, py exceeds height
          const px = width + Math.abs(width) * 0.1 + 1;
          const py = height + Math.abs(height) * 0.1 + 1;

          const [xPercent, yPercent] = pixelToPercent(px, py, width, height);

          expect(xPercent).toBe(100);
          expect(yPercent).toBe(100);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("output is always within [0, 100] for any input", () => {
    fc.assert(
      fc.property(
        fc.float({ min: 1, max: 10000, noNaN: true }),       // width (positive)
        fc.float({ min: 1, max: 10000, noNaN: true }),       // height (positive)
        fc.float({ min: -10000, max: 20000, noNaN: true }),  // px (any value)
        fc.float({ min: -10000, max: 20000, noNaN: true }),  // py (any value)
        (width, height, px, py) => {
          const [xPercent, yPercent] = pixelToPercent(px, py, width, height);

          expect(xPercent).toBeGreaterThanOrEqual(0);
          expect(xPercent).toBeLessThanOrEqual(100);
          expect(yPercent).toBeGreaterThanOrEqual(0);
          expect(yPercent).toBeLessThanOrEqual(100);
        }
      ),
      { numRuns: 100 }
    );
  });
});
