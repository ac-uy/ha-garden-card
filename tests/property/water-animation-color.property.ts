import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { getWaterPatternSvg } from "../../src/components/water-animation";

/**
 * Feature: ha-garden-card, Property 16: Water animation uses zone color
 *
 * For any active zone with a configured hex color, the water animation effect's
 * base color (fill attribute in the SVG pattern) SHALL match the zone's configured
 * color value.
 *
 * **Validates: Requirements 9.5**
 */
describe("Property 16: Water animation uses zone color", () => {
  /**
   * Arbitrary for valid hex color strings (#RRGGBB format).
   */
  const hexColorArb = fc
    .tuple(
      fc.integer({ min: 0, max: 255 }),
      fc.integer({ min: 0, max: 255 }),
      fc.integer({ min: 0, max: 255 })
    )
    .map(
      ([r, g, b]) =>
        `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
    );

  /**
   * Arbitrary for zone IDs (alphanumeric strings with dashes/underscores).
   */
  const zoneIdArb = fc.stringMatching(/^[a-z][a-z0-9_-]{0,19}$/);

  it("SVG pattern fill attributes match the configured zone color for any hex color", () => {
    fc.assert(
      fc.property(zoneIdArb, hexColorArb, (zoneId, color) => {
        const svgOutput = getWaterPatternSvg(zoneId, color);

        // The SVG should contain fill="${color}" for the generated color
        expect(svgOutput).toContain(`fill="${color}"`);
      }),
      { numRuns: 100 }
    );
  });

  it("SVG pattern contains the zone ID in the pattern id attribute", () => {
    fc.assert(
      fc.property(zoneIdArb, hexColorArb, (zoneId, color) => {
        const svgOutput = getWaterPatternSvg(zoneId, color);

        // The pattern ID should include the zone ID for namespacing
        expect(svgOutput).toContain(`id="water-pattern-${zoneId}"`);
      }),
      { numRuns: 100 }
    );
  });

  it("all fill attributes in the SVG pattern use the configured color", () => {
    fc.assert(
      fc.property(zoneIdArb, hexColorArb, (zoneId, color) => {
        const svgOutput = getWaterPatternSvg(zoneId, color);

        // Extract all fill="..." values from the SVG
        const fillMatches = svgOutput.match(/fill="([^"]+)"/g);

        // There should be at least one fill attribute
        expect(fillMatches).not.toBeNull();
        expect(fillMatches!.length).toBeGreaterThan(0);

        // Every fill attribute should use the zone's configured color
        for (const match of fillMatches!) {
          const fillValue = match.replace('fill="', "").replace('"', "");
          expect(fillValue).toBe(color);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("SVG output is a valid pattern element structure", () => {
    fc.assert(
      fc.property(zoneIdArb, hexColorArb, (zoneId, color) => {
        const svgOutput = getWaterPatternSvg(zoneId, color);

        // Should contain a <pattern> element
        expect(svgOutput).toContain("<pattern");
        expect(svgOutput).toContain("</pattern>");

        // Should contain circle elements (water particles)
        expect(svgOutput).toContain("<circle");

        // Should use patternUnits="userSpaceOnUse"
        expect(svgOutput).toContain('patternUnits="userSpaceOnUse"');
      }),
      { numRuns: 100 }
    );
  });
});
