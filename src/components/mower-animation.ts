/**
 * MowerAnimation component.
 *
 * Renders an animated icon moving smoothly within a defined zone polygon
 * when active. Used for both mower and pool cleaner animations.
 */

import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("mower-animation")
export class MowerAnimation extends LitElement {
  /** Whether the device is currently active. */
  @property({ type: Boolean })
  active = false;

  /** Zone polygon as percentage coordinates. */
  @property({ attribute: false })
  zone: [number, number][] = [];

  /** Icon to display (default: mdi:robot-mower). */
  @property({ type: String })
  icon = "mdi:robot-mower";

  /** Current X position (percentage). */
  @state() private _x = 50;

  /** Current Y position (percentage). */
  @state() private _y = 50;

  /** Target X. */
  private _targetX = 50;

  /** Target Y. */
  private _targetY = 50;

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

    .device-icon {
      position: absolute;
      transform: translate(-50%, -50%);
    }

    .device-icon ha-icon {
      --mdc-icon-size: 24px;
      color: #ffffff;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));
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

    // Start at centroid of zone or center
    if (this.zone.length >= 3) {
      this._x = this.zone.reduce((s, [x]) => s + x, 0) / this.zone.length;
      this._y = this.zone.reduce((s, [, y]) => s + y, 0) / this.zone.length;
    } else {
      this._x = 50;
      this._y = 50;
    }
    this._pickNewTarget();
    this._tick();
  }

  private _stopAnimation(): void {
    if (this._animFrame) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
  }

  /** Pick a random point inside the zone bounding box. */
  private _pickNewTarget(): void {
    if (this.zone.length >= 3) {
      const minX = Math.min(...this.zone.map(([x]) => x));
      const maxX = Math.max(...this.zone.map(([x]) => x));
      const minY = Math.min(...this.zone.map(([, y]) => y));
      const maxY = Math.max(...this.zone.map(([, y]) => y));
      this._targetX = minX + Math.random() * (maxX - minX);
      this._targetY = minY + Math.random() * (maxY - minY);
    } else {
      this._targetX = 20 + Math.random() * 60;
      this._targetY = 20 + Math.random() * 60;
    }
  }

  private _tick = (): void => {
    if (!this.active) return;

    // Move towards target smoothly
    const speed = 0.08;
    const dx = this._targetX - this._x;
    const dy = this._targetY - this._y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 1) {
      // Reached target, pick new one
      this._pickNewTarget();
    } else {
      this._x += (dx / dist) * speed;
      this._y += (dy / dist) * speed;
    }

    this.requestUpdate();
    this._animFrame = requestAnimationFrame(this._tick);
  };

  render() {
    if (!this.active) return nothing;

    return html`
      <div class="device-icon" style="left: ${this._x}%; top: ${this._y}%;">
        <ha-icon icon="${this.icon}"></ha-icon>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mower-animation": MowerAnimation;
  }
}
