/**
 * ScheduleView component.
 *
 * Renders compact schedule badges showing the next scheduled run time
 * for each zone that has a schedule_entity configured.
 *
 * Responsibilities:
 * - Read schedule entities (input_datetime, schedule helper, or sensor with next_run attribute)
 * - Display next run time as a compact pill-shaped badge below each zone control
 * - Show "No schedule" when entity is unavailable or has no upcoming run
 * - Display each zone's schedule independently
 *
 * @module schedule-view
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ZoneConfig, HomeAssistant } from "../models/types";
import { extractNextSchedule } from "../utils/schedule-parser";

/**
 * ScheduleView displays compact schedule badges for each zone
 * that has a schedule_entity configured.
 */
@customElement("schedule-view")
export class ScheduleView extends LitElement {
  /**
   * Array of zone configurations. Only zones with schedule_entity
   * will have a badge rendered.
   */
  @property({ attribute: false })
  zones: ZoneConfig[] = [];

  /**
   * Home Assistant instance for reading entity states.
   */
  @property({ attribute: false })
  hass?: HomeAssistant;

  static styles = css`
    :host {
      display: block;
    }

    .schedule-badges {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .schedule-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 12px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
      line-height: 1.4;
      width: fit-content;
    }

    .schedule-badge__icon {
      display: inline-flex;
      align-items: center;
    }

    .schedule-badge__icon svg {
      width: 12px;
      height: 12px;
      fill: currentColor;
    }

    .schedule-badge--no-schedule {
      opacity: 0.7;
      font-style: italic;
    }
  `;

  render() {
    const scheduledZones = this._getScheduledZones();

    if (scheduledZones.length === 0) {
      return nothing;
    }

    return html`
      <div class="schedule-badges">
        ${scheduledZones.map(({ zone, nextTime }) => this._renderBadge(zone, nextTime))}
      </div>
    `;
  }

  /**
   * Renders a single schedule badge for a zone.
   */
  private _renderBadge(zone: ZoneConfig, nextTime: string | null) {
    if (nextTime) {
      return html`
        <div class="schedule-badge" title="${zone.name}: Next run at ${nextTime}">
          <span class="schedule-badge__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
            </svg>
          </span>
          <span>Next: ${nextTime}</span>
        </div>
      `;
    }

    return html`
      <div class="schedule-badge schedule-badge--no-schedule" title="${zone.name}: No schedule configured">
        <span>No schedule</span>
      </div>
    `;
  }

  /**
   * Computes schedule data for all zones that have a schedule_entity configured.
   * Returns an array of objects with the zone config and its next scheduled time.
   */
  private _getScheduledZones(): Array<{ zone: ZoneConfig; nextTime: string | null }> {
    return this.zones
      .filter((zone) => zone.schedule_entity)
      .map((zone) => {
        const entity = this.hass?.states[zone.schedule_entity!];
        const nextTime = extractNextSchedule(entity);
        return { zone, nextTime };
      });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "schedule-view": ScheduleView;
  }
}
