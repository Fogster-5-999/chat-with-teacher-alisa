/**
 * flags — set one or more flags on the game state.
 *
 * Step format:
 *   { type: 'flags', set: { studiedHard: true, day1Completed: true } }
 */
export default {
  type: 'flags',
  handler(ctx, step) {
    const { store, bus } = ctx;
    const state = store.getState();
    const newFlags = { ...state.flags, ...(step.set || {}) };
    store.setState({ flags: newFlags });
    bus.emit('flags:changed', newFlags);
    return true;
  }
};
