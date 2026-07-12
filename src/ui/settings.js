import { t, setLanguage } from '../data/translations.js';
import { getConfig, setConfig } from '../data/config.js';
import { applyTheme, applyLanguage } from '../app.js';
import { resetGameState } from '../engine/state.js';

const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings');

export function openSettings() {
    settingsModal.classList.add('active');
    // Обновляем состояние кнопок в соответствии с текущими настройками
    updateSettingsUI();
}

export function closeSettings() {
    settingsModal.classList.remove('active');
}

export function initSettings() {
    closeSettingsBtn.addEventListener('click', closeSettings);
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettings();
    });

    // Обработчики кнопок языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            const config = getConfig();
            config.language = lang;
            setConfig(config);
            applyLanguage();
            updateSettingsUI();
            // Закрываем настройки после выбора
            closeSettings();
        });
    });

    // Обработчики темы
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

    // Обработчики звука
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
    // Язык
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === config.language);
    });
    // Тема
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === config.theme);
    });
    // Звук
    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.classList.toggle('active', (btn.dataset.sound === 'on') === config.sound);
    });
}