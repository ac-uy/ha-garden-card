/**
 * WaterAnimation component and shared styles.
 *
 * Provides CSS keyframe animations and SVG pattern definitions for
 * simulating water spray over active irrigation zone polygons.
 *
 * Performance strategy:
 * - CSS animations only (no JS-driven animation loops)
 * - `will-change: opacity` for GPU compositing
 * - SVG patterns reuse a single definition per zone color
 * - Targets 30fps with multiple simultaneous active zones
 *
 * Timing:
 * - Starts within 300ms of zone activation (via CSS animation-delay: 0ms + transition)
 * - Fades out over 500ms on deactivation (CSS transition: opacity 500ms)
 *
 * @module water-animation
 */

import { LitElement, html, css, svg, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { CSSResultGroup } from "lit";

// =============================================================================
// Shared Animation Styles (importable by GardenImageLayer)
// =============================================================================

/**
 * Shared CSS styles for water animation effects.
 * Can be imported and included in other components' `static styles`.
 */
export const waterAnimationStyles: CSSResultGroup = css`
  /* Water animation overlay container */
  .water-animation-overlay {
    will-change: opacity;
    pointer-events: none;
    transition: opacity 500ms ease-out;
    opacity: 0;
  }

  .water-animation-overlay--active {
    opacity: 1;
    animation: water-pulse 2s ease-in-out infinite;
    animation-delay: 0ms;
  }

  .water-animation-overlay--deactivating {
    opacity: 0;
    transition: opacity 500ms ease-out;
  }

  /* Primary pulse animation - opacity pulsing for water spray effect */
  @keyframes water-pulse {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.75;
    }
    100% {
      opacity: 0.4;
    }
  }

  /* Particle drift animation for SVG pattern circles */
  @keyframes water-particle-drift {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0.6;
    }
    25% {
      opacity: 0.9;
    }
    50% {
      transform: translateY(2px) translateX(1px);
      opacity: 0.7;
    }
    75% {
      opacity: 0.85;
    }
    100% {
      transform: translateY(0) translateX(0);
      opacity: 0.6;
    }
  }

  /* Secondary particle animation with offset timing */
  @keyframes water-particle-drift-alt {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0.5;
    }
    33% {
      transform: translateY(-1px) translateX(1.5px);
      opacity: 0.8;
    }
    66% {
      transform: translateY(1px) translateX(-0.5px);
      opacity: 0.6;
    }
    100% {
      transform: translateY(0) translateX(0);
      opacity: 0.5;
    }
  }

  /* Shimmer effect for the overall water overlay */
  @keyframes water-shimmer {
    0% {
      opacity: 0.3;
    }
    30% {
      opacity: 0.55;
    }
    60% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.3;
    }
  }
`;

// =============================================================================
// WaterAnimation Component
// =============================================================================

/**
 * Configuration for a single zone's water animation.
 */
export interface WaterAnimationZone {
  /** Unique zone identifier */
  id: string;
  /** Hex color for the water effect (matches zone color) */
  color: string;
  /** SVG polygon points string (e.g., "10,20 30,40 50,60") */
  points: string;
  /** Whether the zone is currently active (irrigating) */
  isActive: boolean;
}

/**
 * WaterAnimation renders SVG pattern overlays for active irrigation zones.
 *
 * It creates an SVG layer with animated patterns that simulate water spray
 * using the zone's configured color. The component is designed to be overlaid
 * on top of the garden image SVG.
 *
 * Usage:
 * ```html
 * <water-animation .zones=${activeZones}></water-animation>
 * ```
 */
@customElement("water-animation")
export class WaterAnimation extends LitElement {
  /**
   * Array of zones with their animation state.
   */
  @property({ attribute: false })
  zones: WaterAnimationZone[] = [];

  static styles = [
    waterAnimationStyles,
    css`
      :host {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: var(--ha-card-border-radius, 12px);
        overflow: hidden;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      .water-pattern-particle {
        animation: water-particle-drift 3s ease-in-out infinite;
      }

      .water-pattern-particle--alt {
        animation: water-particle-drift-alt 2.5s ease-in-out infinite;
      }

      .water-zone-group {
        will-change: opacity;
        transition: opacity 500ms ease-out;
      }

      .water-zone-group--active {
        animation: water-pulse 2s ease-in-out infinite;
        animation-delay: 0ms;
      }

      .water-zone-group--inactive {
        opacity: 0;
      }
    `,
  ];

  render() {
    const activeZones = this.zones.filter((z) => z.isActive);
    if (activeZones.length === 0) {
      return nothing;
    }

    return html`
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          ${activeZones.map((zone) => this._renderPatternDef(zone))}
        </defs>
        ${activeZones.map((zone) => this._renderZoneAnimation(zone))}
      </svg>
    `;
  }

  /**
   * Renders an SVG pattern definition for a zone's water effect.
   * The pattern contains animated circles that simulate water particles.
   */
  private _renderPatternDef(zone: WaterAnimationZone) {
    const patternId = `water-pattern-${zone.id}`;

    return svg`
      <pattern
        id="${patternId}"
        x="0"
        y="0"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(15)"
      >
        <!-- Primary particles -->
        <circle
          class="water-pattern-particle"
          cx="2"
          cy="2"
          r="0.8"
          fill="#ffffff"
          opacity="0.7"
        />
        <circle
          class="water-pattern-particle--alt"
          cx="6"
          cy="5"
          r="0.6"
          fill="#ffffff"
          opacity="0.5"
        />
        <!-- Secondary particles for density -->
        <circle
          class="water-pattern-particle"
          cx="4"
          cy="7"
          r="0.5"
          fill="#ffffff"
          opacity="0.4"
        />
        <circle
          class="water-pattern-particle--alt"
          cx="7"
          cy="1"
          r="0.4"
          fill="#ffffff"
          opacity="0.6"
        />
      </pattern>
    `;
  }

  /**
   * Renders the animated polygon overlay for a single zone.
   * Uses the zone's pattern fill and applies the pulse animation.
   */
  private _renderZoneAnimation(zone: WaterAnimationZone) {
    const patternId = `water-pattern-${zone.id}`;
    const groupClass = zone.isActive
      ? "water-zone-group water-zone-group--active"
      : "water-zone-group water-zone-group--inactive";

    return svg`
      <g class="${groupClass}">
        <!-- Base color fill with low opacity for glow effect -->
        <polygon
          points="${zone.points}"
          fill="${zone.color}"
          opacity="0.2"
        />
        <!-- Pattern overlay for particle effect -->
        <polygon
          points="${zone.points}"
          fill="url(#${patternId})"
          opacity="0.6"
        />
      </g>
    `;
  }
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Generates an inline SVG pattern definition string for use in external SVG contexts.
 * Useful when the animation needs to be embedded directly in another component's SVG.
 *
 * @param zoneId - Unique zone identifier for pattern ID namespacing
 * @param color - Hex color for the water particles
 * @returns SVG pattern definition as a template string
 */
export function getWaterPatternSvg(
  zoneId: string,
  color: string
): string {
  return `
    <pattern
      id="water-pattern-${zoneId}"
      x="0" y="0" width="8" height="8"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(15)"
    >
      <circle cx="2" cy="2" r="0.8" fill="#ffffff" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="6" cy="5" r="0.6" fill="#ffffff" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="4" cy="7" r="0.5" fill="#ffffff" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="7" cy="1" r="0.4" fill="#ffffff" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.85;0.6" dur="2.5s" repeatCount="indefinite"/>
      </circle>
    </pattern>
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "water-animation": WaterAnimation;
  }
}
