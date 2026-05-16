import { describe, it, expect } from "vitest";
import { formatRemainingTime } from "../../src/utils/time-format";

describe("formatRemainingTime", () => {
  it("formats 0 seconds as 0:00", () => {
    expect(formatRemainingTime(0)).toBe("0:00");
  });

  it("formats seconds less than a minute", () => {
    expect(formatRemainingTime(5)).toBe("0:05");
    expect(formatRemainingTime(30)).toBe("0:30");
    expect(formatRemainingTime(59)).toBe("0:59");
  });

  it("formats exact minutes", () => {
    expect(formatRemainingTime(60)).toBe("1:00");
    expect(formatRemainingTime(120)).toBe("2:00");
    expect(formatRemainingTime(600)).toBe("10:00");
  });

  it("formats minutes and seconds", () => {
    expect(formatRemainingTime(65)).toBe("1:05");
    expect(formatRemainingTime(90)).toBe("1:30");
    expect(formatRemainingTime(754)).toBe("12:34");
  });

  it("pads seconds with leading zero", () => {
    expect(formatRemainingTime(61)).toBe("1:01");
    expect(formatRemainingTime(609)).toBe("10:09");
  });

  it("handles large values", () => {
    expect(formatRemainingTime(3600)).toBe("60:00");
    expect(formatRemainingTime(5999)).toBe("99:59");
  });

  it("floors fractional seconds", () => {
    expect(formatRemainingTime(65.7)).toBe("1:05");
    expect(formatRemainingTime(59.9)).toBe("0:59");
  });

  it("treats negative values as 0", () => {
    expect(formatRemainingTime(-1)).toBe("0:00");
    expect(formatRemainingTime(-100)).toBe("0:00");
  });
});
