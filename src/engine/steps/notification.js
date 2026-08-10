/**
 * notification — show a push notification from a friend or system.
 *
 * Step format:
 *   { type: 'notification', id: 'friendMisha', name: 'Миша',
 *     textKey: '...', icon: '👤', durationMs: 5000 }
 *
 * Notifications are shown only once per id (tracked in flags.shownNotifs).
 */
export default {
  type: 'notification',
  handler(ctx, step) {
    const { store, ui, bus } = ctx;
    const state = store.getState();
    const notifId = step.id || step.name;

    // Check if already shown
    const shownNotifs = state.flags.shownNotifs || {};
    if (shownNotifs[notifId]) return true;

    // Mark as shown
    const newFlags = {
      ...state.flags,
      shownNotifs: { ...shownNotifs, [notifId]: true }
    };
    store.setState({ flags: newFlags });

    ui.showTopNotification(
      ctx.t(step.name || ''),
      ctx.t(step.textKey || ''),
      step.durationMs || 5000,
      step.icon || '💬'
    );

    bus.emit('notification:shown', step);
    return true;
  }
};
