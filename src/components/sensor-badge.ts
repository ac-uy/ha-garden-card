/**
 * SensorBadge component.
 *
 * Renders a floating chip overlay positioned on the garden image
 * using percentage-based coordinates (same system as polygon zones).
 * Shows icon + state value + unit, colored by configurable thresholds.
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { SensorConfig, HomeAssistant } from "../models/types";

const DEFAULT_THRESHOLDS = { low: 20, high: 40 };

function getBadgeColor(
  value: number,
  thresholds: { low: number; high: number }
): string {
  if (value > thresholds.high) return "#4CAF50"; // green
  if (value >= thresholds.low) return "#FFC107"; // yellow
  return "#F44336"; // red
}

@customElement("sensor-badge")
export class SensorBadge extends LitElement {
  @property({ attribute: false }) sensor!: SensorConfig;
  @property({ attribute: false }) hass?: HomeAssistant;

  static styles = css`
    :host {
      display: block;
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px 3px 5px;
      background: rgba(0, 0, 0, 0.62);
      border-radius: 999px;
      border: 1.5px solid;
      white-space: nowrap;
      backdrop-filter: blur(4px);
    }

    ha-icon {
      --mdc-icon-size: 14px;
      flex-shrink: 0;
    }

    .value {
      font-size: 12px;
      font-weight: 600;
      color: #fff;
      line-height: 1;
    }
  `;

  render() {
    if (!this.sensor || !this.hass) return nothing;

    const entity = this.hass.states[this.sensor.entity];
    const stateVal = entity?.state ?? "?";
    const unit = entity?.attributes?.unit_of_measurement ?? "";
    const [x, y] = this.sensor.position;

    const numericVal = parseFloat(stateVal);
    const thresholds = this.sensor.thresholds ?? DEFAULT_THRESHOLDS;
    const color = !isNaN(numericVal)
      ? getBadgeColor(numericVal, thresholds)
      : "#9e9e9e";

    this.style.left = `${x}%`;
    this.style.top = `${y}%`;

    return html`
      <div class="badge" style="border-color: ${color}; color: ${color};">
        ${this.sensor.icon
          ? html`<ha-icon icon="${this.sensor.icon}" style="color: ${color};"></ha-icon>`
          : nothing}
        <span class="value">${stateVal}${unit}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sensor-badge": SensorBadge;
  }
}
