/**
 * DurationControl component.
 *
 * Renders a slider (range input) for setting irrigation duration on a
 * number entity. Reads min, max, step, and unit_of_measurement from the
 * entity's attributes and calls `number.set_value` when the user changes
 * the slider value.
 *
 * Responsibilities:
 * - Display a range slider with min/max/step from entity attributes
 * - Show the current value with unit of measurement
 * - Call `number.set_value` service on change
 * - Disable when entity is unavailable
 * - Default to min=0, max=60, step=1 if attributes are missing
 * - Ensure 44px minimum touch target height
 *
 * @module duration-control
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant } from "../models/types";

/**
 * Default attribute values when entity attributes are missing.
 */
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 60;
const DEFAULT_STEP = 1;

/**
 * DurationControl renders a slider for setting irrigation zone duration.
 *
 * It reads the number entity's min, max, step, and unit_of_measurement
 * attributes to configure the slider range. When the user adjusts the
 * slider, it calls `number.set_value` on the configured entity.
 */
@customElement("duration-control")
export class DurationControl extends LitElement {
  /**
   * The entity_id of the number entity controlling duration.
   */
  @property({ type: String })
  entity_id = "";

  /**
   * Home Assistant instance for reading entity state and calling services.
   */
  @property({ attribute: false })
  hass?: HomeAssistant;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .duration-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }

    .duration-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
    }

    .duration-label {
      font-weight: 500;
    }

    .duration-value {
      font-weight: 600;
      color: var(--primary-text-color, #212121);
    }

    .slider-wrapper {
      position: relative;
      width: 100%;
      min-height: 44px;
      display: flex;
      align-items: center;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color, #e0e0e0);
      outline: none;
      transition: background 200ms ease;
      cursor: pointer;
      margin: 0;
      padding: 0;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      cursor: pointer;
      border: 2px solid var(--card-background-color, #fff);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 200ms ease;
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }

    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      cursor: pointer;
      border: 2px solid var(--card-background-color, #fff);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 200ms ease;
    }

    input[type="range"]::-moz-range-track {
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color, #e0e0e0);
    }

    input[type="range"]:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    input[type="range"]:disabled::-webkit-slider-thumb {
      background: var(--disabled-text-color, #bdbdbd);
      cursor: not-allowed;
    }

    input[type="range"]:disabled::-moz-range-thumb {
      background: var(--disabled-text-color, #bdbdbd);
      cursor: not-allowed;
    }

    .unavailable-text {
      font-size: 12px;
      color: var(--error-color, #db4437);
      font-style: italic;
    }
  `;

  render() {
    if (!this.entity_id || !this.hass) {
      return nothing;
    }

    const entity = this.hass.states[this.entity_id];
    const isUnavailable =
      !entity ||
      entity.state === "unavailable" ||
      entity.state === "unknown";

    const min = entity?.attributes.min ?? DEFAULT_MIN;
    const max = entity?.attributes.max ?? DEFAULT_MAX;
    const step = entity?.attributes.step ?? DEFAULT_STEP;
    const unit = entity?.attributes.unit_of_measurement ?? "";
    const currentValue = isUnavailable
      ? min
      : parseFloat(entity.state) || min;

    return html`
      <div class="duration-container">
        <div class="duration-header">
          <span class="duration-label">Duration</span>
          ${isUnavailable
            ? html`<span class="unavailable-text">Unavailable</span>`
            : html`<span class="duration-value"
                >${currentValue}${unit ? ` ${unit}` : ""}</span
              >`}
        </div>
        <div class="slider-wrapper">
          <input
            type="range"
            .min="${String(min)}"
            .max="${String(max)}"
            .step="${String(step)}"
            .value="${String(currentValue)}"
            ?disabled="${isUnavailable}"
            @change="${this._handleChange}"
          />
        </div>
      </div>
    `;
  }

  /**
   * Handles slider change events by calling the number.set_value service.
   */
  private _handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);

    if (!this.hass || !this.entity_id || isNaN(value)) {
      return;
    }

    this.hass.callService("number", "set_value", {
      entity_id: this.entity_id,
      value,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "duration-control": DurationControl;
  }
}
