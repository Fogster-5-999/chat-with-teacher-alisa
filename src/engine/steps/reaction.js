/**
 * reaction — same as message but with shorter typing delay.
 *
 * Step format:
 *   { type: 'reaction', sender: 'alisa', textKey: '...' }
 */
import messageHandler from './message.js';

export default {
  type: 'reaction',
  async handler(ctx, step) {
    // reactions have shorter typing delays (1-3s vs 3-6s)
    return messageHandler.handler(ctx, {
      ...step,
      type: 'message',
      typingDelay: step.typingDelay || [1000, 3000]
    });
  }
};
