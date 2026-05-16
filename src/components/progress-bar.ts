/**
 * ProgressBar component.
 *
 * Displays a horizontal progress bar showing elapsed irrigation time
 * and the remaining time in M:SS format. Uses the zone's configured
 * color for the bar fill with a smooth CSS transition on width changes.
 *
 * @module progress-bar
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant } from "../models/types";
import { calculateProgress } from "../utils/progress";
import { formatRemainingTime } from "../utils/time-format";

/**
 * ProgressBar renders a horizontal progress bar with remaining time text.
 *
 * It reads the countdown entity's state (remaining seconds) and computes
 * the elapsed percentage using the progress utility. The remaining time
 * is formatted using the time-format utility.
 */
@customElement("garden-progress-bar")
export class ProgressBar extends LitElement {
  /**
   * Home Assistant instance for reading entity states.
   */
  @property({ attribute: false })
  hass?: HomeAssistant;

  /**
   * Entity ID of the countdown sensor (state = remaining seconds).
   */
  @property({ type: String, attribute: "countdown-entity" })
  countdownEntity?: string;

  /**
   * Total duration in seconds for the irrigation cycle.
   */
  @property({ type: Number, attribute: "total-duration" })
  totalDuration: number = 0;

  /**
   * Zone color used for the progress bar fill (hex format).
   */
  @property({ type: String })
  color: string = "#4CAF50";

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .progress-container {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }

    .progress-track {
      flex: 1;
      height: 8px;
      border-radius: 4px;
      background: var(--divider-color, #e0e0e0);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 200ms ease-in-out;
      min-width: 0;
    }

    .remaining-time {
      font-size: 12px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      white-space: nowrap;
      min-width: 36px;
      text-align: right;
    }

    .unavailable-text {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      font-style: italic;
    }
  `;

  render() {
    // No countdown entity configured — render nothing
    if (!this.countdownEntity) {
      return nothing;
    }

    // Entity not available in hass
    if (!this.hass) {
      return nothing;
    }

    const entity = this.hass.states[this.countdownEntity];

    // Entity not found or unavailable
    if (!entity || entity.state === "unavailable" || entity.state === "unknown") {
      return html`<span class="unavailable-text">Unavailable</span>`;
    }

    // Zero total duration — can't compute progress
    if (this.totalDuration <= 0) {
      return nothing;
    }

    const remaining = parseFloat(entity.state);

    // If state is not a valid number, show nothing
    if (isNaN(remaining)) {
      return nothing;
    }

    const progress = calculateProgress(remaining, this.totalDuration);
    const timeText = formatRemainingTime(remaining);

    return html`
      <div class="progress-container">
        <div class="progress-track">
          <div
            class="progress-fill"
            style="width: ${progress}%; background-color: ${this.color}"
          ></div>
        </div>
        <span class="remaining-time">${timeText}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "garden-progress-bar": ProgressBar;
  }
}
