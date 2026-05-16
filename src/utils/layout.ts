import type { LayoutMode } from "../models/types";

/**
 * Determines the responsive layout mode based on card container width.
 *
 * Breakpoints:
 * - compact: width < 400px (single column, stacked)
 * - medium: 400px ≤ width ≤ 800px (two-column grid)
 * - wide: width > 800px (side-by-side image + controls)
 *
 * @param width - The card container width in pixels (must be positive)
 * @returns The layout mode for the given width
 */
export function getLayoutMode(width: number): LayoutMode {
  if (width < 400) {
    return "compact";
  }
  if (width <= 800) {
    return "medium";
  }
  return "wide";
}
