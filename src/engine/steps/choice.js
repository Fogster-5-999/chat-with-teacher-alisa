/**
 * choice — display options and wait for player selection.
 * Stores the choice result in session.pendingChoice.
 *
 * Step format:
 *   { type: 'choice', id: 'mainChoice', options: [
 *     { id: 'opt1', labelKey: '...', hidden: false, cost: 0 },
 *     { id: 'opt2', labelKey: '...', hidden: true, cost: 2 }
 *   ]}
 */
export default {
  type: 'choice',
  async handler(ctx, step) {
    const { store, session, setSession, ui, bus, wait } = ctx;

    // Resolve hidden/cost based on current state
    const resolvedOptions = step.options.map(opt => ({
      ...opt,
      // Resolve hidden: could be a condition check
      _isHidden: opt.hidden === true
    }));

    // Show options and wait for choice
    const choice = await new Promise(resolve => {
      ui.showOptions(resolvedOptions, (optionId, optionLabel) => {
        resolve({ id: optionId, label: optionLabel });
      });
    });

    // Read fresh state after async gap
    const state = store.getState();

    // Player's choice message
    if (!step.time) {
      console.warn(`choice: no time for "${step.id}", using day start`);
    }
    const timestamp = ctx.resolveTime(step.time);

    const playerMsg = {
      sender: 'player',
      textKey: choice.id,
      timestamp
    };

    store.setState({
      messages: [...state.messages, playerMsg]
    });

    ui.renderMessage(playerMsg);
    bus.emit('choice:made', { choiceId: choice.id, optionId: choice.id });

    // Store pending choice for branch step to consume
    setSession({ pendingChoice: choice.id });

    // Persist selected option in dayStates for resume support
    const dayKey = state.currentDay;
    const dayStates = { ...state.dayStates };
    dayStates[dayKey] = { ...(dayStates[dayKey] || {}), selectedOption: choice.id };
    store.setState({ dayStates });

    if (!await wait(1000)) return false;

    // Alisa occasionally reacts to the player's last message (25% chance)
    if (Math.random() < 0.25) {
      const st = store.getState();
      const msgs = st.messages;
      if (msgs.length > 0) {
        store.setMessages([...msgs.slice(0, -1), { ...msgs[msgs.length - 1], liked: true }]);
      }
      ui.likeLastMessage();
    }

    return true;
  }
};
