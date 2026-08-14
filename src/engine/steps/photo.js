/**
 * photo — display a chat photo (optionally blurred).
 *
 * Step format:
 *   { type: 'photo', url: 'res/chat1.png', blurred: true }
 *
 * Photos with blurred:true require ad watch to unlock.
 * Unlock state is tracked per-URL in flags.unlockedPhotos (set of URLs).
 * Legacy flag flags.photoUnlocked is kept for backward compat and achievements.
 */
export default {
  type: 'photo',
  async handler(ctx, step) {
    const { store, ui, bus, wait } = ctx;
    const state = store.getState();

    if (!await wait(1500)) return false;

    const isBlurred = step.blurred !== false;
    // Per-URL unlock tracking (new) + backward compat with old global photoUnlocked
    const unlockedUrls = state.flags.unlockedPhotos || {};
    const hasLegacyUnlock = state.flags.photoUnlocked && Object.keys(unlockedUrls).length === 0;
    const isLocked = isBlurred && !hasLegacyUnlock && !unlockedUrls[step.url];

    if (!step.time) {
      console.warn(`photo: no time for "${step.url}", using day start`);
    }
    const photoMsg = {
      sender: 'alisa',
      type: 'photo',
      photoUrl: step.url,
      isLocked,
      timestamp: ctx.resolveTime(step.time)
    };

    store.setState({
      messages: [...state.messages, photoMsg]
    });

    ui.renderMessage(photoMsg);
    ctx.audio.playNotification();
    bus.emit('photo:shown', { url: step.url, locked: isLocked });

    return true;
  }
};
