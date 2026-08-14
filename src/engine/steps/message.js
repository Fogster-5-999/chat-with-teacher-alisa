/**
 * message — display a single chat message with typing delay + notification.
 *
 * Step format:
 *   { type: 'message', sender: 'alisa', textKey: 'hello',
 *     typingDelay: [3000, 6000], isHtml: false }
 */
export default {
  type: 'message',
  async handler(ctx, step) {
    const { store, ui, bus, wait } = ctx;
    const [minDelay, maxDelay] = step.typingDelay || [3000, 6000];
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    ui.showTyping();
    if (!await wait(delay)) return false;
    ui.hideTyping();

    const state = store.getState();
    if (step.sender !== 'system' && !step.time) {
      console.warn(`message: no time for "${step.textKey}", using day start`);
    }
    const timestamp = ctx.resolveTime(step.time);

    const msg = {
      sender: step.sender,
      textKey: step.textKey,
      isHtml: !!step.isHtml,
      timestamp
    };

    store.setState({
      messages: [...state.messages, msg]
    });

    ui.renderMessage(msg);
    bus.emit('message:sent', msg);

    if (step.sender === 'alisa') {
      ctx.audio.playNotification();
    }

    return true;
  }
};
