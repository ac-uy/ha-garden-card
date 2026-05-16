/**
 * HA Garden Card Editor - Visual configuration UI for the garden card.
 *
 * Provides form inputs for card title, image URL, zone management
 * (add/remove/reorder), entity pickers, and mower configuration.
 * Dispatches `config-changed` events on every modification.
 *
 * @module ha-garden-card-editor
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type {
  GardenCardConfig,
  ZoneConfig,
  MowerConfig,
  PoolConfig,
  HomeAssistant,
} from "../models/types";

// Import the zone editor component
import "./zone-editor";

/**
 * Generates a simple UUID v4 string for new zone IDs.
 */
function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

@customElement("ha-garden-card-editor")
export class HaGardenCardEditor extends LitElement {
  @state() private _config!: GardenCardConfig;
  @state() private _hass?: HomeAssistant;
  @state() private _editingPolygonIndex: number | null = null;
  @state() private _editingMowerZone = false;
  @state() private _editingPoolZone = false;

  /**
   * Called by HA to provide the current configuration.
   */
  public setConfig(config: GardenCardConfig): void {
    this._config = { ...config };
  }

  /**
   * Called by HA to provide the hass object (needed for entity pickers).
   */
  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
  }

  /**
   * Dispatches a config-changed event with the updated configuration.
   */
  private _dispatchConfigChanged(config: GardenCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  // ===========================================================================
  // Event Handlers - General
  // ===========================================================================

  private _handleTitleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._dispatchConfigChanged({
      ...this._config,
      title: target.value,
    });
  }

  private _handleImageChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._dispatchConfigChanged({
      ...this._config,
      image: target.value,
    });
  }

  // ===========================================================================
  // Event Handlers - Zones
  // ===========================================================================

  private _handleAddZone(): void {
    const newZone: ZoneConfig = {
      id: generateId(),
      name: `Zone ${this._config.zones.length + 1}`,
      entity: "",
      color: "#4CAF50",
      polygon: [],
    };

    this._dispatchConfigChanged({
      ...this._config,
      zones: [...this._config.zones, newZone],
    });
  }

  private _handleRemoveZone(index: number): void {
    const zones = [...this._config.zones];
    zones.splice(index, 1);
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  private _handleMoveZoneUp(index: number): void {
    if (index <= 0) return;
    const zones = [...this._config.zones];
    [zones[index - 1], zones[index]] = [zones[index], zones[index - 1]];
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  private _handleMoveZoneDown(index: number): void {
    if (index >= this._config.zones.length - 1) return;
    const zones = [...this._config.zones];
    [zones[index], zones[index + 1]] = [zones[index + 1], zones[index]];
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  private _handleZoneNameChange(index: number, e: Event): void {
    const target = e.target as HTMLInputElement;
    const zones = [...this._config.zones];
    zones[index] = { ...zones[index], name: target.value };
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  private _handleZoneEntityChange(index: number, e: CustomEvent): void {
    const value = e.detail?.value ?? "";
    const zones = [...this._config.zones];
    zones[index] = { ...zones[index], entity: value };
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  private _handleZoneColorChange(index: number, e: Event): void {
    const target = e.target as HTMLInputElement;
    const zones = [...this._config.zones];
    zones[index] = { ...zones[index], color: target.value };
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  private _handleZoneDurationEntityChange(
    index: number,
    e: CustomEvent
  ): void {
    const value = e.detail?.value ?? "";
    const zones = [...this._config.zones];
    zones[index] = { ...zones[index], duration_entity: value || undefined };
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  private _handleZoneCountdownEntityChange(
    index: number,
    e: CustomEvent
  ): void {
    const value = e.detail?.value ?? "";
    const zones = [...this._config.zones];
    zones[index] = { ...zones[index], countdown_entity: value || undefined };
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  private _handleZoneScheduleEntityChange(
    index: number,
    e: CustomEvent
  ): void {
    const value = e.detail?.value ?? "";
    const zones = [...this._config.zones];
    zones[index] = { ...zones[index], schedule_entity: value || undefined };
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  // ===========================================================================
  // Event Handlers - Polygon Editor
  // ===========================================================================

  private _handleEditPolygon(index: number): void {
    this._editingPolygonIndex = this._editingPolygonIndex === index ? null : index;
  }

  private _handlePolygonChanged(index: number, e: CustomEvent): void {
    const polygon = e.detail?.polygon || [];
    const zones = [...(this._config.zones || [])];
    zones[index] = { ...zones[index], polygon };
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
  }

  private _handlePolygonComplete(index: number, e: CustomEvent): void {
    const polygon = e.detail?.polygon || [];
    const zones = [...(this._config.zones || [])];
    zones[index] = { ...zones[index], polygon };
    this._dispatchConfigChanged({
      ...this._config,
      zones,
    });
    this._editingPolygonIndex = null;
  }

  // ===========================================================================
  // Event Handlers - Mower Zone
  // ===========================================================================

  private _handleEditMowerZone(): void {
    this._editingMowerZone = !this._editingMowerZone;
  }

  private _handleMowerZoneChanged(e: CustomEvent): void {
    const polygon = e.detail?.polygon || [];
    const mower = { ...(this._config.mower || { entity: "" }), zone: polygon };
    this._dispatchConfigChanged({ ...this._config, mower });
  }

  private _handleMowerZoneComplete(e: CustomEvent): void {
    const polygon = e.detail?.polygon || [];
    const mower = { ...(this._config.mower || { entity: "" }), zone: polygon };
    this._dispatchConfigChanged({ ...this._config, mower });
    this._editingMowerZone = false;
  }

  // ===========================================================================
  // Event Handlers - Pool
  // ===========================================================================

  private _handlePoolEntityChange(e: CustomEvent): void {
    const value = e.detail?.value ?? "";
    if (!value) {
      const { pool: _removed, ...rest } = this._config;
      this._dispatchConfigChanged(rest as GardenCardConfig);
      return;
    }
    const pool: PoolConfig = { ...(this._config.pool || { entity: "" }), entity: value };
    this._dispatchConfigChanged({ ...this._config, pool });
  }

  private _handleEditPoolZone(): void {
    this._editingPoolZone = !this._editingPoolZone;
  }

  private _handlePoolZoneChanged(e: CustomEvent): void {
    const polygon = e.detail?.polygon || [];
    const pool = { ...(this._config.pool || { entity: "" }), zone: polygon };
    this._dispatchConfigChanged({ ...this._config, pool });
  }

  private _handlePoolZoneComplete(e: CustomEvent): void {
    const polygon = e.detail?.polygon || [];
    const pool = { ...(this._config.pool || { entity: "" }), zone: polygon };
    this._dispatchConfigChanged({ ...this._config, pool });
    this._editingPoolZone = false;
  }

  // ===========================================================================
  // Event Handlers - Mower
  // ===========================================================================

  private _handleMowerEntityChange(e: CustomEvent): void {
    const value = e.detail?.value ?? "";
    if (!value) {
      // Remove mower config if entity cleared
      const { mower: _removed, ...rest } = this._config;
      this._dispatchConfigChanged(rest as GardenCardConfig);
      return;
    }

    const mower: MowerConfig = {
      ...(this._config.mower || { entity: "" }),
      entity: value,
    };
    this._dispatchConfigChanged({
      ...this._config,
      mower,
    });
  }

  private _handleMowerBatteryEntityChange(e: CustomEvent): void {
    const value = e.detail?.value ?? "";
    if (!this._config.mower) return;

    const mower: MowerConfig = {
      ...this._config.mower,
      battery_entity: value || undefined,
    };
    this._dispatchConfigChanged({
      ...this._config,
      mower,
    });
  }

  // ===========================================================================
  // Rendering
  // ===========================================================================

  protected render() {
    if (!this._config) {
      return nothing;
    }

    return html`
      <div class="editor">
        ${this._renderGeneralSection()}
        ${this._renderZonesSection()}
        ${this._renderMowerSection()}
        ${this._renderPoolSection()}
      </div>
    `;
  }

  private _renderGeneralSection() {
    return html`
      <div class="section">
        <h3 class="section-title">General</h3>
        <div class="field">
          <label class="field-label">Title</label>
          <input
            type="text"
            .value=${this._config.title || ""}
            @input=${this._handleTitleChange}
            placeholder="My Garden"
            class="text-input"
          />
        </div>
        <div class="field">
          <label class="field-label">Image URL</label>
          <input
            type="text"
            .value=${this._config.image || ""}
            @input=${this._handleImageChange}
            placeholder="/local/garden.jpg"
            class="text-input"
          />
        </div>
      </div>
    `;
  }

  private _renderZonesSection() {
    const hasNoZones = !this._config.zones || this._config.zones.length === 0;

    return html`
      <div class="section">
        <div class="section-header">
          <h3 class="section-title">Zones</h3>
          <button class="add-button" @click=${this._handleAddZone}>
            + Add Zone
          </button>
        </div>

        ${hasNoZones
          ? html`<div class="warning">
              ⚠️ At least one zone is required for the card to work.
            </div>`
          : nothing}

        <div class="zone-list">
          ${(this._config.zones || []).map((zone, index) =>
            this._renderZoneEntry(zone, index)
          )}
        </div>
      </div>
    `;
  }

  private _renderZoneEntry(zone: ZoneConfig, index: number) {
    const isFirst = index === 0;
    const isLast = index === (this._config.zones || []).length - 1;

    return html`
      <div class="zone-entry">
        <div class="zone-header">
          <span class="zone-number">${index + 1}</span>
          <span class="zone-name-display">${zone.name || "Unnamed"}</span>
          <div class="zone-actions">
            <button
              class="icon-button"
              @click=${() => this._handleMoveZoneUp(index)}
              ?disabled=${isFirst}
              title="Move up"
            >
              ▲
            </button>
            <button
              class="icon-button"
              @click=${() => this._handleMoveZoneDown(index)}
              ?disabled=${isLast}
              title="Move down"
            >
              ▼
            </button>
            <button
              class="icon-button remove-button"
              @click=${() => this._handleRemoveZone(index)}
              title="Remove zone"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="zone-fields">
          <div class="field">
            <label class="field-label">Name</label>
            <input
              type="text"
              .value=${zone.name || ""}
              @input=${(e: Event) => this._handleZoneNameChange(index, e)}
              placeholder="Zone name"
              class="text-input"
            />
          </div>

          <div class="field">
            <label class="field-label">Entity (switch/valve)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${zone.entity || ""}
              .includeDomains=${["switch", "valve", "input_boolean"]}
              @value-changed=${(e: CustomEvent) =>
                this._handleZoneEntityChange(index, e)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Color</label>
            <div class="color-picker-row">
              <input
                type="color"
                .value=${zone.color || "#4CAF50"}
                @input=${(e: Event) => this._handleZoneColorChange(index, e)}
                class="color-input"
              />
              <span class="color-value">${zone.color || "#4CAF50"}</span>
            </div>
          </div>

          <div class="field">
            <label class="field-label">Duration Entity (optional)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${zone.duration_entity || ""}
              .includeDomains=${["number"]}
              @value-changed=${(e: CustomEvent) =>
                this._handleZoneDurationEntityChange(index, e)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Countdown Entity (optional)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${zone.countdown_entity || ""}
              .includeDomains=${["sensor"]}
              @value-changed=${(e: CustomEvent) =>
                this._handleZoneCountdownEntityChange(index, e)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Schedule Entity (optional)</label>
            <ha-entity-picker
              .hass=${this._hass}
              .value=${zone.schedule_entity || ""}
              .includeDomains=${["input_datetime", "schedule", "sensor"]}
              @value-changed=${(e: CustomEvent) =>
                this._handleZoneScheduleEntityChange(index, e)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="field">
            <label class="field-label">Zone Shape</label>
            <div class="polygon-status">
              ${zone.polygon && zone.polygon.length >= 3
                ? html`<span class="polygon-info">✓ ${zone.polygon.length} points defined</span>`
                : html`<span class="polygon-info polygon-info--empty">No shape defined</span>`}
              <button
                class="btn-draw"
                @click=${() => this._handleEditPolygon(index)}
              >
                ${this._editingPolygonIndex === index ? "Close Editor" : "Draw Zone"}
              </button>
            </div>
            ${this._editingPolygonIndex === index
              ? html`
                  <zone-editor
                    .image=${this._config.image || ""}
                    .existingZones=${(this._config.zones || []).filter((_, i) => i !== index)}
                    .polygon=${zone.polygon || []}
                    .color=${zone.color || "#4CAF50"}
                    @polygon-changed=${(e: CustomEvent) => this._handlePolygonChanged(index, e)}
                    @polygon-complete=${(e: CustomEvent) => this._handlePolygonComplete(index, e)}
                  ></zone-editor>
                `
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private _renderMowerSection() {
    return html`
      <div class="section">
        <h3 class="section-title">🤖 Robot Mower (optional)</h3>
        <div class="field">
          <label class="field-label">Mower Entity</label>
          <ha-entity-picker
            .hass=${this._hass}
            .value=${this._config.mower?.entity || ""}
            .includeDomains=${["lawn_mower"]}
            @value-changed=${this._handleMowerEntityChange}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        ${this._config.mower?.entity
          ? html`
              <div class="field">
                <label class="field-label">Battery Sensor (optional)</label>
                <ha-entity-picker
                  .hass=${this._hass}
                  .value=${this._config.mower?.battery_entity || ""}
                  .includeDomains=${["sensor"]}
                  @value-changed=${this._handleMowerBatteryEntityChange}
                  allow-custom-entity
                ></ha-entity-picker>
              </div>

              <div class="field">
                <label class="field-label">Mower Zone</label>
                <div class="polygon-status">
                  ${this._config.mower?.zone && this._config.mower.zone.length >= 3
                    ? html`<span class="polygon-info">✓ ${this._config.mower.zone.length} points defined</span>`
                    : html`<span class="polygon-info polygon-info--empty">No mower zone defined</span>`}
                  <button
                    class="btn-draw"
                    @click=${this._handleEditMowerZone}
                  >
                    ${this._editingMowerZone ? "Close Editor" : "Draw Mower Zone"}
                  </button>
                </div>
                ${this._editingMowerZone
                  ? html`
                      <zone-editor
                        .image=${this._config.image || ""}
                        .existingZones=${this._config.zones || []}
                        .polygon=${this._config.mower?.zone || []}
                        @polygon-changed=${this._handleMowerZoneChanged}
                        @polygon-complete=${this._handleMowerZoneComplete}
                      ></zone-editor>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private _renderPoolSection() {
    return html`
      <div class="section">
        <h3 class="section-title">🏊 Pool Cleaner (optional)</h3>
        <div class="field">
          <label class="field-label">Pool Cleaner Entity</label>
          <ha-entity-picker
            .hass=${this._hass}
            .value=${this._config.pool?.entity || ""}
            .includeDomains=${["switch", "vacuum", "input_boolean"]}
            @value-changed=${this._handlePoolEntityChange}
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        ${this._config.pool?.entity
          ? html`
              <div class="field">
                <label class="field-label">Pool Zone</label>
                <div class="polygon-status">
                  ${this._config.pool?.zone && this._config.pool.zone.length >= 3
                    ? html`<span class="polygon-info">✓ ${this._config.pool.zone.length} points defined</span>`
                    : html`<span class="polygon-info polygon-info--empty">No pool zone defined</span>`}
                  <button
                    class="btn-draw"
                    @click=${this._handleEditPoolZone}
                  >
                    ${this._editingPoolZone ? "Close Editor" : "Draw Pool Zone"}
                  </button>
                </div>
                ${this._editingPoolZone
                  ? html`
                      <zone-editor
                        .image=${this._config.image || ""}
                        .existingZones=${this._config.zones || []}
                        .polygon=${this._config.pool?.zone || []}
                        @polygon-changed=${this._handlePoolZoneChanged}
                        @polygon-complete=${this._handlePoolZoneComplete}
                      ></zone-editor>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  // ===========================================================================
  // Styles
  // ===========================================================================

  static styles = css`
    .editor {
      padding: 16px;
      font-family: var(--paper-font-body1_-_font-family, "Roboto", sans-serif);
    }

    .section {
      margin-bottom: 24px;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 12px 0;
      color: var(--primary-text-color, #212121);
    }

    .section-header .section-title {
      margin-bottom: 0;
    }

    .field {
      margin-bottom: 12px;
    }

    .field-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #727272);
      margin-bottom: 4px;
    }

    .text-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      font-size: 14px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      box-sizing: border-box;
      outline: none;
      transition: border-color 200ms ease;
    }

    .text-input:focus {
      border-color: var(--primary-color, #03a9f4);
    }

    .text-input::placeholder {
      color: var(--secondary-text-color, #727272);
      opacity: 0.6;
    }

    .add-button {
      padding: 6px 12px;
      border: none;
      border-radius: 8px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 200ms ease;
    }

    .add-button:hover {
      opacity: 0.85;
    }

    .warning {
      padding: 12px;
      border-radius: 8px;
      background: #fff3cd;
      color: #856404;
      font-size: 13px;
      margin-bottom: 12px;
    }

    .zone-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .zone-entry {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      overflow: hidden;
    }

    .zone-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--secondary-background-color, #f5f5f5);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .zone-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .zone-name-display {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .zone-actions {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    .icon-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 12px;
      cursor: pointer;
      transition: background 200ms ease, color 200ms ease;
    }

    .icon-button:hover:not([disabled]) {
      background: var(--divider-color, #e0e0e0);
      color: var(--primary-text-color, #212121);
    }

    .icon-button[disabled] {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .icon-button.remove-button:hover:not([disabled]) {
      background: #ffebee;
      color: #c62828;
    }

    .zone-fields {
      padding: 12px;
    }

    .color-picker-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-input {
      width: 44px;
      height: 44px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 2px;
      cursor: pointer;
      background: transparent;
    }

    .color-value {
      font-size: 13px;
      font-family: monospace;
      color: var(--secondary-text-color, #727272);
    }

    ha-entity-picker {
      display: block;
      width: 100%;
    }

    .polygon-status {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .polygon-info {
      font-size: 13px;
      color: var(--primary-text-color, #212121);
      flex: 1;
    }

    .polygon-info--empty {
      color: var(--secondary-text-color, #727272);
      font-style: italic;
    }

    .btn-draw {
      padding: 6px 12px;
      border: 1px solid var(--primary-color, #03a9f4);
      border-radius: 8px;
      background: transparent;
      color: var(--primary-color, #03a9f4);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 200ms ease;
      white-space: nowrap;
    }

    .btn-draw:hover {
      background: rgba(3, 169, 244, 0.1);
    }

    zone-editor {
      margin-top: 8px;
    }
  `;
}
