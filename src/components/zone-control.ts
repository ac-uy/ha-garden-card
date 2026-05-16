/**
 * ZoneControlPanel and ZoneControl components.
 *
 * ZoneControlPanel renders the list/grid of zone controls.
 * ZoneControl renders per-zone controls: name, status indicator,
 * start/stop buttons with proper service call routing.
 *
 * Service call routing:
 * - switch.* entities: switch.turn_on / switch.turn_off
 * - valve.* entities: valve.open / valve.close
 * - input_boolean.* entities: homeassistant.turn_on / homeassistant.turn_off
 *
 * @module zone-control
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ZoneConfig, HomeAssistant } from "../models/types";
import { calculateProgress } from "../utils/progress";
import { formatRemainingTime } from "../utils/time-format";

// =============================================================================
// Service Call Routing
// =============================================================================

/**
 * Determines the correct domain and service for starting a zone entity.
 */
export function getStartService(entityId: string): {
  domain: string;
  service: string;
} {
  const domain = entityId.split(".")[0];
  switch (domain) {
    case "valve":
      return { domain: "valve", service: "open" };
    case "input_boolean":
      return { domain: "homeassistant", service: "turn_on" };
    case "switch":
    default:
      return { domain: "switch", service: "turn_on" };
  }
}

/**
 * Determines the correct domain and service for stopping a zone entity.
 */
export function getStopService(entityId: string): {
  domain: string;
  service: string;
} {
  const domain = entityId.split(".")[0];
  switch (domain) {
    case "valve":
      return { domain: "valve", service: "close" };
    case "input_boolean":
      return { domain: "homeassistant", service: "turn_off" };
    case "switch":
    default:
      return { domain: "switch", service: "turn_off" };
  }
}

// =============================================================================
// ZoneControl Component (per-zone)
// =============================================================================

/**
 * ZoneControl renders controls for a single irrigation zone.
 *
 * Displays zone name, status indicator (colored dot), and start/stop buttons.
 * Handles "unavailable" state with disabled controls and grey overlay.
 * Applies glow effect when zone is active.
 */
@customElement("zone-control")
export class ZoneControl extends LitElement {
  /**
   * Zone configuration object.
   */
  @property({ attribute: false })
  zone!: ZoneConfig;

  /**
   * Home Assistant instance for reading entity states and calling services.
   */
  @property({ attribute: false })
  hass?: HomeAssistant;

  static styles = css`
    :host {
      display: block;
    }

    .zone-control {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      transition: box-shadow 200ms ease, opacity 200ms ease,
        border-color 200ms ease;
      flex-wrap: wrap;
    }

    .zone-control--active {
      border-color: var(--zone-color, var(--primary-color, #03a9f4));
      box-shadow: 0 0 12px var(--zone-color, var(--primary-color, #03a9f4));
    }

    .zone-control--unavailable {
      opacity: 0.5;
    }

    .zone-control--unavailable::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 12px;
      background: rgba(158, 158, 158, 0.15);
      pointer-events: none;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
      transition: background-color 200ms ease, box-shadow 200ms ease;
    }

    .status-indicator--active {
      box-shadow: 0 0 6px currentColor;
    }

    .status-indicator--unavailable {
      background-color: #9e9e9e !important;
    }

    .zone-info {
      flex: 1;
      min-width: 0;
    }

    .zone-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .zone-status-text {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      margin-top: 2px;
    }

    .zone-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .zone-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      padding: 8px 12px;
      border: none;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 200ms ease, transform 100ms ease;
      -webkit-tap-highlight-color: transparent;
    }

    .zone-btn:active {
      transform: scale(0.95);
    }

    .zone-btn:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      transform: none;
    }

    .zone-btn--start {
      background: var(--primary-color, #03a9f4);
      color: #fff;
    }

    .zone-btn--start:hover:not(:disabled) {
      background: var(--primary-color, #0288d1);
      filter: brightness(1.1);
    }

    .zone-btn--stop {
      background: var(--error-color, #f44336);
      color: #fff;
    }

    .zone-btn--stop:hover:not(:disabled) {
      background: var(--error-color, #d32f2f);
      filter: brightness(1.1);
    }

    .progress-section {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .progress-track {
      flex: 1;
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color, #e0e0e0);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 1s linear;
    }

    .remaining-time {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
      white-space: nowrap;
      min-width: 36px;
      text-align: right;
    }
  `;

  /**
   * Gets the entity state for this zone.
   */
  private get _entityState(): string {
    if (!this.hass || !this.zone || !this.zone.entity) return "unavailable";
    const entity = this.hass.states[this.zone.entity];
    return entity?.state ?? "unavailable";
  }

  /**
   * Whether the zone is currently active (on/open).
   */
  private get _isActive(): boolean {
    return this._entityState === "on" || this._entityState === "open";
  }

  /**
   * Whether the zone entity is unavailable.
   */
  private get _isUnavailable(): boolean {
    const state = this._entityState;
    return state === "unavailable" || state === "unknown";
  }

  /**
   * Returns a human-readable status text.
   */
  private get _statusText(): string {
    if (this._isUnavailable) return "Unavailable";
    if (this._isActive) return "Active";
    return "Idle";
  }

  protected render() {
    if (!this.zone) return nothing;

    const isActive = this._isActive;
    const isUnavailable = this._isUnavailable;
    const zoneColor = this.zone.color || "#4CAF50";

    return html`
      <div
        class="zone-control ${isActive ? "zone-control--active" : ""} ${isUnavailable ? "zone-control--unavailable" : ""}"
        style="--zone-color: ${zoneColor}"
      >
        <span
          class="status-indicator ${isActive ? "status-indicator--active" : ""} ${isUnavailable ? "status-indicator--unavailable" : ""}"
          style="background-color: ${isUnavailable ? "#9e9e9e" : isActive ? zoneColor : "#bdbdbd"}; color: ${zoneColor}"
        ></span>

        <div class="zone-info">
          <div class="zone-name">${this.zone.name}</div>
          <div class="zone-status-text">${this._statusText}</div>
        </div>

        <div class="zone-actions">
          ${isActive
            ? html`
                <button
                  class="zone-btn zone-btn--stop"
                  ?disabled=${isUnavailable}
                  @click=${this._handleStop}
                  aria-label="Stop ${this.zone.name}"
                >
                  Stop
                </button>
              `
            : html`
                <button
                  class="zone-btn zone-btn--start"
                  ?disabled=${isUnavailable}
                  @click=${this._handleStart}
                  aria-label="Start ${this.zone.name}"
                >
                  Start
                </button>
              `}
        </div>

        ${isActive && this.zone.countdown_entity ? this._renderProgressBar() : nothing}
      </div>
    `;
  }

  /**
   * Renders the progress bar with remaining time for active zones.
   */
  private _renderProgressBar() {
    if (!this.hass || !this.zone || !this.zone.countdown_entity) return nothing;

    const countdownEntity = this.hass.states[this.zone.countdown_entity];
    if (!countdownEntity || countdownEntity.state === "unavailable") return nothing;

    const remaining = parseFloat(countdownEntity.state);
    if (isNaN(remaining)) return nothing;

    // Get total duration from the duration entity or use remaining as fallback
    let total = remaining;
    if (this.zone.duration_entity) {
      const durationEntity = this.hass.states[this.zone.duration_entity];
      if (durationEntity) {
        const durationValue = parseFloat(durationEntity.state);
        if (!isNaN(durationValue) && durationValue > 0) {
          // Duration entity is in minutes, countdown is in seconds
          total = durationValue * 60;
        }
      }
    }

    if (total <= 0) return nothing;

    const progress = calculateProgress(remaining, total);
    const timeText = formatRemainingTime(remaining);
    const zoneColor = this.zone.color || "#4CAF50";

    return html`
      <div class="progress-section">
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progress}%; background-color: ${zoneColor}"></div>
        </div>
        <span class="remaining-time">${timeText}</span>
      </div>
    `;
  }

  /**
   * Handles the start button click.
   * Routes to the correct service based on entity domain.
   */
  private async _handleStart(): Promise<void> {
    if (!this.hass || !this.zone || !this.zone.entity || this._isUnavailable) return;

    const { domain, service } = getStartService(this.zone.entity);
    await this.hass.callService(domain, service, {
      entity_id: this.zone.entity,
    });
  }

  /**
   * Handles the stop button click.
   * Routes to the correct service based on entity domain.
   */
  private async _handleStop(): Promise<void> {
    if (!this.hass || !this.zone || !this.zone.entity || this._isUnavailable) return;

    const { domain, service } = getStopService(this.zone.entity);
    await this.hass.callService(domain, service, {
      entity_id: this.zone.entity,
    });
  }
}

// =============================================================================
// ZoneControlPanel Component
// =============================================================================

/**
 * ZoneControlPanel renders the list/grid of zone controls.
 * Manages the collection of ZoneControl components.
 */
@customElement("zone-control-panel")
export class ZoneControlPanel extends LitElement {
  /**
   * Array of zone configurations to render controls for.
   */
  @property({ attribute: false })
  zones: ZoneConfig[] = [];

  /**
   * Home Assistant instance passed down to each ZoneControl.
   */
  @property({ attribute: false })
  hass?: HomeAssistant;

  /**
   * Number of columns for zone controls grid.
   */
  @property({ type: Number })
  columns: number = 1;

  static styles = css`
    :host {
      display: block;
    }

    .zone-panel {
      display: grid;
      gap: 8px;
    }
  `;

  protected render() {
    if (!this.zones || this.zones.length === 0) return nothing;

    const gridStyle = `grid-template-columns: repeat(${this.columns}, 1fr)`;

    return html`
      <div class="zone-panel" style="${gridStyle}">
        ${this.zones.map(
          (zone) => html`
            <zone-control .zone=${zone} .hass=${this.hass}></zone-control>
          `
        )}
      </div>
    `;
  }
}

// =============================================================================
// Type Declarations
// =============================================================================

declare global {
  interface HTMLElementTagNameMap {
    "zone-control": ZoneControl;
    "zone-control-panel": ZoneControlPanel;
  }
}
