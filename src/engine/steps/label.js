/**
 * label — a goto target within a day.
 * Does nothing during normal execution; used by goto to find jump positions.
 *
 * Step format:
 *   { type: 'label', name: 'afterChoice1' }
 */
export default {
  type: 'label',
  handler(ctx, step) {
    // Labels are resolved at build time (label map)
    // At runtime they are no-ops
    return true;
  }
};
