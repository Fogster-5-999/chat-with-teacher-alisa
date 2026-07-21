/**
 * App entry point — wires Store, EventBus, GameEngine, and UI together.
 */
import { initSDK, getSDK } from './engine/sdk.js';
import { initAudio, unlockAudio } from './engine/audio.js';
import { EventBus } from './events/EventBus.js';
import { Store } from './state/Store.js';
import { defaultGameState } from './state/defaults.js';
import { GameEngine } from './engine/GameEngine.js';

// Module-level reference for restart etc.
let _engine = null;
export function getEngine() { return _engine; }
export function setEngine(e) { _engine = e; }
import { loadConfig } from './data/config.js';
import { t, setLanguage } from './data/translations.js';

// UI
import { showMenu, hideMenu, initMenu } from './ui/menu.js';
import { initSettings, openSettings } from './ui/settings.js';
import { initAchievements, setStore as setAchievementStore } from './ui/achievements.js';
import { initLightbox, openLightbox } from './ui/lightbox.js';
import {
  initUI, renderMessage, renderAllMessages, clearMessages, hideOptions,
  showTyping, hideTyping, showNetworkStatus, hideNetworkStatus,
  showOptions, showMiniTest, renderFinalScreen,
  showTopNotification, addDayDivider, reRenderSavedOptions
} from './ui/components.js';

// Step handlers
import messageStep from './engine/steps/message.js';
import messagesStep from './engine/steps/messages.js';
import choiceStep from './engine/steps/choice.js';
import branchStep from './engine/steps/branch.js';
import reactionStep from './engine/steps/reaction.js';
import statsStep from './engine/steps/stats.js';
import flagsStep from './engine/steps/flags.js';
import ifStep from './engine/steps/if.js';
import labelStep from './engine/steps/label.js';
import gotoStep from './engine/steps/goto.js';
import photoStep from './engine/steps/photo.js';
import miniTestStep from './engine/steps/miniTest.js';
import notificationStep from './engine/steps/notification.js';
import achievementStep from './engine/steps/achievement.js';
import endGameStep from './engine/steps/endGame.js';

import { MAX_STATS } from './data/config.js';

// ---- Initialize core systems ----
const bus = new EventBus();
const store = new Store(defaultGameState);

const audio = {
  _init: false,
  playNotification: () => {
    import('./engine/audio.js').then(mod => mod.playNotificationSound()).catch(() => {});
  }
};

const engine = new GameEngine(store, bus, audio, t);
setEngine(engine);

// Register all step handlers
engine.registerStepHandlers([
  messageStep, messagesStep, choiceStep, branchStep, reactionStep,
  statsStep, flagsStep, ifStep, labelStep, gotoStep,
  photoStep, miniTestStep, notificationStep, achievementStep, endGameStep
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
  addDayDivider,
  updateCoreStatsUI: () => {
    const state = store.getState();
    const stats = state.stats;
    const statMapping = { grades: 'success', romance: 'romance', humor: 'humor' };
    for (const [uiKey, stateKey] of Object.entries(statMapping)) {
      const value = stats[stateKey] || 0;
      const valEl = document.getElementById('val-' + uiKey);
      if (valEl) valEl.textContent = value;
      const fillEl = document.getElementById('fill-' + uiKey);
      if (fillEl) {
        const maxVal = MAX_STATS[uiKey] || 50;
        const percent = Math.min(100, Math.max(0, (value / maxVal) * 100));
        fillEl.style.width = percent + '%';
      }
    }
  }
});

// ---- EventBus wiring ----
bus.on('stats:changed', (stats) => {
  const statMapping = { grades: 'success', romance: 'romance', humor: 'humor' };
  for (const [uiKey, stateKey] of Object.entries(statMapping)) {
    const value = stats[stateKey] || 0;
    const valEl = document.getElementById('val-' + uiKey);
    if (valEl) valEl.textContent = value;
    const fillEl = document.getElementById('fill-' + uiKey);
    if (fillEl) {
      const maxVal = MAX_STATS[uiKey] || 50;
      const percent = Math.min(100, Math.max(0, (value / maxVal) * 100));
      fillEl.style.width = percent + '%';
    }
  }
});

bus.on('game:restart', async () => {
  clearMessages();
  await engine.reset();
  showMenu();
});

// ---- Photo unlock event ----
document.addEventListener('photo:unlocked', (e) => {
  const st = store.getState();
  store.setState({
    flags: { ...st.flags, photoUnlocked: true },
    stats: { ...st.stats, romance: (st.stats.romance || 0) + 1 }
  });
  bus.emit('stats:changed', store.getState().stats);
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
  loadConfig();
  applyTheme();
  applyLanguage();
  initUI();

  await initSDK();
  initAudio();

  initMenu(engine);
  initSettings();
  initAchievements();
  initLightbox();
  setAchievementStore(store);

  // ---- Header avatar ----
  const headerAvatarImg = document.getElementById('avatar-img');
  if (headerAvatarImg) {
    headerAvatarImg.src = 'res/ava.png';
    headerAvatarImg.classList.add('has-photo');
    headerAvatarImg.style.display = 'block';
  }
  const profileAvatarImg = document.getElementById('profile-avatar-img');
  if (profileAvatarImg) {
    profileAvatarImg.src = 'res/ava.png';
    profileAvatarImg.classList.add('has-photo');
    profileAvatarImg.style.display = 'block';
  }
  const avatarEmoji = document.getElementById('avatar-emoji');
  if (avatarEmoji) avatarEmoji.classList.add('hidden');
  const profileAvatarEmoji = document.getElementById('profile-avatar-emoji');
  if (profileAvatarEmoji) profileAvatarEmoji.classList.add('hidden');

  // ---- Avatar click ----
  const avatar = document.getElementById('avatar');
  if (avatar) {
    avatar.addEventListener('click', () => {
      const profileModal = document.getElementById('profile-modal');
      if (profileModal) profileModal.classList.add('active');
    });
  }

  // ---- Profile ----
  const profileAvatarLarge = document.getElementById('profile-avatar-large');
  if (profileAvatarLarge) {
    profileAvatarLarge.addEventListener('click', () => {
      const img = document.getElementById('profile-avatar-img');
      if (img && img.src) openLightbox(img.src);
    });
  }
  const closeProfileBtn = document.getElementById('close-profile');
  if (closeProfileBtn) {
    closeProfileBtn.addEventListener('click', () => {
      const profileModal = document.getElementById('profile-modal');
      if (profileModal) profileModal.classList.remove('active');
    });
  }

  // ---- Back button ----
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', async () => {
      engine.pause();
      hideOptions();
      const profileModal = document.getElementById('profile-modal');
      if (profileModal) profileModal.classList.remove('active');
      showMenu();
    });
  }

  // ---- Settings ----
  const settingsBtn = document.getElementById('settings-btn-game');
  if (settingsBtn) settingsBtn.addEventListener('click', openSettings);

  // ---- Music toggle ----
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      import('./engine/audio.js').then(mod => mod.toggleMusic());
    });
  }

  // ---- Audio unlock ----
  document.addEventListener('click', () => { unlockAudio(); }, { once: false });

  // ---- Show menu ----
  showMenu();
});

// ---- Theme helper ----
function applyTheme() {
  const config = loadConfig();
  const body = document.body;
  const isLight = config.theme === 'light';
  if (isLight) body.classList.add('light-theme');
  else body.classList.remove('light-theme');

  const heroAvatar = document.getElementById('menu-hero-avatar');
  if (heroAvatar) {
    heroAvatar.style.backgroundImage = isLight ? 'url(res/ava_light.png)' : 'url(res/ava.png)';
  }
}

// ---- Language helper ----
function applyLanguage() {
  const config = loadConfig();
  const lang = config.language;
  setLanguage(lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  const langLabel = document.getElementById('current-lang-label');
  if (langLabel) langLabel.textContent = lang === 'ru' ? 'RU' : 'EN';
  const contactName = document.getElementById('contact-name');
  if (contactName) contactName.textContent = t('profile.name');
  const headerStatus = document.getElementById('status');
  if (headerStatus) headerStatus.textContent = t('profile.status');
  const profileName = document.getElementById('profile-name');
  if (profileName) profileName.textContent = t('profile.name');
  const profileStatus = document.getElementById('profile-status');
  if (profileStatus) profileStatus.textContent = t('profile.status');
  const profileTitle = document.getElementById('profile-header-title');
  if (profileTitle) profileTitle.textContent = t('profile.title');

  const app = document.getElementById('app');
  app.classList.add('lang-flash');
  setTimeout(() => app.classList.remove('lang-flash'), 300);
}
