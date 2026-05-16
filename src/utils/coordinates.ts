/**
 * Coordinate transformation utilities for converting between pixel and percentage-based coordinates.
 * Used by the Zone Editor to convert click positions to percentage-based polygon vertices.
 */

/**
 * Converts pixel coordinates to percentage-based coordinates relative to image dimensions.
 * Results are clamped to the range [0, 100].
 *
 * @param px - The x pixel position of the click
 * @param py - The y pixel position of the click
 * @param width - The width of the image element in pixels
 * @param height - The height of the image element in pixels
 * @returns A tuple [xPercent, yPercent] clamped to [0, 100]
 */
export function pixelToPercent(
  px: number,
  py: number,
  width: number,
  height: number
): [number, number] {
  const xPercent = Math.min(100, Math.max(0, (px / width) * 100));
  const yPercent = Math.min(100, Math.max(0, (py / height) * 100));
  return [xPercent, yPercent];
}
