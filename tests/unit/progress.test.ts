import { describe, it, expect } from "vitest";
import { calculateProgress } from "../../src/utils/progress";

describe("calculateProgress", () => {
  it("returns 0 when remaining equals total (just started)", () => {
    expect(calculateProgress(60, 60)).toBe(0);
  });

  it("returns 100 when remaining is 0 (completed)", () => {
    expect(calculateProgress(0, 60)).toBe(100);
  });

  it("returns 50 when half the time has elapsed", () => {
    expect(calculateProgress(30, 60)).toBe(50);
  });

  it("returns 75 when three quarters elapsed", () => {
    expect(calculateProgress(15, 60)).toBe(75);
  });

  it("clamps to 0 when remaining exceeds total", () => {
    expect(calculateProgress(120, 60)).toBe(0);
  });

  it("clamps to 100 when remaining is negative", () => {
    expect(calculateProgress(-10, 60)).toBe(100);
  });

  it("returns 0 when total is 0", () => {
    expect(calculateProgress(10, 0)).toBe(0);
  });

  it("returns 0 when total is negative", () => {
    expect(calculateProgress(10, -5)).toBe(0);
  });

  it("handles large values correctly", () => {
    expect(calculateProgress(1800, 3600)).toBe(50);
  });

  it("handles fractional seconds", () => {
    const result = calculateProgress(0.5, 1);
    expect(result).toBe(50);
  });
});
