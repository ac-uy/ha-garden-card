/**
 * ZoneEditor - Interactive polygon drawing tool for zone configuration.
 *
 * Displays the garden image with an SVG overlay that allows users to:
 * - Click to add polygon vertices (stored as percentage coordinates)
 * - Drag vertices to adjust polygon shapes
 * - Delete vertices via right-click or long-press
 * - Close polygon by clicking near the first vertex or pressing Confirm
 * - View all existing zone polygons with their names and colors
 *
 * Dispatches a `polygon-complete` event with the finished polygon coordinates.
 *
 * @module zone-editor
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { pixelToPercent } from "../utils/coordinates";
import type { ZoneConfig } from "../models/types";

/** Threshold in percentage units for snapping to the first vertex to close the polygon. */
const CLOSE_THRESHOLD = 3;

/** Duration in ms for long-press detection. */
const LONG_PRESS_DURATION = 500;

@customElement("zone-editor")
export class ZoneEditor extends LitElement {
  // =========================================================================
  // Public Properties
  // =========================================================================

  /** URL of the garden image to display as the drawing canvas background. */
  @property({ type: String })
  image = "";

  /** Existing zone polygons to display as reference (from other zones). */
  @property({ attribute: false })
  existingZones: ZoneConfig[] = [];

  /** Current polygon vertices being edited (percentage coordinates). */
  @property({ attribute: false })
  polygon: [number, number][] = [];

  /** Color for the zone being drawn (hex). */
  @property({ type: String })
  color: string = "#03a9f4";

  // =========================================================================
  // Internal State
  // =========================================================================

  /** Whether the polygon is closed (complete). */
  @state() private _isClosed = false;

  /** Index of the vertex currently being dragged, or null. */
  @state() private _draggingIndex: number | null = null;

  /** Validation message to display. */
  @state() private _validationMessage = "";

  /** Timer ID for long-press detection. */
  private _longPressTimer: ReturnType<typeof setTimeout> | null = null;

  /** Whether a drag operation occurred (to suppress click after drag). */
  private _didDrag = false;

  // =========================================================================
  // Lifecycle
  // =========================================================================

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearLongPress();
  }

  // =========================================================================
  // Rendering
  // =========================================================================

  protected render() {
    if (!this.image) {
      return html`
        <div class="no-image">
          <p>Configure an image URL first</p>
        </div>
      `;
    }

    return html`
      <div class="zone-editor">
        <div class="canvas-container"
          @click=${this._handleCanvasClick}
          @pointermove=${this._handlePointerMove}
          @pointerup=${this._handlePointerUp}
          @contextmenu=${this._handleContextMenu}
        >
          <img
            src="${this.image}"
            alt="Garden"
            class="garden-image"
            @load=${this._handleImageLoad}
          />
          <svg
            class="drawing-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <!-- Existing zone polygons (reference) -->
            ${this._renderExistingZones()}

            <!-- Current polygon being drawn -->
            ${this._renderCurrentPolygon()}
          </svg>

          <!-- Vertices as HTML elements (not affected by SVG stretching) -->
          ${this._renderVerticesAsHtml()}
        </div>

        <!-- Controls -->
        <div class="editor-controls">
          ${this._isClosed
            ? html`
                <span class="status-text">✓ Polygon complete (${this.polygon.length} points)</span>
                <button class="btn btn-secondary" @click=${this._handleReset}>
                  Reset
                </button>
              `
            : html`
                <span class="status-text">
                  ${this.polygon.length === 0
                    ? "Click on the image to add points"
                    : `${this.polygon.length} point${this.polygon.length !== 1 ? "s" : ""} — click first point or Confirm to close`}
                </span>
                ${this.polygon.length > 0
                  ? html`<button class="btn btn-danger" @click=${this._handleRemoveLastPoint}>
                      Undo
                    </button>`
                  : nothing}
                <button class="btn btn-primary" @click=${this._handleConfirm}>
                  Confirm
                </button>
              `}
          ${this._validationMessage
            ? html`<span class="validation-message">${this._validationMessage}</span>`
            : nothing}
        </div>
      </div>
    `;
  }

  /**
   * Renders existing zone polygons as semi-transparent reference overlays.
   */
  private _renderExistingZones() {
    return this.existingZones.map(
      (zone) => html`
        <g class="existing-zone">
          <polygon
            points="${(zone.polygon || []).map(([x, y]) => `${x},${y}`).join(" ")}"
            fill="${zone.color}"
            opacity="0.25"
            stroke="${zone.color}"
            stroke-width="0.3"
            stroke-dasharray="1,1"
          />
          ${this._renderZoneLabel(zone)}
        </g>
      `
    );
  }

  /**
   * Renders a zone name label at the centroid of the polygon.
   */
  private _renderZoneLabel(zone: ZoneConfig) {
    if (!zone.polygon || zone.polygon.length < 3) return nothing;

    // Compute centroid
    const cx =
      zone.polygon.reduce((sum, [x]) => sum + x, 0) / zone.polygon.length;
    const cy =
      zone.polygon.reduce((sum, [, y]) => sum + y, 0) / zone.polygon.length;

    return html`
      <text
        x="${cx}"
        y="${cy}"
        text-anchor="middle"
        dominant-baseline="middle"
        class="zone-label"
        fill="${zone.color}"
      >
        ${zone.name}
      </text>
    `;
  }

  /**
   * Renders the current polygon being drawn (lines between vertices).
   */
  private _renderCurrentPolygon() {
    if (this.polygon.length < 2) {
      // Even with 1 point, show a single dot
      if (this.polygon.length === 1) return nothing;
      return nothing;
    }

    if (this._isClosed) {
      // Render as a closed polygon with visible fill
      const points = this.polygon.map(([x, y]) => `${x},${y}`).join(" ");
      return html`
        <polygon
          points="${points}"
          fill="rgba(3, 169, 244, 0.3)"
          stroke="#ffffff"
          stroke-width="0.5"
          stroke-linejoin="round"
        />
      `;
    }

    // Render as open polyline with fill preview (connect back to first point)
    const points = this.polygon.map(([x, y]) => `${x},${y}`).join(" ");
    const previewPoints = [...this.polygon, this.polygon[0]].map(([x, y]) => `${x},${y}`).join(" ");
    return html`
      <!-- Semi-transparent fill preview -->
      <polygon
        points="${previewPoints}"
        fill="rgba(3, 169, 244, 0.25)"
        stroke="none"
      />
      <!-- Visible stroke for the drawn lines -->
      <polyline
        points="${points}"
        fill="none"
        stroke="#ffffff"
        stroke-width="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    `;
  }

  /**
   * Renders vertices as absolutely-positioned HTML dots.
   * These are not affected by SVG preserveAspectRatio stretching.
   */
  private _renderVerticesAsHtml() {
    return this.polygon.map(
      ([x, y], index) => {
        const isFirst = index === 0 && !this._isClosed && this.polygon.length > 2;
        const isDragging = this._draggingIndex === index;
        return html`
          <div
            class="vertex-dot ${isFirst ? 'vertex-dot--first' : ''} ${isDragging ? 'vertex-dot--dragging' : ''}"
            style="left: ${x}%; top: ${y}%;"
            data-index="${index}"
            @pointerdown=${(e: PointerEvent) => this._handleVertexPointerDown(e, index)}
            @contextmenu=${(e: Event) => this._handleVertexContextMenu(e, index)}
          >
            ${isFirst ? html`<span class="vertex-label">Close</span>` : nothing}
          </div>
        `;
      }
    );
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  /**
   * Handles image load to ensure the SVG overlay is properly sized.
   */
  private _handleImageLoad(): void {
    this.requestUpdate();
  }

  /**
   * Handles click on the SVG canvas to add a new vertex.
   */
  private _handleCanvasClick(e: MouseEvent): void {
    // Don't add vertex if we just finished dragging
    if (this._didDrag) {
      this._didDrag = false;
      return;
    }

    // Don't add vertices if polygon is closed
    if (this._isClosed) return;

    // Don't add vertex if clicking on a vertex dot
    const target = e.target as HTMLElement;
    if (target.closest(".vertex-dot")) return;

    const container = this.renderRoot.querySelector(".canvas-container") as HTMLElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const [xPercent, yPercent] = pixelToPercent(px, py, rect.width, rect.height);

    // Check if clicking near the first vertex to close the polygon
    if (this.polygon.length > 2) {
      const [firstX, firstY] = this.polygon[0];
      const distance = Math.sqrt(
        (xPercent - firstX) ** 2 + (yPercent - firstY) ** 2
      );
      if (distance <= CLOSE_THRESHOLD) {
        this._closePolygon();
        return;
      }
    }

    // Add new vertex
    this._clearValidationMessage();
    const newPolygon = [...this.polygon, [xPercent, yPercent] as [number, number]];
    this.polygon = newPolygon;
    this._dispatchPolygonChanged();
  }

  /**
   * Handles pointer down on a vertex to start dragging or long-press.
   */
  private _handleVertexPointerDown(e: PointerEvent, index: number): void {
    e.preventDefault();
    e.stopPropagation();

    // Start long-press timer for deletion
    this._longPressTimer = setTimeout(() => {
      this._deleteVertex(index);
      this._longPressTimer = null;
    }, LONG_PRESS_DURATION);

    // Start drag tracking
    this._draggingIndex = index;
    this._didDrag = false;

    // Capture pointer for drag
    const target = e.target as SVGElement;
    target.setPointerCapture(e.pointerId);
  }

  /**
   * Handles pointer move for vertex dragging.
   */
  private _handlePointerMove(e: PointerEvent): void {
    if (this._draggingIndex === null) return;

    // Cancel long-press if we moved
    this._clearLongPress();
    this._didDrag = true;

    const container = this.renderRoot.querySelector(".canvas-container") as HTMLElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const [xPercent, yPercent] = pixelToPercent(px, py, rect.width, rect.height);

    // Update vertex position
    const newPolygon = [...this.polygon];
    newPolygon[this._draggingIndex] = [xPercent, yPercent];
    this.polygon = newPolygon;
  }

  /**
   * Handles pointer up to end dragging.
   */
  private _handlePointerUp(e: PointerEvent): void {
    if (this._draggingIndex !== null) {
      // Release pointer capture
      const target = e.target as SVGElement;
      if (target.hasPointerCapture?.(e.pointerId)) {
        target.releasePointerCapture(e.pointerId);
      }

      this._draggingIndex = null;

      if (this._didDrag) {
        this._dispatchPolygonChanged();
      }
    }

    this._clearLongPress();
  }

  /**
   * Handles right-click on the SVG to prevent default context menu.
   */
  private _handleContextMenu(e: Event): void {
    e.preventDefault();
  }

  /**
   * Handles right-click on a vertex to delete it.
   */
  private _handleVertexContextMenu(e: Event, index: number): void {
    e.preventDefault();
    e.stopPropagation();
    this._deleteVertex(index);
  }

  /**
   * Handles the Undo (remove last point) button click.
   */
  private _handleRemoveLastPoint(): void {
    if (this.polygon.length === 0) return;
    this.polygon = this.polygon.slice(0, -1);
    this._clearValidationMessage();
    this._dispatchPolygonChanged();
  }

  /**
   * Handles the Confirm button click.
   */
  private _handleConfirm(): void {
    if (this.polygon.length < 3) {
      this._validationMessage = "A zone needs at least 3 points";
      return;
    }

    this._closePolygon();
  }

  /**
   * Handles the Reset button click.
   */
  private _handleReset(): void {
    this.polygon = [];
    this._isClosed = false;
    this._clearValidationMessage();
    this._dispatchPolygonChanged();
  }

  // =========================================================================
  // Internal Methods
  // =========================================================================

  /**
   * Closes the polygon and dispatches the polygon-complete event.
   */
  private _closePolygon(): void {
    this._isClosed = true;
    this._clearValidationMessage();
    this._dispatchPolygonComplete();
  }

  /**
   * Deletes a vertex at the given index.
   * If the polygon was closed and drops below 3 vertices, it reopens.
   */
  private _deleteVertex(index: number): void {
    if (this.polygon.length === 0) return;

    const newPolygon = this.polygon.filter((_, i) => i !== index);
    this.polygon = newPolygon;

    // If polygon was closed and now has < 3 vertices, reopen it
    if (this._isClosed && newPolygon.length < 3) {
      this._isClosed = false;
    }

    this._dispatchPolygonChanged();
  }

  /**
   * Clears the long-press timer.
   */
  private _clearLongPress(): void {
    if (this._longPressTimer !== null) {
      clearTimeout(this._longPressTimer);
      this._longPressTimer = null;
    }
  }

  /**
   * Clears the validation message.
   */
  private _clearValidationMessage(): void {
    this._validationMessage = "";
  }

  /**
   * Dispatches a polygon-changed event with the current polygon state.
   */
  private _dispatchPolygonChanged(): void {
    this.dispatchEvent(
      new CustomEvent("polygon-changed", {
        detail: { polygon: [...this.polygon] },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Dispatches a polygon-complete event with the finished polygon coordinates.
   */
  private _dispatchPolygonComplete(): void {
    this.dispatchEvent(
      new CustomEvent("polygon-complete", {
        detail: { polygon: [...this.polygon] },
        bubbles: true,
        composed: true,
      })
    );
  }

  // =========================================================================
  // Styles
  // =========================================================================

  static styles = css`
    :host {
      display: block;
    }

    .zone-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .no-image {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color, #727272);
      border: 2px dashed var(--divider-color, #e0e0e0);
      border-radius: 12px;
    }

    .no-image p {
      margin: 0;
      font-size: 14px;
    }

    /* Canvas container: image + SVG overlay */
    .canvas-container {
      position: relative;
      width: 100%;
      line-height: 0;
      border-radius: 12px;
      overflow: hidden;
      border: 2px solid var(--divider-color, #e0e0e0);
      cursor: crosshair;
    }

    .garden-image {
      width: 100%;
      height: auto;
      display: block;
      user-select: none;
      -webkit-user-drag: none;
      pointer-events: none;
    }

    .drawing-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
    }

    /* Existing zone polygons (reference) */
    .existing-zone polygon {
      pointer-events: none;
    }

    .zone-label {
      font-size: 3px;
      font-weight: 500;
      pointer-events: none;
      user-select: none;
    }

    /* Vertex dots (HTML positioned elements) */
    .vertex-dot {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #03a9f4;
      transform: translate(-50%, -50%);
      cursor: grab;
      z-index: 10;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      transition: transform 150ms ease, box-shadow 150ms ease;
    }

    .vertex-dot:hover {
      transform: translate(-50%, -50%) scale(1.3);
      box-shadow: 0 3px 10px rgba(0,0,0,0.5);
    }

    .vertex-dot--first {
      background: #ff5722;
      border-color: #ffffff;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    .vertex-dot--first:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }

    .vertex-dot--dragging {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.4);
      box-shadow: 0 4px 12px rgba(0,0,0,0.6);
    }

    .vertex-label {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px;
      color: #ff5722;
      font-weight: 600;
      white-space: nowrap;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }

    /* Editor controls bar */
    .editor-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      flex-wrap: wrap;
    }

    .status-text {
      font-size: 13px;
      color: var(--secondary-text-color, #727272);
      flex: 1;
      min-width: 0;
    }

    .validation-message {
      font-size: 12px;
      color: var(--error-color, #db4437);
      width: 100%;
      margin-top: 4px;
    }

    /* Buttons */
    .btn {
      padding: 6px 16px;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      min-height: 36px;
      min-width: 44px;
      transition: background 150ms ease, opacity 150ms ease;
      white-space: nowrap;
    }

    .btn-primary {
      background: var(--primary-color, #03a9f4);
      color: white;
    }

    .btn-primary:hover {
      opacity: 0.85;
    }

    .btn-secondary {
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color, #212121);
    }

    .btn-secondary:hover {
      background: var(--divider-color, #e0e0e0);
    }

    .btn-danger {
      background: rgba(244, 67, 54, 0.1);
      color: #f44336;
      border: 1px solid #f44336;
    }

    .btn-danger:hover {
      background: rgba(244, 67, 54, 0.2);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "zone-editor": ZoneEditor;
  }
}
