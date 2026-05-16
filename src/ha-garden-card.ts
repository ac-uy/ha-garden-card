/**
 * HA Garden Card - Custom Home Assistant Lovelace card
 * for garden and backyard management.
 *
 * Main card component that orchestrates the garden management interface
 * with zone overlays, irrigation controls, mower status, and schedule view.
 *
 * Theme Adaptation:
 * - Reads HA CSS custom properties (--primary-color, --card-background-color, etc.)
 * - Adjusts overlay opacity and text colors for dark/light mode
 * - Uses prefers-color-scheme as fallback when hass.themes.darkMode is unavailable
 *
 * Responsive Layout (via ResizeObserver):
 * - compact (<400px): single column, stacked vertically
 * - medium (400-800px): two-column grid
 * - wide (>800px): side-by-side image + controls
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type {
  GardenCardConfig,
  HomeAssistant,
  LayoutMode,
} from "./models/types";
import { validateConfig } from "./models/config-validator";
import { getLayoutMode } from "./utils/layout";

// Import sub-components (side-effect imports to register custom elements)
import "./components/garden-image-layer";
import "./components/zone-control";
import "./components/mower-panel";
import "./components/schedule-view";
import "./components/water-animation";
import "./components/mower-animation";

// Import editor (side-effect import to register custom element for getConfigElement)
import "./editor/ha-garden-card-editor";

import type { WaterAnimationZone } from "./components/water-animation";

/**
 * Collects all entity IDs referenced in a GardenCardConfig.
 * Used for selective re-render when hass changes.
 */
function getRelevantEntityIds(config: GardenCardConfig): Set<string> {
  const entities = new Set<string>();
  for (const zone of (config.zones || [])) {
    if (zone.entity) entities.add(zone.entity);
    if (zone.duration_entity) entities.add(zone.duration_entity);
    if (zone.countdown_entity) entities.add(zone.countdown_entity);
    if (zone.schedule_entity) entities.add(zone.schedule_entity);
  }
  if (config.mower) {
    entities.add(config.mower.entity);
    if (config.mower.battery_entity) entities.add(config.mower.battery_entity);
  }
  if (config.pool) {
    entities.add(config.pool.entity);
  }
  return entities;
}

@customElement("ha-garden-card")
export class HaGardenCard extends LitElement {
  @state() private _config!: GardenCardConfig;
  @state() private _activeZone: string | null = null;
  @state() private _cardWidth: number = 0;

  private _hass?: HomeAssistant;
  private _resizeObserver?: ResizeObserver;
  private _relevantEntities: Set<string> = new Set();

  /**
   * Returns the card editor custom element for the HA Lovelace editor.
   */
  static getConfigElement(): HTMLElement {
    return document.createElement("ha-garden-card-editor");
  }

  /**
   * Returns a minimal valid default configuration for the card picker.
   */
  static getStubConfig(): GardenCardConfig {
    return {
      type: "custom:ha-garden-card",
      title: "My Garden",
      zones: [
        {
          id: "zone_1",
          name: "Zone 1",
          entity: "switch.irrigation_zone_1",
          color: "#4CAF50",
          polygon: [
            [10, 10],
            [40, 10],
            [40, 40],
            [10, 40],
          ],
        },
      ],
    };
  }

  /**
   * Validates and stores the card configuration.
   * Called by HA Lovelace when the card is configured.
   *
   * @param config - The configuration object from Lovelace
   * @throws {Error} If the configuration is invalid
   */
  public setConfig(config: GardenCardConfig): void {
    validateConfig(config);
    this._config = config;
    this._relevantEntities = getRelevantEntityIds(config);
  }

  /**
   * Returns a size hint for the HA Lovelace layout engine.
   * Increases with more zones and when a mower is configured.
   */
  public getCardSize(): number {
    if (!this._config) return 3;

    // Base size for the image area
    let size = 3;

    // Add size for zones (each zone adds roughly half a row)
    size += Math.ceil((this._config.zones || []).length / 2);

    // Add size for mower panel if configured
    if (this._config.mower) {
      size += 2;
    }

    return size;
  }

  /**
   * Custom hass setter that only triggers a re-render when
   * relevant entity states have changed.
   */
  set hass(hass: HomeAssistant) {
    const oldHass = this._hass;

    if (!oldHass) {
      this._hass = hass;
      this.requestUpdate();
      return;
    }

    // Only re-render if relevant entities have changed
    let hasChanged = false;
    for (const entityId of this._relevantEntities) {
      const oldState = oldHass.states[entityId];
      const newState = hass.states[entityId];

      if (oldState !== newState) {
        hasChanged = true;
        break;
      }
    }

    // Also check if dark mode changed
    if (oldHass.themes?.darkMode !== hass.themes?.darkMode) {
      hasChanged = true;
    }

    this._hass = hass;

    if (hasChanged) {
      this.requestUpdate();
    }
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._attachResizeObserver();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._detachResizeObserver();
  }

  private _attachResizeObserver(): void {
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width !== this._cardWidth) {
          this._cardWidth = width;
        }
      }
    });

    // Observe this element once it's in the DOM
    if (this.isConnected) {
      this._resizeObserver.observe(this);
    }
  }

  private _detachResizeObserver(): void {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = undefined;
    }
  }

  /**
   * Gets the current layout mode based on card width.
   */
  private get _layoutMode(): LayoutMode {
    // Allow config to force a specific layout
    if (this._config?.layout) {
      return this._config.layout as LayoutMode;
    }
    return getLayoutMode(this._cardWidth || 400);
  }

  /**
   * Whether dark mode is active (from HA themes or system preference fallback).
   */
  private get _isDarkMode(): boolean {
    if (this._hass?.themes) {
      return this._hass.themes.darkMode;
    }
    // Fallback to system preference
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  }

  /**
   * Exposes the active zone for sub-components.
   */
  get activeZone(): string | null {
    return this._activeZone;
  }

  /**
   * Sets the active zone (zone being controlled).
   */
  setActiveZone(zoneId: string | null): void {
    this._activeZone = zoneId;
  }

  /**
   * Handles zone-tap events from the GardenImageLayer.
   * Sets the tapped zone as the active zone.
   */
  private _handleZoneTap(e: CustomEvent<{ zoneId: string }>): void {
    const { zoneId } = e.detail;
    this._activeZone = this._activeZone === zoneId ? null : zoneId;
  }

  /**
   * Computes water animation zone data from config and entity states.
   */
  private get _waterAnimationZones(): WaterAnimationZone[] {
    if (!this._hass || !this._config) return [];

    return (this._config.zones || []).map((zone) => {
      const entity = zone.entity ? this._hass!.states[zone.entity] : undefined;
      const state = entity?.state ?? "unavailable";
      const isActive = state === "on" || state === "open";
      const points = (zone.polygon || []).map(([x, y]) => `${x},${y}`).join(" ");

      return {
        id: zone.id,
        color: zone.color,
        points,
        isActive,
      };
    });
  }

  /**
   * Whether the mower is currently in mowing state.
   */
  private get _isMowerMowing(): boolean {
    if (!this._hass || !this._config?.mower) return false;
    const entity = this._hass.states[this._config.mower.entity];
    return entity?.state === "mowing";
  }

  /**
   * Whether the pool cleaner is currently running.
   */
  private get _isPoolRunning(): boolean {
    if (!this._hass || !this._config?.pool) return false;
    const entity = this._hass.states[this._config.pool.entity];
    return entity?.state === "on" || entity?.state === "cleaning";
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    const layoutMode = this._layoutMode;
    const isDark = this._isDarkMode;

    return html`
      <ha-card .header=${this._config.title || ""}>
        <div
          class="card-content layout-${layoutMode} ${isDark ? "dark-mode" : "light-mode"}"
        >
          <!-- Garden Image Layer with SVG zone overlays and water animation -->
          <div class="image-section">
            <garden-image-layer
              .zones=${this._config.zones || []}
              .hass=${this._hass}
              .image=${this._config.image}
              @zone-tap=${this._handleZoneTap}
            ></garden-image-layer>
            <water-animation
              .zones=${this._waterAnimationZones}
            ></water-animation>
            <mower-animation
              .active=${this._isMowerMowing}
              .zone=${this._config.mower?.zone || []}
              icon="mdi:robot-mower"
            ></mower-animation>
            ${this._config.pool ? html`
              <mower-animation
                .active=${this._isPoolRunning}
                .zone=${this._config.pool?.zone || []}
                icon="${this._config.pool?.icon || 'mdi:pool'}"
              ></mower-animation>
            ` : nothing}
          </div>

          <!-- Zone Controls and Schedule -->
          <div class="controls-section">
            <zone-control-panel
              .zones=${this._config.zones || []}
              .hass=${this._hass}
              .columns=${this._config.zones_columns || (this._layoutMode === 'compact' ? 1 : 2)}
            ></zone-control-panel>

            <schedule-view
              .zones=${this._config.zones || []}
              .hass=${this._hass}
            ></schedule-view>
          </div>

          <!-- Mower Panel (conditional) -->
          ${this._config.mower
            ? html`
                <div class="mower-section">
                  <mower-panel
                    .config=${this._config.mower}
                    .hass=${this._hass}
                  ></mower-panel>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    /* =========================================================================
     * CSS Custom Properties - Theme Adaptation
     * Reads HA theme variables with sensible fallbacks.
     * ========================================================================= */
    :host {
      display: block;

      /* Theme variable mappings */
      --garden-card-bg: var(--card-background-color, var(--ha-card-background, #fff));
      --garden-card-text: var(--primary-text-color, #212121);
      --garden-card-text-secondary: var(--secondary-text-color, #727272);
      --garden-card-accent: var(--primary-color, #03a9f4);
      --garden-card-divider: var(--divider-color, #e0e0e0);
      --garden-card-radius: 12px;
      --garden-card-transition: 200ms ease;
    }

    /* =========================================================================
     * ha-card base styling - Mushroom-consistent 12px border-radius
     * ========================================================================= */
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, var(--garden-card-radius));
      background: var(--garden-card-bg);
      color: var(--garden-card-text);
      transition: box-shadow var(--garden-card-transition),
        background var(--garden-card-transition);
    }

    /* =========================================================================
     * Card Content - Base Layout
     * ========================================================================= */
    .card-content {
      padding: 16px;
      transition: padding var(--garden-card-transition);
    }

    /* =========================================================================
     * Dark Mode Adjustments
     * Increases overlay opacity for visibility on dark backgrounds,
     * adjusts text colors for contrast.
     * ========================================================================= */
    .dark-mode {
      --garden-overlay-opacity: 0.45;
      --garden-overlay-active-opacity: 0.65;
      --garden-text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .light-mode {
      --garden-overlay-opacity: 0.3;
      --garden-overlay-active-opacity: 0.5;
      --garden-text-shadow: none;
    }

    /* Fallback for when hass.themes.darkMode is not available */
    @media (prefers-color-scheme: dark) {
      :host {
        --garden-overlay-opacity: 0.45;
        --garden-overlay-active-opacity: 0.65;
        --garden-text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }
    }

    /* =========================================================================
     * Image Section - Contains garden image layer + water animation overlay
     * ========================================================================= */
    .image-section {
      position: relative;
      border-radius: var(--garden-card-radius);
      overflow: hidden;
      transition: box-shadow var(--garden-card-transition);
    }

    /* =========================================================================
     * Controls Section - Zone controls + schedule badges
     * ========================================================================= */
    .controls-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* =========================================================================
     * Mower Section
     * ========================================================================= */
    .mower-section {
      transition: opacity var(--garden-card-transition);
    }

    /* =========================================================================
     * Responsive Layout: Compact (<400px)
     * Single column, everything stacked vertically.
     * ========================================================================= */
    .layout-compact {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .layout-compact .image-section {
      width: 100%;
    }

    .layout-compact .controls-section {
      width: 100%;
    }

    .layout-compact .mower-section {
      width: 100%;
    }

    /* =========================================================================
     * Responsive Layout: Medium (400-800px)
     * Two-column grid: image spans full width, controls in 2-col grid below.
     * ========================================================================= */
    .layout-medium {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 12px;
    }

    .layout-medium .image-section {
      grid-column: 1 / -1;
    }

    .layout-medium .controls-section {
      grid-column: 1 / -1;
    }

    .layout-medium .mower-section {
      grid-column: 1 / -1;
    }

    /* =========================================================================
     * Responsive Layout: Wide (>800px)
     * Side-by-side: image on left, controls on right.
     * ========================================================================= */
    .layout-wide {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 16px;
      align-items: start;
    }

    .layout-wide .image-section {
      grid-column: 1;
      grid-row: 1 / 3;
    }

    .layout-wide .controls-section {
      grid-column: 2;
      grid-row: 1;
    }

    .layout-wide .mower-section {
      grid-column: 2;
      grid-row: 2;
    }

    /* =========================================================================
     * Touch Target Enforcement
     * All interactive elements must be at least 44x44px.
     * ========================================================================= */
    button,
    [role="button"],
    .interactive {
      min-width: 44px;
      min-height: 44px;
    }

    /* =========================================================================
     * Smooth Transitions (200ms+) for state changes
     * Applied globally to ensure consistent animation feel.
     * ========================================================================= */
    garden-image-layer,
    zone-control-panel,
    mower-panel,
    schedule-view,
    water-animation {
      transition: opacity var(--garden-card-transition);
    }

    /* =========================================================================
     * Glow Effect on Active Zone Controls
     * Applied via zone-control component's --zone-color custom property.
     * This provides a subtle ambient glow using the zone's configured color.
     * ========================================================================= */
    zone-control-panel {
      --zone-glow-spread: 12px;
    }
  `;
}

// =============================================================================
// Card Registration for HA Card Picker
// =============================================================================

// Log card version to console
console.info(
  "%c HA-GARDEN-CARD %c v0.1.0 ",
  "color: white; background: #4CAF50; font-weight: bold;",
  "color: #4CAF50; background: white; font-weight: bold;"
);

// Register on window.customCards for the HA card picker
interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-garden-card",
  name: "Garden Card",
  description:
    "A visual garden management card with zone overlays, irrigation control, and robot mower status.",
  preview: true,
});
