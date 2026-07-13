import { t } from '../data/translations.js';
import { getConfig, setConfig } from '../data/config.js';
import { applyTheme } from '../engine/game.js';
import { resetGameState } from '../engine/state.js';

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

export function initSettings() {
    closeSettingsBtn.addEventListener('click', closeSettings);
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettings();
    });

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            const config = getConfig();
            config.theme = theme;
            setConfig(config);
            applyTheme();
            updateSettingsUI();
            closeSettings();
        });
    });

    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sound = btn.dataset.sound === 'on';
            const config = getConfig();
            config.sound = sound;
            setConfig(config);
            updateSettingsUI();
            closeSettings();
        });
    });

    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm(t('settings.reset_confirm'))) {
                resetGameState();
                localStorage.removeItem('game_save');
                window.location.reload();
            }
        });
    }
}

function updateSettingsUI() {
    const config = getConfig();
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === config.theme);
    });
    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.classList.toggle('active', (btn.dataset.sound === 'on') === config.sound);
    });
}
