import { describe, it, expect, vi } from "vitest";
import type { ZoneConfig, HomeAssistant } from "../../src/models/types";
import {
  ZoneControl,
  ZoneControlPanel,
  getStartService,
  getStopService,
} from "../../src/components/zone-control";

/**
 * Unit tests for ZoneControl and ZoneControlPanel components.
 * Tests service call routing, state handling, and unavailable behavior.
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
  states: Record<
    string,
    { state: string; attributes?: Record<string, unknown> }
  >,
  callServiceMock?: ReturnType<typeof vi.fn>
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
    callService: callServiceMock || vi.fn().mockResolvedValue(undefined),
    themes: { darkMode: false },
    locale: { language: "en" },
  };
}

// =============================================================================
// Service Call Routing Tests
// =============================================================================

describe("getStartService", () => {
  it("returns switch.turn_on for switch entities", () => {
    const result = getStartService("switch.irrigation_zone_1");
    expect(result).toEqual({ domain: "switch", service: "turn_on" });
  });

  it("returns valve.open for valve entities", () => {
    const result = getStartService("valve.garden_valve");
    expect(result).toEqual({ domain: "valve", service: "open" });
  });

  it("returns homeassistant.turn_on for input_boolean entities", () => {
    const result = getStartService("input_boolean.zone_toggle");
    expect(result).toEqual({ domain: "homeassistant", service: "turn_on" });
  });

  it("defaults to switch.turn_on for unknown domains", () => {
    const result = getStartService("light.some_light");
    expect(result).toEqual({ domain: "switch", service: "turn_on" });
  });
});

describe("getStopService", () => {
  it("returns switch.turn_off for switch entities", () => {
    const result = getStopService("switch.irrigation_zone_1");
    expect(result).toEqual({ domain: "switch", service: "turn_off" });
  });

  it("returns valve.close for valve entities", () => {
    const result = getStopService("valve.garden_valve");
    expect(result).toEqual({ domain: "valve", service: "close" });
  });

  it("returns homeassistant.turn_off for input_boolean entities", () => {
    const result = getStopService("input_boolean.zone_toggle");
    expect(result).toEqual({ domain: "homeassistant", service: "turn_off" });
  });

  it("defaults to switch.turn_off for unknown domains", () => {
    const result = getStopService("light.some_light");
    expect(result).toEqual({ domain: "switch", service: "turn_off" });
  });
});

// =============================================================================
// ZoneControl Component Tests
// =============================================================================

describe("ZoneControl", () => {
  describe("entity state detection", () => {
    it("detects active state when entity is on", () => {
      const el = new ZoneControl();
      el.zone = makeZone();
      el.hass = makeHass({ "switch.front_lawn": { state: "on" } });

      expect((el as any)._isActive).toBe(true);
      expect((el as any)._isUnavailable).toBe(false);
      expect((el as any)._statusText).toBe("Active");
    });

    it("detects active state when valve entity is open", () => {
      const el = new ZoneControl();
      el.zone = makeZone({ entity: "valve.garden" });
      el.hass = makeHass({ "valve.garden": { state: "open" } });

      expect((el as any)._isActive).toBe(true);
    });

    it("detects inactive state when entity is off", () => {
      const el = new ZoneControl();
      el.zone = makeZone();
      el.hass = makeHass({ "switch.front_lawn": { state: "off" } });

      expect((el as any)._isActive).toBe(false);
      expect((el as any)._isUnavailable).toBe(false);
      expect((el as any)._statusText).toBe("Idle");
    });

    it("detects unavailable state", () => {
      const el = new ZoneControl();
      el.zone = makeZone();
      el.hass = makeHass({ "switch.front_lawn": { state: "unavailable" } });

      expect((el as any)._isActive).toBe(false);
      expect((el as any)._isUnavailable).toBe(true);
      expect((el as any)._statusText).toBe("Unavailable");
    });

    it("treats unknown state as unavailable", () => {
      const el = new ZoneControl();
      el.zone = makeZone();
      el.hass = makeHass({ "switch.front_lawn": { state: "unknown" } });

      expect((el as any)._isUnavailable).toBe(true);
      expect((el as any)._statusText).toBe("Unavailable");
    });

    it("treats missing entity as unavailable", () => {
      const el = new ZoneControl();
      el.zone = makeZone();
      el.hass = makeHass({});

      expect((el as any)._isUnavailable).toBe(true);
    });

    it("returns unavailable when hass is not set", () => {
      const el = new ZoneControl();
      el.zone = makeZone();

      expect((el as any)._entityState).toBe("unavailable");
      expect((el as any)._isUnavailable).toBe(true);
    });
  });

  describe("service call handling", () => {
    it("calls switch.turn_on when starting a switch entity", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new ZoneControl();
      el.zone = makeZone({ entity: "switch.zone_1" });
      el.hass = makeHass(
        { "switch.zone_1": { state: "off" } },
        callService
      );

      await (el as any)._handleStart();

      expect(callService).toHaveBeenCalledWith("switch", "turn_on", {
        entity_id: "switch.zone_1",
      });
    });

    it("calls switch.turn_off when stopping a switch entity", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new ZoneControl();
      el.zone = makeZone({ entity: "switch.zone_1" });
      el.hass = makeHass(
        { "switch.zone_1": { state: "on" } },
        callService
      );

      await (el as any)._handleStop();

      expect(callService).toHaveBeenCalledWith("switch", "turn_off", {
        entity_id: "switch.zone_1",
      });
    });

    it("calls valve.open when starting a valve entity", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new ZoneControl();
      el.zone = makeZone({ entity: "valve.garden_valve" });
      el.hass = makeHass(
        { "valve.garden_valve": { state: "closed" } },
        callService
      );

      await (el as any)._handleStart();

      expect(callService).toHaveBeenCalledWith("valve", "open", {
        entity_id: "valve.garden_valve",
      });
    });

    it("calls valve.close when stopping a valve entity", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new ZoneControl();
      el.zone = makeZone({ entity: "valve.garden_valve" });
      el.hass = makeHass(
        { "valve.garden_valve": { state: "open" } },
        callService
      );

      await (el as any)._handleStop();

      expect(callService).toHaveBeenCalledWith("valve", "close", {
        entity_id: "valve.garden_valve",
      });
    });

    it("calls homeassistant.turn_on for input_boolean start", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new ZoneControl();
      el.zone = makeZone({ entity: "input_boolean.zone_toggle" });
      el.hass = makeHass(
        { "input_boolean.zone_toggle": { state: "off" } },
        callService
      );

      await (el as any)._handleStart();

      expect(callService).toHaveBeenCalledWith("homeassistant", "turn_on", {
        entity_id: "input_boolean.zone_toggle",
      });
    });

    it("calls homeassistant.turn_off for input_boolean stop", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new ZoneControl();
      el.zone = makeZone({ entity: "input_boolean.zone_toggle" });
      el.hass = makeHass(
        { "input_boolean.zone_toggle": { state: "on" } },
        callService
      );

      await (el as any)._handleStop();

      expect(callService).toHaveBeenCalledWith("homeassistant", "turn_off", {
        entity_id: "input_boolean.zone_toggle",
      });
    });

    it("does not call service when entity is unavailable", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new ZoneControl();
      el.zone = makeZone();
      el.hass = makeHass(
        { "switch.front_lawn": { state: "unavailable" } },
        callService
      );

      await (el as any)._handleStart();
      await (el as any)._handleStop();

      expect(callService).not.toHaveBeenCalled();
    });

    it("does not call service when hass is not set", async () => {
      const el = new ZoneControl();
      el.zone = makeZone();

      // Should not throw
      await (el as any)._handleStart();
      await (el as any)._handleStop();
    });
  });
});

// =============================================================================
// ZoneControlPanel Component Tests
// =============================================================================

describe("ZoneControlPanel", () => {
  it("creates an instance with default properties", () => {
    const el = new ZoneControlPanel();
    expect(el.zones).toEqual([]);
    expect(el.hass).toBeUndefined();
  });

  it("accepts zones and hass properties", () => {
    const el = new ZoneControlPanel();
    const zones = [makeZone(), makeZone({ id: "zone-2", name: "Back Yard" })];
    const hass = makeHass({ "switch.front_lawn": { state: "off" } });

    el.zones = zones;
    el.hass = hass;

    expect(el.zones).toHaveLength(2);
    expect(el.hass).toBeDefined();
  });
});
