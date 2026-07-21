/**
 * goto — jump to another day or to a label within the current day.
 *
 * Step format:
 *   { type: 'goto', day: 'day2' }         // jump to another day
 *   { type: 'goto', label: 'someLabel' }  // jump within current day
 *   { type: 'goto', day: 'day2', label: 'start' }  // both
 *
 * Sets session.pendingGoto which DayRunner resolves.
 */
export default {
  type: 'goto',
  handler(ctx, step) {
    const { setSession } = ctx;
    setSession({
      pendingGoto: {
        day: step.day || null,
        label: step.label || null
      }
    });
    // Return a signal to stop current day execution
    return 'GOTO';
  }
};
