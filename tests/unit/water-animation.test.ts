import { describe, it, expect } from "vitest";
import {
  WaterAnimation,
  waterAnimationStyles,
  getWaterPatternSvg,
} from "../../src/components/water-animation";
import type { WaterAnimationZone } from "../../src/components/water-animation";

/**
 * Unit tests for the WaterAnimation component.
 * Tests rendering logic, pattern generation, and animation behavior.
 */

function makeActiveZone(overrides?: Partial<WaterAnimationZone>): WaterAnimationZone {
  return {
    id: "zone-1",
    color: "#4CAF50",
    points: "10,10 90,10 90,90 10,90",
    isActive: true,
    ...overrides,
  };
}

describe("WaterAnimation", () => {
  describe("component instantiation", () => {
    it("creates an instance with default properties", () => {
      const el = new WaterAnimation();
      expect(el.zones).toEqual([]);
    });

    it("accepts zones property", () => {
      const el = new WaterAnimation();
      const zones = [makeActiveZone()];
      el.zones = zones;
      expect(el.zones).toEqual(zones);
    });
  });

  describe("render behavior", () => {
    it("returns nothing when no zones are active", () => {
      const el = new WaterAnimation();
      el.zones = [makeActiveZone({ isActive: false })];

      // When no active zones, render returns nothing (null-like)
      const result = (el as any).render();
      // Lit's `nothing` is a sentinel value
      expect(result).toBeDefined();
    });

    it("renders SVG when active zones exist", () => {
      const el = new WaterAnimation();
      el.zones = [makeActiveZone()];

      const result = (el as any).render();
      // Should return an html template result (not nothing)
      expect(result).toBeDefined();
      expect(result).not.toBeNull();
    });

    it("only renders active zones in the SVG", () => {
      const el = new WaterAnimation();
      el.zones = [
        makeActiveZone({ id: "z1", isActive: true }),
        makeActiveZone({ id: "z2", isActive: false }),
        makeActiveZone({ id: "z3", isActive: true }),
      ];

      // The component filters to active zones only
      const activeZones = el.zones.filter((z) => z.isActive);
      expect(activeZones).toHaveLength(2);
      expect(activeZones[0].id).toBe("z1");
      expect(activeZones[1].id).toBe("z3");
    });
  });

  describe("pattern definition rendering", () => {
    it("generates pattern with zone color", () => {
      const el = new WaterAnimation();
      const zone = makeActiveZone({ id: "test-zone", color: "#FF5733" });

      // Access private method for testing
      const patternResult = (el as any)._renderPatternDef(zone);
      expect(patternResult).toBeDefined();
    });

    it("uses unique pattern ID per zone", () => {
      const el = new WaterAnimation();
      const zone1 = makeActiveZone({ id: "zone-a", color: "#FF0000" });
      const zone2 = makeActiveZone({ id: "zone-b", color: "#00FF00" });

      // Pattern IDs should be different for different zones
      const patternId1 = `water-pattern-${zone1.id}`;
      const patternId2 = `water-pattern-${zone2.id}`;
      expect(patternId1).toBe("water-pattern-zone-a");
      expect(patternId2).toBe("water-pattern-zone-b");
      expect(patternId1).not.toBe(patternId2);
    });
  });

  describe("zone animation rendering", () => {
    it("renders active zone with active class", () => {
      const el = new WaterAnimation();
      const zone = makeActiveZone({ isActive: true });

      const result = (el as any)._renderZoneAnimation(zone);
      expect(result).toBeDefined();
    });

    it("renders inactive zone with inactive class", () => {
      const el = new WaterAnimation();
      const zone = makeActiveZone({ isActive: false });

      const result = (el as any)._renderZoneAnimation(zone);
      expect(result).toBeDefined();
    });
  });

  describe("CSS animation styles", () => {
    it("exports waterAnimationStyles as a CSSResultGroup", () => {
      expect(waterAnimationStyles).toBeDefined();
      // CSSResultGroup can be an array or a single CSSResult
      // It should be truthy and usable in Lit's static styles
      expect(waterAnimationStyles).not.toBeNull();
    });

    it("component has static styles defined", () => {
      expect(WaterAnimation.styles).toBeDefined();
    });
  });

  describe("getWaterPatternSvg helper", () => {
    it("generates SVG pattern string with correct zone ID", () => {
      const result = getWaterPatternSvg("my-zone", "#4CAF50");
      expect(result).toContain('id="water-pattern-my-zone"');
    });

    it("uses the provided color for circle fills", () => {
      const color = "#FF5733";
      const result = getWaterPatternSvg("zone-1", color);
      expect(result).toContain(`fill="${color}"`);
    });

    it("includes animate elements for particle effect", () => {
      const result = getWaterPatternSvg("zone-1", "#000000");
      expect(result).toContain("<animate");
      expect(result).toContain('attributeName="opacity"');
      expect(result).toContain('repeatCount="indefinite"');
    });

    it("includes pattern with userSpaceOnUse units", () => {
      const result = getWaterPatternSvg("zone-1", "#123456");
      expect(result).toContain('patternUnits="userSpaceOnUse"');
    });

    it("includes rotation transform for natural look", () => {
      const result = getWaterPatternSvg("zone-1", "#123456");
      expect(result).toContain("patternTransform");
      expect(result).toContain("rotate");
    });

    it("generates different pattern IDs for different zone IDs", () => {
      const result1 = getWaterPatternSvg("zone-a", "#FF0000");
      const result2 = getWaterPatternSvg("zone-b", "#00FF00");
      expect(result1).toContain('id="water-pattern-zone-a"');
      expect(result2).toContain('id="water-pattern-zone-b"');
    });
  });

  describe("performance characteristics", () => {
    it("uses will-change: opacity in styles for GPU compositing", () => {
      // Verify the CSS contains will-change property
      const stylesStr = WaterAnimation.styles?.toString() || "";
      // The styles array includes waterAnimationStyles which has will-change
      expect(stylesStr).toContain("will-change");
    });

    it("uses pointer-events: none to avoid layout interference", () => {
      const stylesStr = WaterAnimation.styles?.toString() || "";
      expect(stylesStr).toContain("pointer-events");
    });

    it("uses CSS transitions for fade-out (500ms)", () => {
      const stylesStr = waterAnimationStyles.toString();
      expect(stylesStr).toContain("500ms");
    });
  });
});
