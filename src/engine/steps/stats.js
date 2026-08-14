/**
 * stats — modify player stats.
 *
 * Step format:
 *   { type: 'stats', changes: { success: 10, romance: 0, humor: -5 } }
 *
 * Changes are additive. Emits 'stats:changed' event.
 */
export default {
  type: 'stats',
  handler(ctx, step) {
    const { store, bus } = ctx;
    const state = store.getState();
    const changes = step.changes || {};

    const newStats = { ...state.stats };
    for (const key of ['success', 'romance', 'humor']) {
      if (typeof changes[key] === 'number') {
        newStats[key] = (newStats[key] || 0) + changes[key];
      }
    }

    store.setState({ stats: newStats });
    bus.emit('stats:changed', newStats);

    // Optional note — rendered as a persistent system message
    if (step.note) {
      const noteMsg = {
        sender: 'system',
        textKey: step.note,
        timestamp: ctx.resolveTime()
      };
      store.setState({
        messages: [...store.getState().messages, noteMsg]
      });
      if (ctx.ui && typeof ctx.ui.renderMessage === 'function') {
        ctx.ui.renderMessage(noteMsg);
      }
    }

    return true;
  }
};
