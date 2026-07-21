/**
 * Data-driven condition evaluator.
 *
 * Condition DSL (NO inline functions — pure data):
 *
 *   { flag: 'x', eq: true }          // flag x === true
 *   { flag: 'x', ne: false }         // flag x !== false
 *   { stat: 'romance', gt: 10 }      // stats.romance > 10
 *   { stat: 'romance', gte: 10 }     // stats.romance >= 10
 *   { stat: 'romance', lt: 5 }       // stats.romance < 5
 *   { stat: 'romance', lte: 5 }      // stats.romance <= 5
 *   { stat: 'romance', eq: 10 }      // stats.romance === 10
 *   { hasFlag: 'x' }                 // flags.x is truthy
 *   { hasAchievement: 'id' }         // achievements.includes('id')
 *   { hasMessage: { sender: 'alisa' } }  // messages has a match
 *   { and: [cond1, cond2] }
 *   { or: [cond1, cond2] }
 *   { not: cond }
 *   { customCheck: 'id' }            // registered escape hatch
 *   { always: true }                 // always true
 *   { always: false }                // always false
 */

const customChecks = new Map();

export function registerCheck(id, fn) {
  customChecks.set(id, fn);
}

export function evaluate(condition, state) {
  if (!condition || typeof condition !== 'object') return true;

  // Composite
  if (condition.and) {
    return condition.and.every(c => evaluate(c, state));
  }
  if (condition.or) {
    return condition.or.some(c => evaluate(c, state));
  }
  if (condition.not) {
    return !evaluate(condition.not, state);
  }

  // Primitives
  if ('always' in condition) return !!condition.always;
  if ('hasFlag' in condition) return !!state.flags[condition.hasFlag];
  if ('hasAchievement' in condition) {
    return Array.isArray(state.achievements) && state.achievements.includes(condition.hasAchievement);
  }
  if ('hasMessage' in condition) {
    if (!Array.isArray(state.messages)) return false;
    const m = condition.hasMessage;
    return state.messages.some(msg => {
      for (const k of Object.keys(m)) {
        if (msg[k] !== m[k]) return false;
      }
      return true;
    });
  }
  if ('customCheck' in condition) {
    const fn = customChecks.get(condition.customCheck);
    return fn ? fn(state) : false;
  }

  if ('flag' in condition) {
    const val = state.flags[condition.flag];
    if ('eq' in condition) return val === condition.eq;
    if ('ne' in condition) return val !== condition.ne;
    if ('truthy' in condition) return condition.truthy ? !!val : !val;
    return !!val; // default: truthy check
  }

  if ('stat' in condition) {
    const val = state.stats[condition.stat] ?? 0;
    if ('gt' in condition) return val > condition.gt;
    if ('gte' in condition) return val >= condition.gte;
    if ('lt' in condition) return val < condition.lt;
    if ('lte' in condition) return val <= condition.lte;
    if ('eq' in condition) return val === condition.eq;
    if ('ne' in condition) return val !== condition.ne;
    return val > 0; // default: positive check
  }

  return true;
}

export function clearCustomChecks() {
  customChecks.clear();
}
