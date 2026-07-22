/**
 * DayRunner — read steps for a day, execute in order, handle goto/labels.
 *
 * Execution flow:
 * 1. Build label map from steps (label name → step index).
 * 2. Iterate steps by index.
 * 3. For each step: evaluate `if` condition → skip if false.
 * 4. Execute handler via StepRunner.
 * 5. If handler returns 'GOTO', resolve pendingGoto (jump label or next day).
 * 6. Save dayStates[dayKey].stepIndex after each step.
 *
 * Context passed to each step handler:
 *   { store, setStore, session, setSession, bus, ui, wait, audio, runSteps, t, getSDK }
 */
import { GAME_SCRIPT } from '../data/story.js';
import { evaluate } from '../state/ConditionEngine.js';

export class DayRunner {
  constructor(stepRunner, store, bus, ui, audio, t, getSDK) {
    this._stepRunner = stepRunner;
    this._store = store;
    this._bus = bus;
    this._ui = ui;
    this._audio = audio;
    this._t = t;
    this._getSDK = getSDK;

    this._getSession = null;
    this._setSession = null;
  }

  /**
   * Execute a day's steps.
   * @param {string} dayKey - e.g. 'day1'
   * @param {function} getSession - returns current session snapshot
   * @param {function} setSession - update session
   * @param {function} wait - session-aware sleep function
   * @returns {Promise<string|object>} 'completed', {type:'goto_day',day}, or 'cancelled'
   */
  async runDay(dayKey, getSession, setSession, wait) {
    this._getSession = getSession;
    this._setSession = setSession;

    const dayData = GAME_SCRIPT[dayKey];
    if (!dayData || !dayData.steps) {
      return 'not_found'; // day not found, game over
    }

    const steps = dayData.steps;

    // Build the context for step handlers
    const ctx = this._buildContext(wait);

    // Determine start index (from session or saved dayStates)
    const state = this._store.getState();
    const dayState = state.dayStates[dayKey] || {};
    let startIndex = dayState.stepIndex || 0;

    // Handle resume: day has any phase = already started (prevents day transition replay)
    const isResuming = dayState.phase !== undefined;

    // Day transition for new days
    if (!isResuming) {
      const handleDayStart = await this._handleDayStart(dayKey, dayData, wait);
      if (handleDayStart === false) return 'cancelled';
    }

    // Main step execution loop
    for (let i = startIndex; i < steps.length; i++) {
      if (!this._getSession().pendingGoto) {
        // Check session cancelled
        const active = await wait(0);
        if (!active) return 'cancelled';
      }

      const step = steps[i];

      // Evaluate step.if condition
      if (step.if) {
        const meets = evaluate(step.if, this._store.getState());
        if (!meets) {
          // Save progress even for skipped steps
          this._saveDayProgress(dayKey, i + 1);
          continue;
        }
      }

      // Save progress before executing step — ensures day doesn't restart if F5 during long step
      this._saveDayProgress(dayKey, i, 'in_progress');

      // Get handler and execute
      try {
        const handler = this._stepRunner.get(step.type);
        let result;

        if (typeof handler === 'function') {
          result = await handler(ctx, step);
        } else if (typeof handler.handler === 'function') {
          result = await handler.handler(ctx, step);
        } else {
          console.warn(`Invalid handler for step type "${step.type}"`);
          continue;
        }

        // Check for goto signal
        if (result === 'GOTO') {
          const pending = this._getSession().pendingGoto;
          if (pending) {
            if (pending.day && pending.day !== dayKey) {
              // Jump to another day
              this._saveDayProgress(dayKey, i + 1, 'completed');
              this._setSession({ pendingGoto: null });
              return { type: 'goto_day', day: pending.day };
            }
            if (pending.label) {
              // Jump to label within current day
              const labelMap = this._buildLabelMap(steps);
              const targetIndex = labelMap[pending.label];
              if (targetIndex !== undefined) {
                this._setSession({ pendingGoto: null });
                i = targetIndex; // will be incremented by loop
                continue;
              } else {
                console.warn(`Label "${pending.label}" not found in ${dayKey}`);
              }
            }
            // Clear and continue (next steps will execute)
            this._setSession({ pendingGoto: null });
          }
        }

        // Save progress after each step
        this._saveDayProgress(dayKey, i + 1);

      } catch (e) {
        console.error(`Error executing step ${step.type} at index ${i} in ${dayKey}:`, e);
        // Still save progress to allow recovery
        this._saveDayProgress(dayKey, i + 1);
      }
    }

    // Day completed
    this._saveDayProgress(dayKey, steps.length, 'completed');
    return 'completed';
  }

  /**
   * Execute an arbitrary list of sub-steps (used by branch, if, etc.)
   */
  async runSteps(subSteps, ctx) {
    if (!subSteps || !subSteps.length) return true;

    for (const step of subSteps) {
      // Evaluate step.if condition
      if (step.if) {
        const meets = evaluate(step.if, this._store.getState());
        if (!meets) continue;
      }

      try {
        const handler = this._stepRunner.get(step.type);
        let result;
        if (typeof handler === 'function') {
          result = await handler(ctx, step);
        } else if (typeof handler.handler === 'function') {
          result = await handler.handler(ctx, step);
        }
        if (result === 'GOTO') return 'GOTO';
      } catch (e) {
        console.error(`Error in sub-step ${step.type}:`, e);
      }
    }
    return true;
  }

  _buildContext(wait) {
    const self = this;
    return {
      store: this._store,
      setStore: (patch) => this._store.setState(patch),
      // Provide a live session snapshot each time it's read
      get session() {
        return self._getSession ? self._getSession() : {};
      },
      set session(val) {
        // no-op; use setSession instead
      },
      setSession: this._setSession,
      bus: this._bus,
      ui: this._ui,
      wait,
      audio: this._audio,
      t: this._t,
      getSDK: this._getSDK,
      runSteps: (steps, ctx) => this.runSteps(steps, ctx)
    };
  }

  _buildLabelMap(steps) {
    const map = {};
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].type === 'label' && steps[i].name) {
        map[steps[i].name] = i;
      }
    }
    return map;
  }

  _saveDayProgress(dayKey, stepIndex, phase) {
    const state = this._store.getState();
    const dayStates = { ...state.dayStates };
    dayStates[dayKey] = {
      ...(dayStates[dayKey] || {}),
      stepIndex,
      phase: phase || 'in_progress'
    };
    this._store.setState({ dayStates });
  }

  async _handleDayStart(dayKey, dayData, wait) {
    const state = this._store.getState();
    const dates = state.dates || {};

    // Set day start time
    let newDate;
    if (dayData.start) {
      if (dayData.start.afterDay) {
        // Auto-advance by 1 day from previous date
        if (dates.currentDate) {
          newDate = new Date(dates.currentDate);
          newDate.setDate(newDate.getDate() + 1);
          newDate.setHours(
            dayData.start.hour || 20,
            dayData.start.minute || 0,
            0, 0
          );
        } else {
          newDate = new Date();
          newDate.setHours(20, 0, 0, 0);
        }
      } else {
        newDate = new Date();
        if (dayData.start.hour !== undefined) {
          newDate.setHours(dayData.start.hour, dayData.start.minute || 0, 0, 0);
        }
      }
    } else {
      // Default: advance from previous date
      if (dates.currentDate) {
        newDate = new Date(dates.currentDate);
        newDate.setDate(newDate.getDate() + 1);
        const hours = Math.floor(Math.random() * 16) + 8; // 8-23
        newDate.setHours(hours, Math.floor(Math.random() * 60), 0, 0);
      } else {
        newDate = new Date();
        newDate.setHours(20, 0, 0, 0);
      }
    }

    this._store.setState({
      dates: { currentDate: newDate.toISOString(), currentTime: newDate.toISOString() }
    });

    // Show network status
    this._ui.showNetworkStatus();
    const initialDelay = Math.floor(Math.random() * 3000) + 4000;
    if (!await wait(initialDelay)) return false;
    this._ui.hideNetworkStatus();

    // Show day transition
    if (!await this._showDayTransition(dayKey, wait)) return false;

    // Day divider
    this._ui.addDayDivider(newDate);

    // Mark day as started — prevents day transition replay on page reload
    this._saveDayProgress(dayKey, 0, 'started');

    return true;
  }

  async _showDayTransition(dayKey, wait) {
    const overlay = document.getElementById('day-transition-overlay');
    const label = document.getElementById('day-transition-label');
    if (!overlay || !label) return true;

    const num = dayKey.replace('day', '').replace(/_.*$/, '');
    const title = `${this._t('day.new')} ${num}`;
    label.textContent = title;
    overlay.classList.add('active');
    if (!await wait(1800)) return false;
    overlay.classList.remove('active');
    return wait(400);
  }
}
