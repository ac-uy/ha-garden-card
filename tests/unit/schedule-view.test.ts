import { describe, it, expect } from "vitest";
import type { ZoneConfig, HomeAssistant } from "../../src/models/types";
import { ScheduleView } from "../../src/components/schedule-view";

/**
 * Unit tests for the ScheduleView component.
 * Tests schedule badge rendering logic for zones with schedule entities.
 */

function makeZone(overrides?: Partial<ZoneConfig>): ZoneConfig {
  return {
    id: "zone-1",
    name: "Front Lawn",
    entity: "switch.front_lawn",
    color: "#4CAF50",
    polygon: [
      [10, 10],
      [90, 10],
      [90, 90],
      [10, 90],
    ],
    ...overrides,
  };
}

function makeHass(
  states: Record<string, { state: string; attributes?: Record<string, unknown> }>
): HomeAssistant {
  const hassStates: Record<string, any> = {};
  for (const [entityId, data] of Object.entries(states)) {
    hassStates[entityId] = {
      state: data.state,
      attributes: data.attributes || { friendly_name: entityId },
      last_changed: new Date().toISOString(),
    };
  }
  return {
    states: hassStates,
    callService: async () => {},
    themes: { darkMode: false },
    locale: { language: "en" },
  };
}

describe("ScheduleView", () => {
  describe("initialization", () => {
    it("creates an instance with default properties", () => {
      const el = new ScheduleView();
      expect(el.zones).toEqual([]);
      expect(el.hass).toBeUndefined();
    });
  });

  describe("_getScheduledZones (via component internals)", () => {
    it("returns empty array when no zones have schedule_entity", () => {
      const el = new ScheduleView();
      el.zones = [makeZone()]; // no schedule_entity
      el.hass = makeHass({});

      const result = (el as any)._getScheduledZones();
      expect(result).toEqual([]);
    });

    it("returns zone with next time when schedule entity has next_run", () => {
      const el = new ScheduleView();
      el.zones = [
        makeZone({ schedule_entity: "sensor.front_lawn_schedule" }),
      ];
      el.hass = makeHass({
        "sensor.front_lawn_schedule": {
          state: "on",
          attributes: { next_run: "2024-06-15T08:30:00" },
        },
      });

      const result = (el as any)._getScheduledZones();
      expect(result).toHaveLength(1);
      expect(result[0].zone.id).toBe("zone-1");
      expect(result[0].nextTime).toBe("08:30");
    });

    it("returns null nextTime when schedule entity is unavailable", () => {
      const el = new ScheduleView();
      el.zones = [
        makeZone({ schedule_entity: "sensor.front_lawn_schedule" }),
      ];
      el.hass = makeHass({
        "sensor.front_lawn_schedule": {
          state: "unavailable",
          attributes: { next_run: "2024-06-15T08:30:00" },
        },
      });

      const result = (el as any)._getScheduledZones();
      expect(result).toHaveLength(1);
      expect(result[0].nextTime).toBeNull();
    });

    it("returns null nextTime when schedule entity is not found", () => {
      const el = new ScheduleView();
      el.zones = [
        makeZone({ schedule_entity: "sensor.nonexistent" }),
      ];
      el.hass = makeHass({});

      const result = (el as any)._getScheduledZones();
      expect(result).toHaveLength(1);
      expect(result[0].nextTime).toBeNull();
    });

    it("handles multiple zones with different schedule states", () => {
      const el = new ScheduleView();
      el.zones = [
        makeZone({
          id: "z1",
          name: "Zone 1",
          schedule_entity: "sensor.schedule_1",
        }),
        makeZone({
          id: "z2",
          name: "Zone 2",
          schedule_entity: "sensor.schedule_2",
        }),
        makeZone({
          id: "z3",
          name: "Zone 3",
          // no schedule_entity
        }),
      ];
      el.hass = makeHass({
        "sensor.schedule_1": {
          state: "on",
          attributes: { next_run: "2024-06-15T06:00:00" },
        },
        "sensor.schedule_2": {
          state: "unavailable",
        },
      });

      const result = (el as any)._getScheduledZones();
      // Only zones with schedule_entity are included
      expect(result).toHaveLength(2);
      expect(result[0].zone.id).toBe("z1");
      expect(result[0].nextTime).toBe("06:00");
      expect(result[1].zone.id).toBe("z2");
      expect(result[1].nextTime).toBeNull();
    });

    it("extracts time from entity state as datetime fallback", () => {
      const el = new ScheduleView();
      el.zones = [
        makeZone({ schedule_entity: "input_datetime.watering_time" }),
      ];
      el.hass = makeHass({
        "input_datetime.watering_time": {
          state: "2024-06-15T17:45:00",
        },
      });

      const result = (el as any)._getScheduledZones();
      expect(result[0].nextTime).toBe("17:45");
    });

    it("returns null nextTime when entity has no parseable schedule", () => {
      const el = new ScheduleView();
      el.zones = [
        makeZone({ schedule_entity: "sensor.schedule_status" }),
      ];
      el.hass = makeHass({
        "sensor.schedule_status": {
          state: "idle",
          attributes: { friendly_name: "Schedule Status" },
        },
      });

      const result = (el as any)._getScheduledZones();
      expect(result[0].nextTime).toBeNull();
    });

    it("works without hass set (returns null for all)", () => {
      const el = new ScheduleView();
      el.zones = [
        makeZone({ schedule_entity: "sensor.schedule_1" }),
      ];
      // hass not set

      const result = (el as any)._getScheduledZones();
      expect(result).toHaveLength(1);
      expect(result[0].nextTime).toBeNull();
    });
  });
});
