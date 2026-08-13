/**
 * Settings modal — uses EventBus for theme/language changes.
 */
import { t } from '../data/translations.js';
import { getConfig, setConfig } from '../data/config.js';
import { deleteSave } from '../state/persistence.js';
import { updateAudioVolumes } from '../engine/audio.js';

const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings');

export function openSettings() {
  if (settingsModal.classList.contains('open')) {
    closeSettings();
    return;
  }
  settingsModal.classList.add('open');
  requestAnimationFrame(() => settingsModal.classList.add('visible'));
  updateSettingsUI();
}

export function closeSettings() {
  settingsModal.classList.remove('visible');
  setTimeout(() => {
    settingsModal.classList.remove('open');
  }, 350);
}

const volumeSliders = {
  music: {
    id: 'music-volume-slider',
    displayId: 'music-volume-value',
    configKey: 'musicVolume',
    default: 30
  },
  notifications: {
    id: 'notifications-volume-slider',
    displayId: 'notifications-volume-value',
    configKey: 'notificationsVolume',
    default: 100
  }
};

export function initSettings() {
  closeSettingsBtn.addEventListener('click', closeSettings);
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) closeSettings();
  });

  // Theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      const config = getConfig();
      config.theme = theme;
      setConfig(config);
      document.dispatchEvent(new CustomEvent('theme:changed', { detail: { theme } }));
      updateSettingsUI();
      closeSettings();
    });
  });

  // Initialize volume sliders
  Object.values(volumeSliders).forEach(slider => {
    const element = document.getElementById(slider.id);
    if (element) {
      element.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        const volume = isNaN(val) ? slider.default : Math.max(0, Math.min(100, val));
        const config = getConfig();
        config[slider.configKey] = volume;
        setConfig(config);
        updateAudioVolumes();
        updateVolumeDisplay(slider.displayId, volume);
      });
    }
  });

  // Инициализировать состояние при загрузке
  updateSettingsUI();

  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm(t('settings.reset_confirm'))) {
        deleteSave();
        window.location.reload();
      }
    });
  }
}

function updateVolumeDisplay(elementId, volume) {
  const element = document.getElementById(elementId);
  if (element) {
    const displayVolume = Math.max(0, Math.min(100, volume));
    element.textContent = `${displayVolume}%`;
  }
}

function updateSettingsUI() {
  const config = getConfig();

  // Update theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === config.theme);
  });

  // Update volume sliders - синхронизировать со значениями конфига
  Object.values(volumeSliders).forEach(slider => {
    const element = document.getElementById(slider.id);
    if (element) {
      const volume = config[slider.configKey] !== undefined ? config[slider.configKey] : slider.default;
      element.value = volume;
      updateVolumeDisplay(slider.displayId, volume);
    }
  });
}
