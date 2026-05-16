/**
 * MowerAnimation component.
 *
 * Renders an animated mower icon moving across the garden image
 * when the mower is in "mowing" state. The icon bounces around
 * within the configured mower zone polygon.
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("mower-animation")
export class MowerAnimation extends LitElement {
  /** Whether the mower is currently active (mowing). */
  @property({ type: Boolean })
  active = false;

  /** Mower zone polygon as percentage coordinates. */
  @property({ attribute: false })
  zone: [number, number][] = [];

  /** Current X position (percentage). */
  @state() private _x = 50;

  /** Current Y position (percentage). */
  @state() private _y = 50;

  /** Movement direction X. */
  private _dx = 0.3;

  /** Movement direction Y. */
  private _dy = 0.2;

  /** Animation frame ID. */
  private _animFrame: number | null = null;

  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 8;
    }

    .mower-dot {
      position: absolute;
      transform: translate(-50%, -50%);
      transition: opacity 300ms ease;
    }

    .mower-dot ha-icon {
      --mdc-icon-size: 28px;
      color: #4CAF50;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    if (this.active) this._startAnimation();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopAnimation();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has("active")) {
      if (this.active) {
        this._startAnimation();
      } else {
        this._stopAnimation();
      }
    }
  }

  private _startAnimation(): void {
    if (this._animFrame) return;
    if (this.zone.length < 3) {
      // No zone defined — just bounce in center area
      this._x = 30 + Math.random() * 40;
      this._y = 30 + Math.random() * 40;
    } else {
      // Start at centroid of zone
      this._x = this.zone.reduce((s, [x]) => s + x, 0) / this.zone.length;
      this._y = this.zone.reduce((s, [, y]) => s + y, 0) / this.zone.length;
    }
    // Random initial direction
    const angle = Math.random() * Math.PI * 2;
    this._dx = Math.cos(angle) * 0.15;
    this._dy = Math.sin(angle) * 0.15;
    this._tick();
  }

  private _stopAnimation(): void {
    if (this._animFrame) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
  }

  private _tick = (): void => {
    if (!this.active) return;

    let newX = this._x + this._dx;
    let newY = this._y + this._dy;

    // Bounce off boundaries
    if (this.zone.length >= 3) {
      // Simple bounding box of the zone
      const minX = Math.min(...this.zone.map(([x]) => x));
      const maxX = Math.max(...this.zone.map(([x]) => x));
      const minY = Math.min(...this.zone.map(([, y]) => y));
      const maxY = Math.max(...this.zone.map(([, y]) => y));

      if (newX <= minX || newX >= maxX) {
        this._dx = -this._dx + (Math.random() - 0.5) * 0.05;
        newX = Math.max(minX + 1, Math.min(maxX - 1, newX));
      }
      if (newY <= minY || newY >= maxY) {
        this._dy = -this._dy + (Math.random() - 0.5) * 0.05;
        newY = Math.max(minY + 1, Math.min(maxY - 1, newY));
      }
    } else {
      // Bounce in 20-80% range
      if (newX <= 20 || newX >= 80) {
        this._dx = -this._dx + (Math.random() - 0.5) * 0.05;
        newX = Math.max(20, Math.min(80, newX));
      }
      if (newY <= 20 || newY >= 80) {
        this._dy = -this._dy + (Math.random() - 0.5) * 0.05;
        newY = Math.max(20, Math.min(80, newY));
      }
    }

    // Slight random direction change for natural movement
    if (Math.random() < 0.02) {
      const angle = Math.random() * Math.PI * 2;
      this._dx = Math.cos(angle) * 0.15;
      this._dy = Math.sin(angle) * 0.15;
    }

    this._x = newX;
    this._y = newY;
    this.requestUpdate();

    this._animFrame = requestAnimationFrame(this._tick);
  };

  render() {
    if (!this.active) return nothing;

    return html`
      <div class="mower-dot" style="left: ${this._x}%; top: ${this._y}%;">
        <ha-icon icon="mdi:robot-mower"></ha-icon>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mower-animation": MowerAnimation;
  }
}
