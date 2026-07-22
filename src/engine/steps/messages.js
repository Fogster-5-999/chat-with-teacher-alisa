/**
 * messages — batch of messages displayed one after another.
 *
 * Step format:
 *   { type: 'messages', list: [
 *     { sender: 'alisa', textKey: '...' },
 *     { sender: 'alisa', textKey: '...' }
 *   ], typingDelay: [2000, 4000] }
 *
 * Uses the message step handler internally for each message.
 */
import messageHandler from './message.js';

export default {
  type: 'messages',
  async handler(ctx, step) {
    const list = step.list || [];

    // Count consecutive messages already in chat (dedup after page reload)
    const existing = ctx.store.getState().messages;
    const existingSet = new Set(existing.map(m => `${m.sender}\0${m.textKey}`));
    let skip = 0;
    for (const msg of list) {
      if (existingSet.has(`${msg.sender}\0${msg.textKey}`)) skip++;
      else break;
    }

    // Show only remaining (not yet shown) messages
    for (let i = skip; i < list.length; i++) {
      const result = await messageHandler.handler(ctx, {
        ...list[i],
        type: 'message',
        typingDelay: step.typingDelay || list[i].typingDelay
      });
      if (result === false) return false;
    }
    return true;
  }
};
