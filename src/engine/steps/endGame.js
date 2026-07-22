/**
 * endGame — display final messages and restart button.
 *
 * Step format:
 *   { type: 'endGame', messages: [
 *     { sender: 'system', textKey: 'game.over' }
 *   ]}
 */
export default {
  type: 'endGame',
  async handler(ctx, step) {
    const { store, ui, bus } = ctx;
    const state = store.getState();

    // Set gameEnded flag
    store.setState({
      flags: { ...state.flags, gameEnded: true }
    });

    // Render final messages (resolve template vars)
    const finalMsgs = (step.messages || []).map(msg => ({
      sender: 'system',
      text: (msg.textKey || msg.text || '')
        .replace(/\{\{success\}\}/g, state.stats.success)
        .replace(/\{\{romance\}\}/g, state.stats.romance)
        .replace(/\{\{humor\}\}/g, state.stats.humor)
    }));

    ui.renderFinalScreen(finalMsgs);

    // Add restart button
    const optsEl = document.getElementById('options');
    if (optsEl) {
      optsEl.innerHTML = '';
      const restartBtn = document.createElement('button');
      restartBtn.className = 'option-btn';
      restartBtn.textContent = ctx.t('game.restart');
      restartBtn.addEventListener('click', () => {
        bus.emit('game:restart');
      });
      optsEl.appendChild(restartBtn);
      // Force reflow so slide-up animation plays from collapsed state
      void optsEl.offsetHeight;
      optsEl.classList.add('visible');
    }

    bus.emit('game:ended', state);

    return true;
  }
};
