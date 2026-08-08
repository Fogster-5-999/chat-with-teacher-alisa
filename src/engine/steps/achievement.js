/**
 * achievement — check and unlock achievements based on current state.
 *
 * Step format:
 *   { type: 'achievement' }
 *
 * Achievements are defined in GAME_SCRIPT.achievementsMeta.
 * Each meta entry has: id, name, icon, condition (data-driven).
 * The condition uses the ConditionEngine DSL.
 *
 * Also exports checkAchievements() for external trigger (photo unlock, etc.).
 */
import { GAME_SCRIPT } from '../../data/story/index.js';
import { evaluate } from '../../state/ConditionEngine.js';
import { t } from '../../data/translations.js';

/**
 * Check all achievement conditions against current state and unlock any that are met.
 * Can be called from step handler or from external events (photo unlock, game end, etc.).
 *
 * @param {object} store    - game store with getState/setState
 * @param {function} showNotif - (title, text, durationMs, icon) => void
 * @param {object} [bus]    - optional EventBus to emit achievements:changed
 */
export function checkAchievements(store, showNotif, bus) {
  const state = store.getState();
  const meta = GAME_SCRIPT.achievementsMeta || [];
  if (!meta.length) return;

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
      if (showNotif) {
        showNotif(
          t('achievement.title'),
          a.name?.ru || a.id,
          5000,
          a.icon || '🏆'
        );
      }
    }
  }

  if (changed) {
    store.setState({ achievements: newUnlocked });
    if (bus) bus.emit('achievements:changed', newUnlocked);
  }
}

export default {
  type: 'achievement',
  handler(ctx, step) {
    const { store, ui, bus } = ctx;
    checkAchievements(store, ui.showTopNotification, bus);
    return true;
  }
};
