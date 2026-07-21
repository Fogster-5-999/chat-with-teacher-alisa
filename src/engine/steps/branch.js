/**
 * branch — route execution based on which option was chosen.
 * Consumes session.pendingChoice set by a preceding choice step.
 *
 * Step format:
 *   { type: 'branch', onChoice: 'mainChoice', branches: {
 *     'opt1': [ ...steps... ],
 *     'opt2': [ ...steps... ],
 *     '_default': [ ...steps... ]
 *   }}
 *
 * onChoice is optional (used for validation/logging only).
 *
 * The branch step runs the DayRunner's runSteps internally.
 */
export default {
  type: 'branch',
  async handler(ctx, step) {
    const { store, session, setSession } = ctx;
    let chosenId = session.pendingChoice;

    // Fallback to persisted dayStates.selectedOption (for resume after reload)
    if (!chosenId) {
      const state = store.getState();
      const dayState = state.dayStates[state.currentDay];
      if (dayState && dayState.selectedOption) {
        chosenId = dayState.selectedOption;
      }
    }

    if (!chosenId) {
      // No choice made yet — try default branch
      const defaultBranch = step.branches['_default'];
      if (defaultBranch) {
        return ctx.runSteps(defaultBranch, ctx);
      }
      return true; // nothing to do
    }

    // Clear pending choice
    setSession({ pendingChoice: null });

    // Find matching branch
    const branchSteps = step.branches[chosenId];
    if (branchSteps) {
      // Merge reactions/branch for this option inline with runSteps
      return ctx.runSteps(branchSteps, ctx);
    }

    // Try default
    const defaultBranch = step.branches['_default'];
    if (defaultBranch) {
      return ctx.runSteps(defaultBranch, ctx);
    }

    return true;
  }
};
