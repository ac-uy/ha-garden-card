/**
 * GardenImageLayer component.
 *
 * Renders the garden image as background with an SVG overlay containing
 * zone polygons. Each polygon uses percentage-based coordinates (0-100)
 * mapped via SVG viewBox="0 0 100 100".
 *
 * Responsibilities:
 * - Render garden image at full width with preserved aspect ratio
 * - Render SVG viewport overlaid on the image (same dimensions)
 * - Draw zone polygons with configurable fill color and state-based opacity
 * - Handle tap events on polygons to dispatch zone-tap events
 * - Fall back to list layout when no image URL is configured
 *
 * @module garden-image-layer
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ZoneConfig, HomeAssistant } from "../models/types";

/**
 * Computed zone rendering data combining config with entity state.
 */
interface ZoneRenderData {
  id: string;
  name: string;
  color: string;
  points: string;
  opacity: number;
  isActive: boolean;
  isUnavailable: boolean;
}

/**
 * GardenImageLayer renders the garden image with SVG polygon overlays.
 *
 * The SVG uses viewBox="0 0 100 100" with preserveAspectRatio="none"
 * so that polygon coordinates stored as percentages (0-100) map directly
 * to SVG units, regardless of the actual image display size.
 */
@customElement("garden-image-layer")
export class GardenImageLayer extends LitElement {
  /**
   * Array of zone configurations to render as polygon overlays.
   */
  @property({ attribute: false })
  zones: ZoneConfig[] = [];

  /**
   * Home Assistant instance for reading entity states.
   */
  @property({ attribute: false })
  hass?: HomeAssistant;

  /**
   * URL of the garden/backyard image to display as background.
   */
  @property({ type: String })
  image?: string;

  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
    }

    .image-container {
      position: relative;
      width: 100%;
      line-height: 0;
    }

    .image-container img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: var(--ha-card-border-radius, 12px);
      object-fit: cover;
    }

    .image-container svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--ha-card-border-radius, 12px);
    }

    .zone-polygon {
      cursor: pointer;
      transition: opacity 200ms ease-in-out;
    }

    .zone-polygon:hover {
      opacity: 0.6 !important;
    }

    .zone-polygon--active {
      animation: pulse-opacity 2s ease-in-out infinite;
    }

    .zone-polygon--unavailable {
      cursor: not-allowed;
    }

    @keyframes pulse-opacity {
      0%,
      100% {
        opacity: 0.5;
      }
      50% {
        opacity: 0.7;
      }
    }

    /* List layout fallback when no image is configured */
    .zone-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
    }

    .zone-list-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      transition: background 200ms ease;
      min-height: 44px;
      min-width: 44px;
    }

    .zone-list-item:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }

    .zone-list-item--active {
      border-color: var(--primary-color, #03a9f4);
      box-shadow: 0 0 8px var(--primary-color, #03a9f4);
    }

    .zone-list-item--unavailable {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .zone-color-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .zone-name {
      font-size: 14px;
      color: var(--primary-text-color, #212121);
    }

    .zone-status {
      margin-left: auto;
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
    }
  `;

  render() {
    if (this.image) {
      return this._renderImageWithOverlay();
    }
    return this._renderListLayout();
  }

  /**
   * Renders the garden image with SVG polygon overlays.
   */
  private _renderImageWithOverlay() {
    const zoneData = this._computeZoneRenderData();

    return html`
      <div class="image-container">
        <img src="${this.image}" alt="Garden" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${zoneData.map(
            (zone) => html`
              <polygon
                class="zone-polygon ${zone.isActive
                  ? "zone-polygon--active"
                  : ""} ${zone.isUnavailable
                  ? "zone-polygon--unavailable"
                  : ""}"
                points="${zone.points}"
                fill="${zone.isUnavailable ? "#9e9e9e" : zone.color}"
                opacity="${zone.opacity}"
                data-zone-id="${zone.id}"
                @click="${() => this._handleZoneTap(zone.id)}"
              />
            `
          )}
        </svg>
      </div>
    `;
  }

  /**
   * Renders zones in a list layout when no image is configured.
   */
  private _renderListLayout() {
    const zoneData = this._computeZoneRenderData();

    if (zoneData.length === 0) {
      return nothing;
    }

    return html`
      <div class="zone-list">
        ${zoneData.map(
          (zone) => html`
            <div
              class="zone-list-item ${zone.isActive
                ? "zone-list-item--active"
                : ""} ${zone.isUnavailable
                ? "zone-list-item--unavailable"
                : ""}"
              @click="${() => this._handleZoneTap(zone.id)}"
            >
              <span
                class="zone-color-dot"
                style="background-color: ${zone.isUnavailable
                  ? "#9e9e9e"
                  : zone.color}"
              ></span>
              <span class="zone-name">${zone.name}</span>
              <span class="zone-status">
                ${zone.isUnavailable
                  ? "Unavailable"
                  : zone.isActive
                    ? "Active"
                    : "Off"}
              </span>
            </div>
          `
        )}
      </div>
    `;
  }

  /**
   * Computes rendering data for all zones by combining config with entity state.
   */
  private _computeZoneRenderData(): ZoneRenderData[] {
    return this.zones.map((zone) => {
      const entity = zone.entity ? this.hass?.states[zone.entity] : undefined;
      const state = entity?.state ?? "unavailable";

      const isActive = state === "on";
      const isUnavailable =
        state === "unavailable" || state === "unknown" || !entity;

      // Convert polygon coordinates to SVG points string
      // Each coordinate pair [x, y] becomes "x,y" separated by spaces
      const points = (zone.polygon || []).map(([x, y]) => `${x},${y}`).join(" ");

      // Determine opacity based on entity state
      let opacity: number;
      if (isUnavailable) {
        opacity = 0.4;
      } else if (isActive) {
        opacity = 0.5;
      } else {
        opacity = 0.3;
      }

      return {
        id: zone.id,
        name: zone.name,
        color: zone.color,
        points,
        opacity,
        isActive,
        isUnavailable,
      };
    });
  }

  /**
   * Dispatches a zone-tap custom event when a zone polygon is clicked.
   * The event bubbles and is composed so it crosses shadow DOM boundaries.
   */
  private _handleZoneTap(zoneId: string): void {
    // Don't dispatch tap for unavailable zones
    const zone = this.zones.find((z) => z.id === zoneId);
    if (!zone) return;

    const entity = zone.entity ? this.hass?.states[zone.entity] : undefined;
    const state = entity?.state ?? "unavailable";
    if (state === "unavailable" || state === "unknown") return;

    this.dispatchEvent(
      new CustomEvent("zone-tap", {
        detail: { zoneId },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "garden-image-layer": GardenImageLayer;
  }
}
