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
    const dates = state.dates;
    let timestamp;
    if (dates.currentDate && dates.currentTime) {
      const t = new Date(dates.currentTime);
      t.setMinutes(t.getMinutes() + Math.floor(Math.random() * 5) + 1);
      timestamp = t.toISOString();
    } else {
      timestamp = new Date().toISOString();
    }

    const msg = {
      sender: step.sender,
      textKey: step.textKey,
      isHtml: !!step.isHtml,
      timestamp
    };

    store.setState({
      messages: [...state.messages, msg],
      dates: { ...dates, currentTime: timestamp }
    });

    ui.renderMessage(msg);
    bus.emit('message:sent', msg);

    if (step.sender === 'alisa') {
      ctx.audio.playNotification();
    }

    return true;
  }
};
