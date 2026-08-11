/**
 * voice — display a single voice message in the chat.
 *
 * Step format:
 *   { type: 'voice', voiceId: 'day_3' }
 *
 * Voice messages are locked by default (ad required to listen), mirroring photos.
 * The lock only affects playback — the story never blocks on it.
 * Unlock state is persisted in flags.unlockedVoices (set of voiceIds).
 */
import { getVoiceClip } from '../../data/voice.js';

export default {
  type: 'voice',
  async handler(ctx, step) {
    const { store, ui, bus, wait } = ctx;
    const clip = getVoiceClip(step.voiceId);
    if (!clip) {
      console.warn(`voice: unknown voiceId "${step.voiceId}", skipping`);
      return true;
    }

    // Typing delay (like text messages) before the voice appears
    const [minDelay, maxDelay] = step.typingDelay || [2000, 4000];
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    ui.showTyping();
    if (!await wait(delay)) return false;
    ui.hideTyping();

    // Read fresh state after async gap
    const dates = store.getState().dates;
    let timestamp;
    if (dates.currentDate && dates.currentTime) {
      const t = new Date(dates.currentTime);
      t.setMinutes(t.getMinutes() + Math.floor(Math.random() * 5) + 1);
      timestamp = t.toISOString();
    } else {
      timestamp = new Date().toISOString();
    }

    // Locked by default; already-unlocked voices stay unlocked
    const freshState = store.getState();
    const unlockedVoices = freshState.flags.unlockedVoices || {};
    const isLocked = !unlockedVoices[step.voiceId];

    const msg = {
      sender: 'alisa',
      type: 'voice',
      voiceId: step.voiceId,
      isLocked,
      timestamp
    };

    store.setState({
      messages: [...freshState.messages, msg],
      dates: { ...freshState.dates, currentTime: timestamp }
    });

    ui.renderMessage(msg);
    bus.emit('voice:shown', { voiceId: step.voiceId, locked: isLocked });
    ctx.audio.playNotification();

    return true;
  }
};
