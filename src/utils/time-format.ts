/**
 * Time formatting utility for displaying remaining irrigation time.
 *
 * Converts a number of seconds into a human-readable M:SS or MM:SS string.
 */

/**
 * Formats a number of seconds into a remaining time string.
 *
 * @param seconds - Non-negative number of seconds to format
 * @returns Formatted string in M:SS or MM:SS format (e.g., "1:05", "12:30")
 */
export function formatRemainingTime(seconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}
