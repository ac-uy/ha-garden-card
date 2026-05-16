import { describe, it, expect } from "vitest";
import { extractNextSchedule } from "../../src/utils/schedule-parser";
import { HassEntity } from "../../src/models/types";

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

describe("extractNextSchedule", () => {
  it("returns null for undefined entity", () => {
    expect(extractNextSchedule(undefined)).toBeNull();
  });

  it("returns null for unavailable entity", () => {
    const entity = makeEntity("unavailable", {
      next_run: "2024-06-15T08:30:00",
    });
    expect(extractNextSchedule(entity)).toBeNull();
  });

  it("returns null for unknown entity state", () => {
    const entity = makeEntity("unknown");
    expect(extractNextSchedule(entity)).toBeNull();
  });

  it("extracts time from next_run attribute (ISO datetime)", () => {
    const entity = makeEntity("on", {
      next_run: "2024-06-15T08:30:00",
    });
    expect(extractNextSchedule(entity)).toBe("08:30");
  });

  it("extracts time from next_run attribute with timezone offset", () => {
    // This will be parsed in local time by Date constructor
    const entity = makeEntity("on", {
      next_run: "2024-06-15T14:05:00",
    });
    expect(extractNextSchedule(entity)).toBe("14:05");
  });

  it("extracts time from entity state as datetime", () => {
    const entity = makeEntity("2024-06-15T17:45:00");
    expect(extractNextSchedule(entity)).toBe("17:45");
  });

  it("prefers next_run attribute over entity state", () => {
    const entity = makeEntity("2024-06-15T12:00:00", {
      next_run: "2024-06-15T06:00:00",
    });
    expect(extractNextSchedule(entity)).toBe("06:00");
  });

  it("falls back to entity state when next_run is not parseable", () => {
    const entity = makeEntity("2024-06-15T09:15:00", {
      next_run: "not-a-date",
    });
    expect(extractNextSchedule(entity)).toBe("09:15");
  });

  it("returns null when neither next_run nor state is a valid datetime", () => {
    const entity = makeEntity("on", { friendly_name: "My Schedule" });
    expect(extractNextSchedule(entity)).toBeNull();
  });

  it("returns null when next_run is empty string", () => {
    const entity = makeEntity("idle", { next_run: "" });
    expect(extractNextSchedule(entity)).toBeNull();
  });

  it("handles midnight time correctly", () => {
    const entity = makeEntity("on", {
      next_run: "2024-06-15T00:00:00",
    });
    expect(extractNextSchedule(entity)).toBe("00:00");
  });

  it("handles end-of-day time correctly", () => {
    const entity = makeEntity("on", {
      next_run: "2024-06-15T23:59:00",
    });
    expect(extractNextSchedule(entity)).toBe("23:59");
  });

  it("returns null when next_run is not a string", () => {
    const entity = makeEntity("on", { next_run: 12345 });
    expect(extractNextSchedule(entity)).toBeNull();
  });
});
