import { describe, it, expect } from "vitest";
import { pixelToPercent } from "../../src/utils/coordinates";

describe("pixelToPercent", () => {
  it("converts center of image to (50, 50)", () => {
    expect(pixelToPercent(500, 300, 1000, 600)).toEqual([50, 50]);
  });

  it("converts top-left corner to (0, 0)", () => {
    expect(pixelToPercent(0, 0, 800, 600)).toEqual([0, 0]);
  });

  it("converts bottom-right corner to (100, 100)", () => {
    expect(pixelToPercent(800, 600, 800, 600)).toEqual([100, 100]);
  });

  it("clamps negative pixel values to 0", () => {
    expect(pixelToPercent(-10, -20, 800, 600)).toEqual([0, 0]);
  });

  it("clamps pixel values exceeding dimensions to 100", () => {
    expect(pixelToPercent(900, 700, 800, 600)).toEqual([100, 100]);
  });

  it("handles fractional pixel positions", () => {
    const [x, y] = pixelToPercent(250, 150, 1000, 600);
    expect(x).toBeCloseTo(25, 5);
    expect(y).toBeCloseTo(25, 5);
  });

  it("handles small image dimensions", () => {
    const [x, y] = pixelToPercent(1, 1, 2, 2);
    expect(x).toBeCloseTo(50, 5);
    expect(y).toBeCloseTo(50, 5);
  });
});
