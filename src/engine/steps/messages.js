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
    for (const msgStep of list) {
      const result = await messageHandler.handler(ctx, {
        ...msgStep,
        type: 'message',
        typingDelay: step.typingDelay || msgStep.typingDelay
      });
      if (result === false) return false;
    }
    return true;
  }
};
