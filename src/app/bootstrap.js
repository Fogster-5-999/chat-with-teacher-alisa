/**
 * Bootstrap — DOMContentLoaded initialization for the game UI.
 */
import { applyTheme } from './theme.js';
import { applyLanguage } from './language.js';
import { initAvatar } from './avatar.js';
import { initUI, hideOptions } from '../ui/components.js';
import { initMenu, showMenu } from '../ui/menu.js';
import { initSettings, openSettings } from '../ui/settings.js';
import { initLegal, showLegal, isLegalAccepted } from '../ui/legal.js';
import { initAchievements, setStore as setAchievementStore } from '../ui/achievements.js';
import { initLightbox } from '../ui/lightbox.js';
import { initSDK } from '../engine/sdk.js';
import { initAudio, unlockAudio } from '../engine/audio.js';
import { loadGameIntoStore } from '../state/persistence.js';
import { loadConfig } from '../data/config.js';

/**
 * Initialize the application when the DOM is ready.
 * @param {object} engine - GameEngine instance
 * @param {object} store - Store instance
 */
export async function initBootstrap(engine, store) {
  loadConfig();
  applyTheme();
  applyLanguage();
  initUI();

  await initSDK();
  initAudio();

  // Load saved data so menu reflects persisted state immediately
  await loadGameIntoStore(store);

  initMenu(engine);
  initSettings();
  initAchievements();
  initLightbox();
  setAchievementStore(store);

  // Avatar DOM setup
  initAvatar();

  // Back button
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', async () => {
      engine.pause();
      hideOptions();
      const profileModal = document.getElementById('profile-modal');
      if (profileModal) profileModal.classList.remove('active');
      import('../engine/voicePlayer.js').then(({ stopVoice }) => stopVoice()).catch(() => {});
      showMenu();
    });
  }

  // Settings button in game header
  const settingsBtn = document.getElementById('settings-btn-game');
  if (settingsBtn) settingsBtn.addEventListener('click', openSettings);

  // Audio unlock on first click
  document.addEventListener('click', () => { unlockAudio(); }, { once: false });

  // Show the main menu, then overlay legal screen if first launch
  showMenu();
  initLegal();
  if (!isLegalAccepted()) showLegal();
}
