/**
 * GameEngine — top-level orchestrator for starting, resuming, and resetting the game.
 *
 * Coordinates Store, DayRunner, persistence, and UI.
 */
import { GAME_SCRIPT } from '../data/story/index.js';
import {
  beginSession, hasActiveSession, isSessionCurrent,
  pauseSession, resumeSession, cancelSession, createSessionAwaiter
} from './GameLoop.js';
import { DayRunner } from './DayRunner.js';
import { StepRunner } from './StepRunner.js';
import { registerCheck, clearCustomChecks } from '../state/ConditionEngine.js';
import { queueSave, loadGameIntoStore, deleteSave, setSession, getSession, resetSession } from '../state/persistence.js';
import { defaultGameState } from '../state/defaults.js';
import { getSDK } from './sdk.js';

export class GameEngine {
  constructor(store, bus, audio, t) {
    this._store = store;
    this._bus = bus;
    this._audio = audio;
    this._t = t;
    this._stepRunner = new StepRunner();

    // Create DayRunner once buildUi exposed
    this._dayRunner = null;
    this._uiInterface = null;

    // Subscribe store changes → auto-save
    this._unsubscribe = this._store.subscribe(() => {
      queueSave(this._store);
    });
  }

  /** Register all step type handlers. */
  registerStepHandlers(modules) {
    this._stepRunner.registerAll(modules);
  }

  /** Register custom condition checks. */
  registerConditionCheck(id, fn) {
    registerCheck(id, fn);
  }

  /** Build UI references for the day runner context. */
  buildUi(uiInterface) {
    this._uiInterface = uiInterface;
    this._dayRunner = new DayRunner(
      this._stepRunner,
      this._store,
      this._bus,
      uiInterface,
      this._audio,
      this._t,
      getSDK
    );
  }

  /** Start or resume the game. */
  async start(storyId = 'teacher') {
    if (this._uiInterface) this._uiInterface.updateCoreStatsUI();

    if (hasActiveSession()) {
      resumeSession();
      return;
    }

    const sessionId = beginSession();
    const wait = createSessionAwaiter(sessionId);

    if (storyId === 'teacher') {
      await this._loadOrStart(sessionId, wait);
    }
  }

  async _loadOrStart(sessionId, wait) {
    const hasSave = await loadGameIntoStore(this._store);
    if (!isSessionCurrent(sessionId)) return;

    if (this._uiInterface) this._uiInterface.updateCoreStatsUI();
    const state = this._store.getState();

    // Render existing messages if any
    if (state.messages.length > 0) {
      if (this._uiInterface) this._uiInterface.renderAllMessages(state.messages);
    }

    if (hasSave && !state.flags.gameEnded) {
      // Resume from saved day
      resetSession();
      await this._runCurrentDay(state.currentDay, sessionId, wait);
    } else {
      // New game — preserve achievements from previous session if any
      const achievements = this._store.getState().achievements || [];
      resetSession();
      this._store.setState({ ...defaultGameState, version: defaultGameState.version, achievements });
      // Do NOT save after reset — clean slate
      this._bus.emit('game:started');
      await this._runCurrentDay('day1', sessionId, wait);
    }
  }

  async _runCurrentDay(dayKey, sessionId, wait) {
    if (!this._dayRunner) return;

    const result = await this._dayRunner.runDay(
      dayKey,
      getSession,   // pass function reference, not snapshot
      setSession,
      wait
    );

    if (result && result.type === 'goto_day') {
      // Direct jump from goto step
      this._store.setState({ currentDay: result.day });
      await this._runCurrentDay(result.day, sessionId, wait);
    } else if (result === 'completed') {
      // Day completed normally with no goto — end the game
      this._store.setState({
        flags: { ...this._store.getState().flags, gameEnded: true }
      });
    } else if (result === 'not_found') {
      // Day data not found → end game
      const endDay = GAME_SCRIPT[dayKey];
      if (endDay && endDay.finalMessage) {
        if (this._uiInterface) this._uiInterface.renderFinalScreen(endDay.finalMessage);
      } else {
        if (this._uiInterface) this._uiInterface.renderFinalScreen([{ sender: 'system', textKey: 'game.ended' }]);
      }
      this._store.setState({
        flags: { ...this._store.getState().flags, gameEnded: true }
      });
    }
  }

  /**
   * Reset all progress and start fresh.
   * @param {boolean} [preserveAchievements=false] - If true, player achievements are kept.
   */
  async reset(preserveAchievements = false) {
    let savedAchievements = [];
    if (preserveAchievements) {
      savedAchievements = this._store.getState().achievements || [];
    }
    cancelSession();
    this._store.reset();
    if (preserveAchievements && savedAchievements.length > 0) {
      this._store.setState({ achievements: savedAchievements });
    }
    deleteSave();
    if (this._uiInterface) this._uiInterface.clearMessages();
    this._bus.emit('game:reset');
  }
  /** Pause the current game session. */
  pause() {
    pauseSession();
  }

  /** Resume the current game session. */
  resume() {
    resumeSession();
  }

  /** Clean up subscriptions. */
  destroy() {
    if (this._unsubscribe) this._unsubscribe();
    cancelSession();
    clearCustomChecks();
  }
}
