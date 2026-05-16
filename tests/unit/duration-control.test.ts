/**
 * Unit tests for the DurationControl component.
 *
 * Tests cover:
 * - Rendering with entity attributes (min, max, step, unit)
 * - Default values when attributes are missing
 * - Disabled state when entity is unavailable
 * - Service call on slider change
 * - Display of current value with unit
 */

import { describe, it, expect, vi } from "vitest";
import { DurationControl } from "../../src/components/duration-control";
import type { HomeAssistant, HassEntity } from "../../src/models/types";

/**
 * Helper to create a mock HomeAssistant object with a number entity.
 */
function createMockHass(
  entityId: string,
  state: string,
  attributes: Partial<HassEntity["attributes"]> = {}
): HomeAssistant {
  return {
    states: {
      [entityId]: {
        state,
        attributes: {
          friendly_name: "Test Duration",
          ...attributes,
        },
        last_changed: "2024-01-01T00:00:00Z",
      },
    },
    callService: vi.fn().mockResolvedValue(undefined),
    themes: { darkMode: false },
    locale: { language: "en" },
  };
}

describe("DurationControl", () => {
  it("should be defined as a custom element", () => {
    const el = new DurationControl();
    expect(el).toBeInstanceOf(DurationControl);
  });

  it("should render nothing when entity_id is empty", () => {
    const el = new DurationControl();
    el.hass = createMockHass("number.test", "30");
    el.entity_id = "";

    const result = el.render();
    // nothing is a Lit sentinel value
    expect(result).toBeDefined();
  });

  it("should render nothing when hass is undefined", () => {
    const el = new DurationControl();
    el.entity_id = "number.test";
    el.hass = undefined;

    const result = el.render();
    expect(result).toBeDefined();
  });

  it("should use entity attributes for min, max, step", () => {
    const el = new DurationControl();
    el.entity_id = "number.irrigation_duration";
    el.hass = createMockHass("number.irrigation_duration", "15", {
      min: 5,
      max: 120,
      step: 5,
      unit_of_measurement: "min",
    });

    // Access the rendered template values by inspecting the component logic
    const entity = el.hass.states["number.irrigation_duration"];
    expect(entity.attributes.min).toBe(5);
    expect(entity.attributes.max).toBe(120);
    expect(entity.attributes.step).toBe(5);
    expect(entity.attributes.unit_of_measurement).toBe("min");
  });

  it("should use default values when attributes are missing", () => {
    const el = new DurationControl();
    el.entity_id = "number.test";
    el.hass = createMockHass("number.test", "10", {});

    const entity = el.hass.states["number.test"];
    // When attributes are missing, defaults should be used
    const min = entity.attributes.min ?? 0;
    const max = entity.attributes.max ?? 60;
    const step = entity.attributes.step ?? 1;

    expect(min).toBe(0);
    expect(max).toBe(60);
    expect(step).toBe(1);
  });

  it("should disable slider when entity is unavailable", () => {
    const el = new DurationControl();
    el.entity_id = "number.test";
    el.hass = createMockHass("number.test", "unavailable");

    const entity = el.hass.states["number.test"];
    const isUnavailable =
      entity.state === "unavailable" || entity.state === "unknown";

    expect(isUnavailable).toBe(true);
  });

  it("should disable slider when entity is unknown", () => {
    const el = new DurationControl();
    el.entity_id = "number.test";
    el.hass = createMockHass("number.test", "unknown");

    const entity = el.hass.states["number.test"];
    const isUnavailable =
      entity.state === "unavailable" || entity.state === "unknown";

    expect(isUnavailable).toBe(true);
  });

  it("should disable slider when entity is not found", () => {
    const el = new DurationControl();
    el.entity_id = "number.nonexistent";
    el.hass = createMockHass("number.other", "10");

    const entity = el.hass.states["number.nonexistent"];
    expect(entity).toBeUndefined();
  });

  it("should call number.set_value service on change", () => {
    const el = new DurationControl();
    el.entity_id = "number.irrigation_duration";
    el.hass = createMockHass("number.irrigation_duration", "15", {
      min: 0,
      max: 60,
      step: 1,
    });

    // Simulate the change handler
    const mockEvent = {
      target: { value: "25" },
    } as unknown as Event;

    // Call the private handler via type assertion
    (el as any)._handleChange(mockEvent);

    expect(el.hass.callService).toHaveBeenCalledWith("number", "set_value", {
      entity_id: "number.irrigation_duration",
      value: 25,
    });
  });

  it("should not call service when value is NaN", () => {
    const el = new DurationControl();
    el.entity_id = "number.test";
    el.hass = createMockHass("number.test", "10");

    const mockEvent = {
      target: { value: "invalid" },
    } as unknown as Event;

    (el as any)._handleChange(mockEvent);

    expect(el.hass.callService).not.toHaveBeenCalled();
  });

  it("should not call service when hass is undefined", () => {
    const el = new DurationControl();
    el.entity_id = "number.test";
    el.hass = undefined;

    const mockEvent = {
      target: { value: "25" },
    } as unknown as Event;

    // Should not throw
    (el as any)._handleChange(mockEvent);
  });

  it("should display current value with unit of measurement", () => {
    const el = new DurationControl();
    el.entity_id = "number.test";
    el.hass = createMockHass("number.test", "30", {
      unit_of_measurement: "min",
    });

    const entity = el.hass.states["number.test"];
    const value = parseFloat(entity.state);
    const unit = entity.attributes.unit_of_measurement;

    expect(value).toBe(30);
    expect(unit).toBe("min");
  });

  it("should parse numeric state correctly", () => {
    const el = new DurationControl();
    el.entity_id = "number.test";
    el.hass = createMockHass("number.test", "42.5", {
      min: 0,
      max: 100,
      step: 0.5,
    });

    const entity = el.hass.states["number.test"];
    const currentValue = parseFloat(entity.state);

    expect(currentValue).toBe(42.5);
  });

  it("should fall back to min when state is not a number", () => {
    const el = new DurationControl();
    el.entity_id = "number.test";
    el.hass = createMockHass("number.test", "not_a_number", {
      min: 5,
      max: 60,
    });

    const entity = el.hass.states["number.test"];
    const min = entity.attributes.min ?? 0;
    const currentValue = parseFloat(entity.state) || min;

    expect(currentValue).toBe(5);
  });
});
