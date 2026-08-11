/**
 * Main entry point — wires Store, EventBus, GameEngine, and UI together.
 */
import { EventBus } from '../events/EventBus.js';
import { Store } from '../state/Store.js';
import { defaultGameState } from '../state/defaults.js';
import { GameEngine } from '../engine/GameEngine.js';
import { MAX_STATS } from '../data/config.js';
import { t } from '../data/translations.js';
import { initBootstrap } from './bootstrap.js';
import { applyTheme } from './theme.js';
import { applyLanguage } from './language.js';

// UI
import { showMenu } from '../ui/menu.js';
import {
  renderMessage, renderAllMessages, clearMessages,
  showTyping, hideTyping, showNetworkStatus, hideNetworkStatus,
  showOptions, showMiniTest, renderFinalScreen,
  showTopNotification, reRenderSavedOptions, updateCoreStatsUI
} from '../ui/components.js';

// Step handlers
import messageStep from '../engine/steps/message.js';
import messagesStep from '../engine/steps/messages.js';
import choiceStep from '../engine/steps/choice.js';
import branchStep from '../engine/steps/branch.js';
import reactionStep from '../engine/steps/reaction.js';
import statsStep from '../engine/steps/stats.js';
import flagsStep from '../engine/steps/flags.js';
import ifStep from '../engine/steps/if.js';
import labelStep from '../engine/steps/label.js';
import gotoStep from '../engine/steps/goto.js';
import photoStep from '../engine/steps/photo.js';
import voiceStep from '../engine/steps/voice.js';
import miniTestStep from '../engine/steps/miniTest.js';
import notificationStep from '../engine/steps/notification.js';
import achievementStep, { checkAchievements } from '../engine/steps/achievement.js';
import endGameStep from '../engine/steps/endGame.js';

// Module-level engine reference for restart etc.
let _engine = null;
export function getEngine() { return _engine; }
export function setEngine(e) { _engine = e; }

// ---- Initialize core systems ----
const bus = new EventBus();
const store = new Store(defaultGameState);

const audio = {
  _init: false,
  playNotification: () => {
    import('../engine/audio.js').then(mod => mod.playNotificationSound()).catch(() => {});
  }
};

const engine = new GameEngine(store, bus, audio, t);
setEngine(engine);

// Register all step handlers
engine.registerStepHandlers([
  messageStep, messagesStep, choiceStep, branchStep, reactionStep,
  statsStep, flagsStep, ifStep, labelStep, gotoStep,
  photoStep, voiceStep, miniTestStep, notificationStep, achievementStep, endGameStep
]);

// ---- UI Interface for engine ----
engine.buildUi({
  renderMessage,
  renderAllMessages,
  clearMessages,
  showTyping,
  hideTyping,
  showNetworkStatus,
  hideNetworkStatus,
  showOptions,
  showMiniTest,
  renderFinalScreen,
  showTopNotification,
  updateCoreStatsUI: () => {
    updateCoreStatsUI(store.getState(), MAX_STATS);
  }
});

// ---- EventBus wiring ----
bus.on('stats:changed', (stats) => {
  updateCoreStatsUI(store.getState(), MAX_STATS);
});

bus.on('game:restart', async () => {
  import('../engine/voicePlayer.js').then(({ stopVoice }) => stopVoice()).catch(() => {});
  clearMessages();
  await engine.reset(true);
  showMenu();
});

// ---- Photo unlock event ----
document.addEventListener('photo:unlocked', (e) => {
  const st = store.getState();
  const url = e.detail && e.detail.url;
  store.setState({
    flags: {
      ...st.flags,
      photoUnlocked: true,
      unlockedPhotos: {
        ...(st.flags.unlockedPhotos || {}),
        ...(url ? { [url]: true } : {})
      }
    },
    stats: { ...st.stats, romance: (st.stats.romance || 0) + 1 }
  });
  bus.emit('stats:changed', store.getState().stats);
  // Trigger achievement check so collector (and others) unlock immediately
  checkAchievements(store, showTopNotification, bus);
});

// ---- Voice unlock event ----
document.addEventListener('voice:unlocked', (e) => {
  const st = store.getState();
  const voiceId = e.detail && e.detail.voiceId;
  if (!voiceId) return;
  store.setState({
    flags: {
      ...st.flags,
      unlockedVoices: {
        ...(st.flags.unlockedVoices || {}),
        [voiceId]: true
      }
    },
    // Keep persisted messages in sync so the lock never returns after re-render
    messages: st.messages.map(m =>
      (m.type === 'voice' && m.voiceId === voiceId) ? { ...m, isLocked: false } : m
    )
  });
});

// ---- Language / Theme change handlers ----
document.addEventListener('language:changed', () => {
  applyLanguage();
  const state = store.getState();
  if (state.messages.length > 0) {
    renderAllMessages(state.messages);
    reRenderSavedOptions();
  }
});

document.addEventListener('theme:changed', () => {
  applyTheme();
});

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', async function() {
  await initBootstrap(engine, store);
});
