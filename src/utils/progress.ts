/**
 * Progress calculation utility for irrigation zone countdown.
 *
 * Computes the elapsed percentage of an irrigation cycle based on
 * remaining seconds and total duration, clamped to [0, 100].
 */

/**
 * Calculate the progress percentage for an irrigation zone.
 *
 * Formula: ((total - remaining) / total) * 100, clamped to [0, 100].
 *
 * @param remaining - Remaining seconds on the countdown
 * @param total - Total duration in seconds (must be > 0)
 * @returns Progress percentage clamped to [0, 100]
 */
export function calculateProgress(remaining: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  const progress = ((total - remaining) / total) * 100;

  return Math.min(100, Math.max(0, progress));
}
