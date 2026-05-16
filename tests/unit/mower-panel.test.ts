import { describe, it, expect, vi } from "vitest";
import type { MowerConfig, HomeAssistant } from "../../src/models/types";
import {
  MowerPanel,
  getMowerActivity,
  getActivityIcon,
  getActivityLabel,
  getBatteryIcon,
  getBatteryLevelClass,
} from "../../src/components/mower-panel";

/**
 * Unit tests for MowerPanel component.
 * Tests activity state mapping, battery display, service calls,
 * error state handling, and unavailable behavior.
 */

function makeMowerConfig(overrides?: Partial<MowerConfig>): MowerConfig {
  return {
    entity: "lawn_mower.my_mower",
    battery_entity: "sensor.mower_battery",
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
// getMowerActivity Tests
// =============================================================================

describe("getMowerActivity", () => {
  it("maps 'mowing' state to mowing activity", () => {
    expect(getMowerActivity("mowing")).toBe("mowing");
  });

  it("maps 'docked' state to docked activity", () => {
    expect(getMowerActivity("docked")).toBe("docked");
  });

  it("maps 'paused' state to paused activity", () => {
    expect(getMowerActivity("paused")).toBe("paused");
  });

  it("maps 'returning' state to returning activity", () => {
    expect(getMowerActivity("returning")).toBe("returning");
  });

  it("maps 'error' state to error activity", () => {
    expect(getMowerActivity("error")).toBe("error");
  });

  it("maps unknown states to 'unknown' activity", () => {
    expect(getMowerActivity("unavailable")).toBe("unknown");
    expect(getMowerActivity("idle")).toBe("unknown");
    expect(getMowerActivity("")).toBe("unknown");
  });
});

// =============================================================================
// getActivityIcon Tests
// =============================================================================

describe("getActivityIcon", () => {
  it("returns a non-empty string for each activity state", () => {
    const activities = ["mowing", "docked", "paused", "returning", "error", "unknown"] as const;
    for (const activity of activities) {
      const icon = getActivityIcon(activity);
      expect(icon).toBeTruthy();
      expect(typeof icon).toBe("string");
    }
  });

  it("returns different icons for different states", () => {
    const icons = new Set([
      getActivityIcon("mowing"),
      getActivityIcon("docked"),
      getActivityIcon("paused"),
      getActivityIcon("returning"),
      getActivityIcon("error"),
    ]);
    expect(icons.size).toBe(5);
  });
});

// =============================================================================
// getActivityLabel Tests
// =============================================================================

describe("getActivityLabel", () => {
  it("returns 'Mowing' for mowing activity", () => {
    expect(getActivityLabel("mowing")).toBe("Mowing");
  });

  it("returns 'Docked' for docked activity", () => {
    expect(getActivityLabel("docked")).toBe("Docked");
  });

  it("returns 'Paused' for paused activity", () => {
    expect(getActivityLabel("paused")).toBe("Paused");
  });

  it("returns 'Returning' for returning activity", () => {
    expect(getActivityLabel("returning")).toBe("Returning");
  });

  it("returns 'Error' for error activity", () => {
    expect(getActivityLabel("error")).toBe("Error");
  });

  it("returns 'Unknown' for unknown activity", () => {
    expect(getActivityLabel("unknown")).toBe("Unknown");
  });
});

// =============================================================================
// getBatteryIcon Tests
// =============================================================================

describe("getBatteryIcon", () => {
  it("returns a non-empty string for null level", () => {
    expect(getBatteryIcon(null)).toBeTruthy();
  });

  it("returns full battery icon for level > 75", () => {
    const icon76 = getBatteryIcon(76);
    const icon100 = getBatteryIcon(100);
    expect(icon76).toBe(icon100);
  });

  it("returns medium battery icon for level 25-75", () => {
    const icon25 = getBatteryIcon(25);
    const icon75 = getBatteryIcon(75);
    expect(icon25).toBe(icon75);
  });

  it("returns low battery icon for level < 25", () => {
    const icon0 = getBatteryIcon(0);
    const icon24 = getBatteryIcon(24);
    expect(icon0).toBe(icon24);
  });

  it("returns different icons for different ranges", () => {
    const icons = new Set([
      getBatteryIcon(null),
      getBatteryIcon(100),
      getBatteryIcon(50),
      getBatteryIcon(10),
    ]);
    expect(icons.size).toBe(4);
  });
});

// =============================================================================
// getBatteryLevelClass Tests
// =============================================================================

describe("getBatteryLevelClass", () => {
  it("returns 'unknown' for null level", () => {
    expect(getBatteryLevelClass(null)).toBe("unknown");
  });

  it("returns 'full' for level > 75", () => {
    expect(getBatteryLevelClass(76)).toBe("full");
    expect(getBatteryLevelClass(100)).toBe("full");
  });

  it("returns 'medium' for level 25-75", () => {
    expect(getBatteryLevelClass(25)).toBe("medium");
    expect(getBatteryLevelClass(50)).toBe("medium");
    expect(getBatteryLevelClass(75)).toBe("medium");
  });

  it("returns 'low' for level < 25", () => {
    expect(getBatteryLevelClass(0)).toBe("low");
    expect(getBatteryLevelClass(24)).toBe("low");
  });
});

// =============================================================================
// MowerPanel Component Tests
// =============================================================================

describe("MowerPanel", () => {
  describe("activity state detection", () => {
    it("detects mowing activity", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({ "lawn_mower.my_mower": { state: "mowing" } });

      expect((el as any)._activity).toBe("mowing");
      expect((el as any)._isUnavailable).toBe(false);
    });

    it("detects docked activity", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({ "lawn_mower.my_mower": { state: "docked" } });

      expect((el as any)._activity).toBe("docked");
    });

    it("detects paused activity", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({ "lawn_mower.my_mower": { state: "paused" } });

      expect((el as any)._activity).toBe("paused");
    });

    it("detects returning activity", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({ "lawn_mower.my_mower": { state: "returning" } });

      expect((el as any)._activity).toBe("returning");
    });

    it("detects error activity", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({
        "lawn_mower.my_mower": {
          state: "error",
          attributes: { error: "Blade stuck" },
        },
      });

      expect((el as any)._activity).toBe("error");
    });

    it("detects unavailable state", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({ "lawn_mower.my_mower": { state: "unavailable" } });

      expect((el as any)._isUnavailable).toBe(true);
      expect((el as any)._activity).toBe("unknown");
    });

    it("treats unknown state as unavailable", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({ "lawn_mower.my_mower": { state: "unknown" } });

      expect((el as any)._isUnavailable).toBe(true);
    });

    it("treats missing entity as unavailable", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({});

      expect((el as any)._isUnavailable).toBe(true);
    });

    it("returns unavailable when hass is not set", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();

      expect((el as any)._entityState).toBe("unavailable");
      expect((el as any)._isUnavailable).toBe(true);
    });
  });

  describe("battery level", () => {
    it("reads battery level from battery entity", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({
        "lawn_mower.my_mower": { state: "docked" },
        "sensor.mower_battery": { state: "85" },
      });

      expect((el as any)._batteryLevel).toBe(85);
    });

    it("returns null when no battery entity is configured", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig({ battery_entity: undefined });
      el.hass = makeHass({ "lawn_mower.my_mower": { state: "docked" } });

      expect((el as any)._batteryLevel).toBeNull();
    });

    it("returns null when battery entity is unavailable", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({
        "lawn_mower.my_mower": { state: "docked" },
        "sensor.mower_battery": { state: "unavailable" },
      });

      expect((el as any)._batteryLevel).toBeNull();
    });

    it("returns null when battery entity state is not a number", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({
        "lawn_mower.my_mower": { state: "docked" },
        "sensor.mower_battery": { state: "not_a_number" },
      });

      expect((el as any)._batteryLevel).toBeNull();
    });

    it("clamps battery level to 0-100 range", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({
        "lawn_mower.my_mower": { state: "docked" },
        "sensor.mower_battery": { state: "150" },
      });

      expect((el as any)._batteryLevel).toBe(100);

      el.hass = makeHass({
        "lawn_mower.my_mower": { state: "docked" },
        "sensor.mower_battery": { state: "-10" },
      });

      expect((el as any)._batteryLevel).toBe(0);
    });

    it("returns null when hass is not set", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();

      expect((el as any)._batteryLevel).toBeNull();
    });
  });

  describe("error description", () => {
    it("returns error description from entity attributes when in error state", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({
        "lawn_mower.my_mower": {
          state: "error",
          attributes: { error: "Blade stuck" },
        },
      });

      expect((el as any)._errorDescription).toBe("Blade stuck");
    });

    it("returns null when not in error state", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({
        "lawn_mower.my_mower": {
          state: "mowing",
          attributes: { error: "Some old error" },
        },
      });

      expect((el as any)._errorDescription).toBeNull();
    });

    it("returns null when error attribute is not a string", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({
        "lawn_mower.my_mower": {
          state: "error",
          attributes: { error: 123 },
        },
      });

      expect((el as any)._errorDescription).toBeNull();
    });

    it("returns null when error attribute is missing", () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass({
        "lawn_mower.my_mower": {
          state: "error",
          attributes: {},
        },
      });

      expect((el as any)._errorDescription).toBeNull();
    });
  });

  describe("service call handling", () => {
    it("calls lawn_mower.start_mowing on start", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass(
        { "lawn_mower.my_mower": { state: "docked" } },
        callService
      );

      await (el as any)._handleStart();

      expect(callService).toHaveBeenCalledWith("lawn_mower", "start_mowing", {
        entity_id: "lawn_mower.my_mower",
      });
    });

    it("calls lawn_mower.pause on pause", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass(
        { "lawn_mower.my_mower": { state: "mowing" } },
        callService
      );

      await (el as any)._handlePause();

      expect(callService).toHaveBeenCalledWith("lawn_mower", "pause", {
        entity_id: "lawn_mower.my_mower",
      });
    });

    it("calls lawn_mower.dock on dock", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass(
        { "lawn_mower.my_mower": { state: "mowing" } },
        callService
      );

      await (el as any)._handleDock();

      expect(callService).toHaveBeenCalledWith("lawn_mower", "dock", {
        entity_id: "lawn_mower.my_mower",
      });
    });

    it("does not call service when entity is unavailable", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new MowerPanel();
      el.config = makeMowerConfig();
      el.hass = makeHass(
        { "lawn_mower.my_mower": { state: "unavailable" } },
        callService
      );

      await (el as any)._handleStart();
      await (el as any)._handlePause();
      await (el as any)._handleDock();

      expect(callService).not.toHaveBeenCalled();
    });

    it("does not call service when hass is not set", async () => {
      const el = new MowerPanel();
      el.config = makeMowerConfig();

      // Should not throw
      await (el as any)._handleStart();
      await (el as any)._handlePause();
      await (el as any)._handleDock();
    });

    it("does not call service when config is not set", async () => {
      const callService = vi.fn().mockResolvedValue(undefined);
      const el = new MowerPanel();
      el.hass = makeHass(
        { "lawn_mower.my_mower": { state: "docked" } },
        callService
      );

      await (el as any)._handleStart();

      expect(callService).not.toHaveBeenCalled();
    });
  });
});
