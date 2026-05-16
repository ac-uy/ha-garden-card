/**
 * TypeScript interfaces and data models for the HA Garden Card.
 *
 * These types define the card configuration schema, internal state models,
 * and the subset of Home Assistant types consumed by the card.
 */

// =============================================================================
// Card Configuration Types
// =============================================================================

/**
 * Top-level configuration for the HA Garden Card.
 * Stored in the Lovelace dashboard YAML/JSON.
 */
export interface GardenCardConfig {
  type: "custom:ha-garden-card";
  title?: string;
  image?: string; // URL to garden/backyard image
  zones?: ZoneConfig[];
  mower?: MowerConfig;
}

/**
 * Configuration for a single irrigation zone.
 * Each zone maps to a polygon overlay on the garden image
 * and is bound to a switch or valve entity.
 */
export interface ZoneConfig {
  id: string; // unique zone identifier (uuid)
  name: string; // display name
  entity?: string; // switch.* or valve.* entity_id (optional during setup)
  color: string; // hex color for overlay (#RRGGBB)
  polygon?: [number, number][]; // array of [x%, y%] coordinates (0-100)
  duration_entity?: string; // number.* entity for duration setting
  countdown_entity?: string; // sensor.* entity for remaining time
  schedule_entity?: string; // input_datetime / schedule / sensor entity
}

/**
 * Configuration for the robot mower integration.
 */
export interface MowerConfig {
  entity: string; // lawn_mower.* entity_id
  battery_entity?: string; // sensor.* entity for battery level
}

// =============================================================================
// Internal State Types
// =============================================================================

/**
 * Computed state for a single zone, derived from HA entity states.
 */
export interface ZoneState {
  isActive: boolean;
  isUnavailable: boolean;
  remainingSeconds: number | null;
  totalDurationSeconds: number | null;
  nextSchedule: string | null; // ISO datetime or display string
}

/**
 * Computed state for the robot mower, derived from HA entity states.
 */
export interface MowerState {
  activity: MowerActivity;
  batteryLevel: number | null; // 0-100
  errorDescription: string | null;
}

/**
 * Possible mower activity states.
 */
export type MowerActivity =
  | "mowing"
  | "docked"
  | "paused"
  | "returning"
  | "error"
  | "unknown";

/**
 * Responsive layout mode determined by card container width.
 * - compact: < 400px (single column, stacked)
 * - medium: 400-800px (two-column grid)
 * - wide: > 800px (side-by-side image + controls)
 */
export type LayoutMode = "compact" | "medium" | "wide";

// =============================================================================
// Home Assistant Types (subset consumed by this card)
// =============================================================================

/**
 * Minimal locale interface for HA's locale object.
 */
export interface HassLocale {
  language: string;
  number_format?: string;
  time_format?: string;
}

/**
 * Subset of the Home Assistant frontend `HomeAssistant` object
 * relevant to this card's functionality.
 */
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ): Promise<void>;
  themes: { darkMode: boolean };
  locale: HassLocale;
}

/**
 * Subset of the Home Assistant `HassEntity` interface
 * with the attributes this card reads.
 */
export interface HassEntity {
  state: string;
  attributes: {
    friendly_name?: string;
    min?: number;
    max?: number;
    step?: number;
    unit_of_measurement?: string;
    next_run?: string;
    [key: string]: unknown;
  };
  last_changed: string;
}
