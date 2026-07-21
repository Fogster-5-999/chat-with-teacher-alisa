/**
 * achievement — check and unlock achievements based on current state.
 *
 * Step format:
 *   { type: 'achievement' }
 *
 * Achievements are defined in GAME_SCRIPT.achievementsMeta.
 * Each meta entry has: id, name, icon, condition (data-driven).
 * The condition uses the ConditionEngine DSL.
 */
import { GAME_SCRIPT } from '../../data/story.js';
import { evaluate } from '../../state/ConditionEngine.js';

export default {
  type: 'achievement',
  handler(ctx, step) {
    const { store, ui, bus } = ctx;
    const state = store.getState();
    const meta = GAME_SCRIPT.achievementsMeta || [];
    if (!meta.length) return true;

    const unlocked = state.achievements || [];
    let changed = false;
    const newUnlocked = [...unlocked];

    for (const a of meta) {
      if (newUnlocked.includes(a.id)) continue;
      // Evaluate data-driven condition
      let meets = false;
      if (a.conditionData) {
        meets = evaluate(a.conditionData, state);
      } else if (typeof a.condition === 'function') {
        meets = a.condition(state);
      } else {
        meets = false;
      }

      if (meets) {
        newUnlocked.push(a.id);
        changed = true;
        ui.showTopNotification(
          ctx.t('achievement.title'),
          a.name?.ru || a.id,
          5000,
          a.icon || '🏆'
        );
      }
    }

    if (changed) {
      store.setState({ achievements: newUnlocked });
      bus.emit('achievements:changed', newUnlocked);
    }

    return true;
  }
};
