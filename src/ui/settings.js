import { t, setLanguage, getCurrentLanguage } from '../data/translations.js';
import { getConfig, setConfig } from '../data/config.js';
import { applyTheme, applyLanguage } from '../app.js';
import { resetGameState } from '../engine/state.js';
import { getGameState } from '../engine/core.js';
import { GAME_SCRIPT } from '../data/story.js';

const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings');

export function openSettings() {
    settingsModal.classList.add('active');
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

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            const config = getConfig();
            config.language = lang;
            setConfig(config);
            applyLanguage();
            updateSettingsUI();
            closeSettings();
        });
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

    const achievementsBtn = document.getElementById('open-achievements-btn');
    if (achievementsBtn) {
        achievementsBtn.addEventListener('click', openAchievementsModal);
    }
    document.getElementById('close-achievements')?.addEventListener('click', closeAchievementsModal);
    document.getElementById('achievements-modal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeAchievementsModal();
    });
}

function updateSettingsUI() {
    const config = getConfig();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === config.language);
    });
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === config.theme);
    });
    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.classList.toggle('active', (btn.dataset.sound === 'on') === config.sound);
    });
}

function openAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    const list = document.getElementById('achievements-list');
    if (!modal || !list) return;
    const state = getGameState();
    const meta = GAME_SCRIPT.achievementsMeta || [];
    const unlocked = state.achievements || [];
    list.innerHTML = '';
    meta.forEach(ach => {
        const isUnlocked = unlocked.includes(ach.id);
        const div = document.createElement('div');
        div.className = 'achievement-item' + (isUnlocked ? ' unlocked' : ' locked');
        const icon = ach.icon || '🏆';
        const name = isUnlocked ? (ach.name?.[getCurrentLanguage()] || ach.name?.ru || ach.id) : (ach.secret ? '🔒 Скрыто' : '🔒 Секретно');
        div.innerHTML = `
            <span class="ach-icon">${isUnlocked ? icon : '🔒'}</span>
            <span class="ach-name">${isUnlocked ? name : 'Скрыто'}</span>
            <span class="ach-status">${isUnlocked ? '✅' : ''}</span>
        `;
        list.appendChild(div);
    });
    modal.classList.add('active');
}

function closeAchievementsModal() {
    document.getElementById('achievements-modal')?.classList.remove('active');
}