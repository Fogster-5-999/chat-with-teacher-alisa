/**
 * photo — display a chat photo (optionally blurred).
 *
 * Step format:
 *   { type: 'photo', url: 'res/chat1.png', blurred: true }
 *
 * Photos with blurred:true require ad watch to unlock.
 * The unlock state is stored in flags.photoUnlocked.
 */
export default {
  type: 'photo',
  async handler(ctx, step) {
    const { store, ui, bus, wait } = ctx;
    const state = store.getState();

    if (!await wait(1500)) return false;

    const isBlurred = step.blurred !== false;
    const isLocked = isBlurred && !state.flags.photoUnlocked;

    const photoMsg = {
      sender: 'alisa',
      type: 'photo',
      photoUrl: step.url,
      isLocked,
      timestamp: new Date().toISOString()
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
