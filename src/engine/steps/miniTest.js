/**
 * miniTest — a mini quiz within the chat.
 *
 * Step format:
 *   { type: 'miniTest', id: 'day2_test',
 *     intro: 'test.intro',
 *     questions: [
 *       { id: 'q1', text: 'question.text', choices: ['A','B','C'], correct: 0 }
 *     ],
 *     onPerfect: [ ...steps... ],   // executed when all correct
 *     onFail: [ ...steps... ],      // executed when any wrong
 *     achievementId: 'day2_minitest_passed',
 *     successPoints: 3,
 *     successMessage: '...',
 *     failMessage: '...'
 *   }
 *
 * Shows 3 options: Take test / Decline / Skip via ad.
 * If declined: skips test, continues to next step.
 * If skipped via ad: counts as perfect if ad was shown.
 */
import { evaluate } from '../../state/ConditionEngine.js';

export default {
  type: 'miniTest',
  async handler(ctx, step) {
    const { store, ui, bus, wait, getSDK } = ctx;
    const state = store.getState();

    // Check if already completed this miniTest
    const miniKey = 'miniTest:' + step.id;
    if (state.flags[miniKey]) return true;

    // Show intro message from alisa
    const introMsg = {
      sender: 'alisa',
      textKey: step.intro,
      timestamp: new Date().toISOString()
    };
    store.setState({ messages: [...state.messages, introMsg] });
    ui.renderMessage(introMsg);

    // Pre-options
    const preOptions = [
      { id: 'take_test', labelKey: 'minitest.take' },
      { id: 'decline_test', labelKey: 'minitest.decline' },
      { id: 'skip_ad', labelKey: 'minitest.skip' }
    ];

    const choice = await new Promise(resolve => {
      ui.showOptions(preOptions, (optId) => resolve(optId));
    });

    if (choice === 'decline_test') {
      store.setState({
        flags: { ...store.getState().flags, [miniKey]: true }
      });
      if (!await wait(700)) return false;
      return true;
    }

    if (choice === 'take_test') {
      const correctCount = await ui.showMiniTest(step, () => {});
      const totalQuestions = (step.questions || []).length;
      const allCorrect = correctCount === totalQuestions;

      // Set flag
      store.setState({
        flags: { ...store.getState().flags, [miniKey]: true }
      });

      if (allCorrect) {
        // Set achievement flag for passing the test
        store.setState({
          flags: { ...store.getState().flags, ['miniTest:' + step.id + ':passed']: true }
        });
        // Apply success points
        if (step.successPoints) {
          const newStats = { ...store.getState().stats };
          if (step.statKey) {
            newStats[step.statKey] = (newStats[step.statKey] || 0) + step.successPoints;
          } else {
            newStats.success = (newStats.success || 0) + step.successPoints;
          }
          store.setState({ stats: newStats });
          bus.emit('stats:changed', newStats);
        }
        ui.showTopNotification(
          ctx.t('notif.alisa'),
          ctx.t(step.successMessage || ''),
          5000
        );
        // Run onPerfect steps if provided
        if (step.onPerfect) {
          return ctx.runSteps(step.onPerfect, ctx);
        }
      } else {
        ui.showTopNotification(
          ctx.t('notif.alisa'),
          ctx.t(step.failMessage || ''),
          5000
        );
        // Run onFail steps if provided
        if (step.onFail) {
          return ctx.runSteps(step.onFail, ctx);
        }
      }

      if (!await wait(900)) return false;
      return true;
    }

    if (choice === 'skip_ad') {
      // Show ad — in emulation, just returns wasShown=true immediately
      const sdk = getSDK();
      const wasShown = await new Promise(resolve => {
        if (sdk && sdk.adv) {
          sdk.adv.showFullscreenAdv({
            callbacks: {
              onClose: (shown) => resolve(!!shown)
            }
          });
        } else {
          resolve(true); // emulation: assume ad was shown
        }
      });

      store.setState({
        flags: { ...store.getState().flags, [miniKey]: true }
      });

      if (wasShown) {
        // Set achievement flag for passing the test via ad
        store.setState({
          flags: { ...store.getState().flags, ['miniTest:' + step.id + ':passed']: true }
        });
        if (step.successPoints) {
          const newStats = { ...store.getState().stats };
          if (step.statKey) {
            newStats[step.statKey] = (newStats[step.statKey] || 0) + step.successPoints;
          } else {
            newStats.success = (newStats.success || 0) + step.successPoints;
          }
          store.setState({ stats: newStats });
          bus.emit('stats:changed', newStats);
        }
        ui.showTopNotification(
          ctx.t('notif.alisa'),
          ctx.t(step.successMessage || ''),
          5000
        );
        if (step.onPerfect) {
          return ctx.runSteps(step.onPerfect, ctx);
        }
      }

      if (!await wait(900)) return false;
      return true;
    }

    return true;
  }
};
