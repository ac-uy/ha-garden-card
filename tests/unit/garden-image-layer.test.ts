import { describe, it, expect } from "vitest";
import type { ZoneConfig, HomeAssistant } from "../../src/models/types";
import { GardenImageLayer } from "../../src/components/garden-image-layer";

/**
 * Unit tests for the GardenImageLayer component.
 * Tests rendering logic, zone state mapping, and event dispatch.
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

describe("GardenImageLayer", () => {
  describe("_computeZoneRenderData (via component internals)", () => {
    it("creates an instance with default properties", () => {
      const el = new GardenImageLayer();
      expect(el.zones).toEqual([]);
      expect(el.hass).toBeUndefined();
      expect(el.image).toBeUndefined();
    });

    it("computes zone render data for active zone", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({ "switch.front_lawn": { state: "on" } });

      // Access private method via any cast for testing
      const data = (el as any)._computeZoneRenderData();
      expect(data).toHaveLength(1);
      expect(data[0].isActive).toBe(true);
      expect(data[0].isUnavailable).toBe(false);
      expect(data[0].opacity).toBe(0.5);
      expect(data[0].color).toBe("#4CAF50");
      expect(data[0].points).toBe("10,10 90,10 90,90 10,90");
    });

    it("computes zone render data for inactive zone", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({ "switch.front_lawn": { state: "off" } });

      const data = (el as any)._computeZoneRenderData();
      expect(data[0].isActive).toBe(false);
      expect(data[0].isUnavailable).toBe(false);
      expect(data[0].opacity).toBe(0.3);
    });

    it("computes zone render data for unavailable zone", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({ "switch.front_lawn": { state: "unavailable" } });

      const data = (el as any)._computeZoneRenderData();
      expect(data[0].isActive).toBe(false);
      expect(data[0].isUnavailable).toBe(true);
      expect(data[0].opacity).toBe(0.4);
    });

    it("treats unknown state as unavailable", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({ "switch.front_lawn": { state: "unknown" } });

      const data = (el as any)._computeZoneRenderData();
      expect(data[0].isUnavailable).toBe(true);
    });

    it("treats missing entity as unavailable", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({}); // entity not in states

      const data = (el as any)._computeZoneRenderData();
      expect(data[0].isUnavailable).toBe(true);
      expect(data[0].opacity).toBe(0.4);
    });

    it("handles multiple zones with different states", () => {
      const el = new GardenImageLayer();
      el.zones = [
        makeZone({ id: "z1", entity: "switch.zone_1" }),
        makeZone({ id: "z2", entity: "switch.zone_2", color: "#FF0000" }),
        makeZone({ id: "z3", entity: "switch.zone_3", color: "#0000FF" }),
      ];
      el.hass = makeHass({
        "switch.zone_1": { state: "on" },
        "switch.zone_2": { state: "off" },
        "switch.zone_3": { state: "unavailable" },
      });

      const data = (el as any)._computeZoneRenderData();
      expect(data).toHaveLength(3);
      expect(data[0].isActive).toBe(true);
      expect(data[1].isActive).toBe(false);
      expect(data[2].isUnavailable).toBe(true);
    });

    it("converts polygon coordinates to SVG points string", () => {
      const el = new GardenImageLayer();
      el.zones = [
        makeZone({
          polygon: [
            [0, 0],
            [50, 25],
            [100, 100],
          ],
        }),
      ];
      el.hass = makeHass({ "switch.front_lawn": { state: "off" } });

      const data = (el as any)._computeZoneRenderData();
      expect(data[0].points).toBe("0,0 50,25 100,100");
    });
  });

  describe("zone-tap event dispatch", () => {
    it("dispatches zone-tap event for active zone", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({ "switch.front_lawn": { state: "off" } });

      let receivedEvent: CustomEvent | null = null;
      el.addEventListener("zone-tap", ((e: CustomEvent) => {
        receivedEvent = e;
      }) as EventListener);

      (el as any)._handleZoneTap("zone-1");

      expect(receivedEvent).not.toBeNull();
      expect(receivedEvent!.detail.zoneId).toBe("zone-1");
    });

    it("does not dispatch zone-tap for unavailable zone", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({ "switch.front_lawn": { state: "unavailable" } });

      let receivedEvent: CustomEvent | null = null;
      el.addEventListener("zone-tap", ((e: CustomEvent) => {
        receivedEvent = e;
      }) as EventListener);

      (el as any)._handleZoneTap("zone-1");

      expect(receivedEvent).toBeNull();
    });

    it("does not dispatch zone-tap for unknown state zone", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({ "switch.front_lawn": { state: "unknown" } });

      let receivedEvent: CustomEvent | null = null;
      el.addEventListener("zone-tap", ((e: CustomEvent) => {
        receivedEvent = e;
      }) as EventListener);

      (el as any)._handleZoneTap("zone-1");

      expect(receivedEvent).toBeNull();
    });

    it("does not dispatch zone-tap for non-existent zone id", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({ "switch.front_lawn": { state: "on" } });

      let receivedEvent: CustomEvent | null = null;
      el.addEventListener("zone-tap", ((e: CustomEvent) => {
        receivedEvent = e;
      }) as EventListener);

      (el as any)._handleZoneTap("non-existent");

      expect(receivedEvent).toBeNull();
    });

    it("dispatches event with bubbles and composed flags", () => {
      const el = new GardenImageLayer();
      el.zones = [makeZone()];
      el.hass = makeHass({ "switch.front_lawn": { state: "on" } });

      let receivedEvent: CustomEvent | null = null;
      el.addEventListener("zone-tap", ((e: CustomEvent) => {
        receivedEvent = e;
      }) as EventListener);

      (el as any)._handleZoneTap("zone-1");

      expect(receivedEvent!.bubbles).toBe(true);
      expect(receivedEvent!.composed).toBe(true);
    });
  });
});
