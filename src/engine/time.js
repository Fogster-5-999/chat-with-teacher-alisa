/**
 * time — resolve message timestamps from the day's date + an explicit HH:MM.
 *
 * Message times are declared in story data (`time: 'HH:MM'`), not computed at
 * runtime. This helper glues the day date to that time.
 */

function toValidDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

function prevPlusOne(lastTimestamp) {
  const d = toValidDate(lastTimestamp);
  if (!d) return null;
  d.setMinutes(d.getMinutes() + 1);
  return d;
}

/**
 * Build an ISO timestamp for a message.
 *
 * Precedence:
 * 1. Valid day date → combined with `timeStr` ('HH:MM'); without `timeStr`
 *    (e.g. system messages) → the day date itself.
 * 2. Broken/absent day date → previous message timestamp + 1 minute (keeps
 *    chat order plausible even for corrupt saves).
 * 3. No previous message → now.
 *
 * @param {string|null} [dayDateISO] - day date from state.dates.currentDate
 * @param {string} [timeStr] - 'HH:MM'
 * @param {string} [lastTimestamp] - timestamp of the last rendered message
 * @returns {string} ISO-8601 timestamp
 */
export function resolveTime(dayDateISO, timeStr, lastTimestamp) {
  const day = toValidDate(dayDateISO);
  if (day) {
    if (typeof timeStr === 'string' && timeStr.includes(':')) {
      const parts = timeStr.split(':');
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        day.setHours(hours, minutes, 0, 0);
        return day.toISOString();
      }
    }
    return day.toISOString();
  }

  const prev = prevPlusOne(lastTimestamp);
  return prev ? prev.toISOString() : new Date().toISOString();
}
