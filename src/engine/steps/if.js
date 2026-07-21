/**
 * if — conditional branching based on data-driven conditions.
 *
 * Step format:
 *   { type: 'if', check: { stat: 'romance', gt: 10 },
 *     then: [ ...steps... ],
 *     else: [ ...steps... ] }
 *
 * check uses ConditionEngine DSL (no inline functions).
 */
import { evaluate } from '../../state/ConditionEngine.js';

export default {
  type: 'if',
  async handler(ctx, step) {
    const { store } = ctx;
    const state = store.getState();
    const conditionMet = evaluate(step.check, state);

    if (conditionMet && step.then) {
      const result = await ctx.runSteps(step.then, ctx);
      if (result === 'GOTO') return 'GOTO';
      return result;
    } else if (!conditionMet && step.else) {
      const result = await ctx.runSteps(step.else, ctx);
      if (result === 'GOTO') return 'GOTO';
      return result;
    }
    return true;
  }
};
