/**
 * Schedule parsing utility for extracting next scheduled run time from HA entities.
 * Used by the Schedule View to display upcoming irrigation times.
 */

import { HassEntity } from "../models/types";

/**
 * Extracts the next scheduled run time from a Home Assistant entity.
 *
 * Checks the following sources in order:
 * 1. The `next_run` attribute (expected to be an ISO datetime string)
 * 2. The entity state itself (if it represents a datetime)
 *
 * Returns a formatted time display string, or null if:
 * - The entity is undefined
 * - The entity state is "unavailable" or "unknown"
 * - No parseable datetime is found in either source
 *
 * @param entity - The HassEntity to extract schedule from, or undefined
 * @returns A display string for the next schedule time, or null
 */
export function extractNextSchedule(
  entity: HassEntity | undefined
): string | null {
  if (!entity) {
    return null;
  }

  if (entity.state === "unavailable" || entity.state === "unknown") {
    return null;
  }

  // Try next_run attribute first
  const nextRun = entity.attributes.next_run;
  if (nextRun && typeof nextRun === "string") {
    const parsed = parseDateTime(nextRun);
    if (parsed) {
      return formatScheduleTime(parsed);
    }
  }

  // Fall back to entity state as datetime
  const stateDate = parseDateTime(entity.state);
  if (stateDate) {
    return formatScheduleTime(stateDate);
  }

  return null;
}

/**
 * Attempts to parse a string as a datetime.
 * Returns a Date object if valid, or null if not parseable.
 */
function parseDateTime(value: string): Date | null {
  if (!value || value.trim() === "") {
    return null;
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}

/**
 * Formats a Date object into a display string for schedule times.
 * Uses locale-aware time formatting (HH:MM).
 */
function formatScheduleTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
