/**
 * MowerPanel component.
 *
 * Displays robot mower status including activity state, battery level,
 * and control buttons (start, dock, pause).
 *
 * Activity states are mapped to icons/animations:
 * - mowing: animated mower icon (spinning indicator)
 * - docked: home/dock icon
 * - paused: pause icon
 * - returning: return/arrow icon
 * - error: warning icon with error description
 *
 * Service calls:
 * - Start: lawn_mower.start_mowing
 * - Dock: lawn_mower.dock
 * - Pause: lawn_mower.pause
 *
 * @module mower-panel
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { MowerConfig, HomeAssistant, MowerActivity } from "../models/types";

// =============================================================================
// Activity State Helpers
// =============================================================================

/**
 * Maps a lawn_mower entity state string to a MowerActivity type.
 */
export function getMowerActivity(state: string): MowerActivity {
  switch (state) {
    case "mowing":
      return "mowing";
    case "docked":
      return "docked";
    case "paused":
      return "paused";
    case "returning":
      return "returning";
    case "error":
      return "error";
    default:
      return "unknown";
  }
}

/**
 * Returns an SVG icon path for the given mower activity state.
 */
export function getActivityIcon(activity: MowerActivity): string {
  // Simple lawn mower icon
  const mowerPath = "M2,10V14H4.26L6,18H18L19.74,14H22V10H19.74L18,6H6L4.26,10H2M6.5,12A1.5,1.5 0 0,1 8,13.5A1.5,1.5 0 0,1 6.5,15A1.5,1.5 0 0,1 5,13.5A1.5,1.5 0 0,1 6.5,12M17.5,12A1.5,1.5 0 0,1 19,13.5A1.5,1.5 0 0,1 17.5,15A1.5,1.5 0 0,1 16,13.5A1.5,1.5 0 0,1 17.5,12Z";
  
  switch (activity) {
    case "error":
      return "M1,21 L12,2 L23,21 Z M12,14 L12,10 M12,18 L12,16";
    default:
      return mowerPath;
  }
}

/**
 * Returns a human-readable label for the given mower activity state.
 */
export function getActivityLabel(activity: MowerActivity): string {
  switch (activity) {
    case "mowing":
      return "Mowing";
    case "docked":
      return "Docked";
    case "paused":
      return "Paused";
    case "returning":
      return "Returning";
    case "error":
      return "Error";
    default:
      return "Unknown";
  }
}

/**
 * Returns the appropriate battery icon path based on battery level.
 * - Full (>75%): full battery
 * - Medium (25-75%): half battery
 * - Low (<25%): low battery
 */
export function getBatteryIcon(level: number | null): string {
  if (level === null) {
    // Unknown battery
    return "M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M12,11 L12,14 M12,17 L12,17.5";
  }
  if (level > 75) {
    // Full battery
    return "M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,7 L15,7 L15,20 L9,20 Z";
  }
  if (level >= 25) {
    // Medium battery
    return "M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,13 L15,13 L15,20 L9,20 Z";
  }
  // Low battery
  return "M15.67,4 L14,4 L14,2 L10,2 L10,4 L8.33,4 A1.33,1.33 0 0,0 7,5.33 L7,20.67 A1.33,1.33 0 0,0 8.33,22 L15.67,22 A1.33,1.33 0 0,0 17,20.67 L17,5.33 A1.33,1.33 0 0,0 15.67,4 M9,17 L15,17 L15,20 L9,20 Z";
}

/**
 * Returns a CSS class suffix for battery level styling.
 */
export function getBatteryLevelClass(level: number | null): string {
  if (level === null) return "unknown";
  if (level > 75) return "full";
  if (level >= 25) return "medium";
  return "low";
}

// =============================================================================
// MowerPanel Component
// =============================================================================

/**
 * MowerPanel displays robot mower status and controls.
 *
 * Shows:
 * - Activity state with icon (animated when mowing)
 * - Battery level with icon
 * - Start, Dock, Pause control buttons
 * - Error state with warning icon and description
 */
@customElement("mower-panel")
export class MowerPanel extends LitElement {
  /**
   * Mower configuration with entity IDs.
   */
  @property({ attribute: false })
  config!: MowerConfig;

  /**
   * Home Assistant instance for reading entity states and calling services.
   */
  @property({ attribute: false })
  hass?: HomeAssistant;

  static styles = css`
    :host {
      display: block;
    }

    .mower-panel {
      padding: 16px;
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      transition: opacity 200ms ease;
    }

    .mower-panel--unavailable {
      opacity: 0.5;
    }

    .mower-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .mower-icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color, #4CAF50);
      flex-shrink: 0;
    }

    .mower-icon-container--error {
      background: var(--error-color, #f44336);
    }

    .mower-icon-container--mowing {
      animation: mower-pulse 1.5s ease-in-out infinite;
    }

    @keyframes mower-pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 var(--primary-color, rgba(76, 175, 80, 0.4));
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 12px 4px var(--primary-color, rgba(76, 175, 80, 0.2));
      }
    }

    .mower-icon {
      --mdc-icon-size: 24px;
      color: #fff;
    }

    .mower-icon--mowing {
      animation: mower-spin 2s linear infinite;
    }

    @keyframes mower-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .mower-info {
      flex: 1;
      min-width: 0;
    }

    .mower-activity {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }

    .mower-battery {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      margin-top: 2px;
    }

    .battery-icon {
      width: 16px;
      height: 16px;
    }

    .battery-icon--full {
      fill: var(--success-color, #4CAF50);
    }

    .battery-icon--medium {
      fill: var(--warning-color, #FF9800);
    }

    .battery-icon--low {
      fill: var(--error-color, #f44336);
    }

    .battery-icon--unknown {
      fill: var(--secondary-text-color, #727272);
    }

    .mower-error {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      margin-bottom: 12px;
      border-radius: 8px;
      background: rgba(244, 67, 54, 0.1);
      border: 1px solid var(--error-color, #f44336);
    }

    .error-icon {
      width: 20px;
      height: 20px;
      fill: var(--error-color, #f44336);
      flex-shrink: 0;
    }

    .error-text {
      font-size: 12px;
      color: var(--error-color, #f44336);
      font-weight: 500;
    }

    .mower-controls {
      display: flex;
      gap: 8px;
    }

    .mower-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 44px;
      min-height: 44px;
      padding: 10px 12px;
      border: none;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 200ms ease, transform 100ms ease;
      -webkit-tap-highlight-color: transparent;
    }

    .mower-btn:active {
      transform: scale(0.95);
    }

    .mower-btn:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      transform: none;
    }

    .mower-btn--start {
      background: var(--primary-color, #4CAF50);
      color: #fff;
    }

    .mower-btn--start:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    .mower-btn--dock {
      background: var(--secondary-text-color, #727272);
      color: #fff;
    }

    .mower-btn--dock:hover:not(:disabled) {
      filter: brightness(1.2);
    }

    .mower-btn--pause {
      background: var(--warning-color, #FF9800);
      color: #fff;
    }

    .mower-btn--pause:hover:not(:disabled) {
      filter: brightness(1.1);
    }
  `;

  /**
   * Gets the mower entity state string.
   */
  private get _entityState(): string {
    if (!this.hass || !this.config) return "unavailable";
    const entity = this.hass.states[this.config.entity];
    return entity?.state ?? "unavailable";
  }

  /**
   * Gets the computed mower activity.
   */
  private get _activity(): MowerActivity {
    return getMowerActivity(this._entityState);
  }

  /**
   * Gets the battery level from the battery sensor entity.
   * Returns null if no battery entity is configured or unavailable.
   */
  private get _batteryLevel(): number | null {
    if (!this.hass || !this.config?.battery_entity) return null;
    const entity = this.hass.states[this.config.battery_entity];
    if (!entity || entity.state === "unavailable" || entity.state === "unknown") {
      return null;
    }
    const level = parseFloat(entity.state);
    if (isNaN(level)) return null;
    return Math.max(0, Math.min(100, level));
  }

  /**
   * Gets the error description from the mower entity attributes.
   */
  private get _errorDescription(): string | null {
    if (this._activity !== "error") return null;
    if (!this.hass || !this.config) return null;
    const entity = this.hass.states[this.config.entity];
    if (!entity) return null;
    const error = entity.attributes.error;
    return typeof error === "string" ? error : null;
  }

  /**
   * Whether the mower entity is unavailable.
   */
  private get _isUnavailable(): boolean {
    const state = this._entityState;
    return state === "unavailable" || state === "unknown";
  }

  protected render() {
    if (!this.config) return nothing;

    const activity = this._activity;
    const batteryLevel = this._batteryLevel;
    const errorDescription = this._errorDescription;
    const isUnavailable = this._isUnavailable;
    const activityIcon = getActivityIcon(activity);
    const activityLabel = getActivityLabel(activity);
    const batteryIcon = getBatteryIcon(batteryLevel);
    const batteryClass = getBatteryLevelClass(batteryLevel);

    return html`
      <div class="mower-panel ${isUnavailable ? "mower-panel--unavailable" : ""}">
        <div class="mower-header">
          <div class="mower-icon-container ${activity === "error" ? "mower-icon-container--error" : ""} ${activity === "mowing" ? "mower-icon-container--mowing" : ""}">
            <ha-icon icon="${activity === "error" ? "mdi:alert" : "mdi:robot-mower"}" class="mower-icon"></ha-icon>
          </div>

          <div class="mower-info">
            <div class="mower-activity">${activityLabel}</div>
            ${batteryLevel !== null
              ? html`
                  <div class="mower-battery">
                    <svg class="battery-icon battery-icon--${batteryClass}" viewBox="0 0 24 24">
                      <path d="${batteryIcon}" />
                    </svg>
                    <span>${batteryLevel}%</span>
                  </div>
                `
              : nothing}
          </div>
        </div>

        ${activity === "error" && errorDescription
          ? html`
              <div class="mower-error">
                <svg class="error-icon" viewBox="0 0 24 24">
                  <path d="M1,21 L12,2 L23,21 Z M13,18 L11,18 L11,16 L13,16 Z M13,14 L11,14 L11,10 L13,10 Z" />
                </svg>
                <span class="error-text">${errorDescription}</span>
              </div>
            `
          : nothing}

        <div class="mower-controls">
          <button
            class="mower-btn mower-btn--start"
            ?disabled=${isUnavailable}
            @click=${this._handleStart}
            aria-label="Start mowing"
          >
            Start
          </button>
          <button
            class="mower-btn mower-btn--pause"
            ?disabled=${isUnavailable}
            @click=${this._handlePause}
            aria-label="Pause mower"
          >
            Pause
          </button>
          <button
            class="mower-btn mower-btn--dock"
            ?disabled=${isUnavailable}
            @click=${this._handleDock}
            aria-label="Dock mower"
          >
            Dock
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Handles the start button click.
   * Calls lawn_mower.start_mowing service.
   */
  private async _handleStart(): Promise<void> {
    if (!this.hass || !this.config || this._isUnavailable) return;
    await this.hass.callService("lawn_mower", "start_mowing", {
      entity_id: this.config.entity,
    });
  }

  /**
   * Handles the pause button click.
   * Calls lawn_mower.pause service.
   */
  private async _handlePause(): Promise<void> {
    if (!this.hass || !this.config || this._isUnavailable) return;
    await this.hass.callService("lawn_mower", "pause", {
      entity_id: this.config.entity,
    });
  }

  /**
   * Handles the dock button click.
   * Calls lawn_mower.dock service.
   */
  private async _handleDock(): Promise<void> {
    if (!this.hass || !this.config || this._isUnavailable) return;
    await this.hass.callService("lawn_mower", "dock", {
      entity_id: this.config.entity,
    });
  }
}

// =============================================================================
// Type Declarations
// =============================================================================

declare global {
  interface HTMLElementTagNameMap {
    "mower-panel": MowerPanel;
  }
}
