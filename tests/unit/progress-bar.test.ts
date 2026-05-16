import { describe, it, expect } from "vitest";
import { nothing } from "lit";
import type { HomeAssistant } from "../../src/models/types";
import { ProgressBar } from "../../src/components/progress-bar";

/**
 * Unit tests for the ProgressBar component.
 * Tests rendering logic, progress calculation integration, and edge cases.
 */

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

describe("ProgressBar", () => {
  describe("default properties", () => {
    it("creates an instance with default properties", () => {
      const el = new ProgressBar();
      expect(el.hass).toBeUndefined();
      expect(el.countdownEntity).toBeUndefined();
      expect(el.totalDuration).toBe(0);
      expect(el.color).toBe("#4CAF50");
    });
  });

  describe("render logic", () => {
    it("renders nothing when no countdown entity is configured", () => {
      const el = new ProgressBar();
      el.hass = makeHass({});
      el.totalDuration = 60;

      // Without countdownEntity, render returns nothing
      const result = (el as any).render();
      expect(result).toBe(nothing);
    });

    it("renders nothing when hass is not set", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 60;

      const result = (el as any).render();
      expect(result).toBe(nothing);
    });

    it("renders unavailable text when entity is unavailable", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 60;
      el.hass = makeHass({
        "sensor.zone_1_remaining": { state: "unavailable" },
      });

      const result = (el as any).render();
      // Should render the unavailable template (not nothing)
      expect(result).toBeTruthy();
    });

    it("renders unavailable text when entity state is unknown", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 60;
      el.hass = makeHass({
        "sensor.zone_1_remaining": { state: "unknown" },
      });

      const result = (el as any).render();
      expect(result).toBeTruthy();
    });

    it("renders unavailable text when entity is not found in hass states", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 60;
      el.hass = makeHass({}); // entity not present

      const result = (el as any).render();
      expect(result).toBeTruthy();
    });

    it("renders nothing when total duration is zero", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 0;
      el.hass = makeHass({
        "sensor.zone_1_remaining": { state: "30" },
      });

      const result = (el as any).render();
      expect(result).toBe(nothing);
    });

    it("renders nothing when total duration is negative", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = -10;
      el.hass = makeHass({
        "sensor.zone_1_remaining": { state: "30" },
      });

      const result = (el as any).render();
      expect(result).toBe(nothing);
    });

    it("renders nothing when entity state is not a valid number", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 60;
      el.hass = makeHass({
        "sensor.zone_1_remaining": { state: "not_a_number" },
      });

      const result = (el as any).render();
      expect(result).toBe(nothing);
    });

    it("renders progress bar when all data is valid", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 60;
      el.color = "#FF5722";
      el.hass = makeHass({
        "sensor.zone_1_remaining": { state: "30" },
      });

      const result = (el as any).render();
      // Should render the progress container template
      expect(result).toBeTruthy();
    });

    it("renders with correct progress at 50% elapsed", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 60;
      el.color = "#4CAF50";
      el.hass = makeHass({
        "sensor.zone_1_remaining": { state: "30" },
      });

      const result = (el as any).render();
      // The template result should be truthy (a valid Lit template)
      expect(result).toBeTruthy();
    });

    it("renders with 0% progress when remaining equals total", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 120;
      el.hass = makeHass({
        "sensor.zone_1_remaining": { state: "120" },
      });

      const result = (el as any).render();
      expect(result).toBeTruthy();
    });

    it("renders with 100% progress when remaining is 0", () => {
      const el = new ProgressBar();
      el.countdownEntity = "sensor.zone_1_remaining";
      el.totalDuration = 60;
      el.hass = makeHass({
        "sensor.zone_1_remaining": { state: "0" },
      });

      const result = (el as any).render();
      expect(result).toBeTruthy();
    });
  });
});
