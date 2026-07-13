import { initSDK } from './engine/sdk.js';
import { initAudio, unlockAudio, playNotificationSound } from './engine/audio.js';
import { loadGame, loadDay, resetGame, getGameState, setGameState, getCurrentDate, setCurrentDate, getCurrentTime, setCurrentTime, resetCurrentTime, getNextMessageTime, saveGame, loadConfig } from './engine/core.js';
import { renderAllMessages } from './ui/components.js';
import { showMenu, initMenu } from './ui/menu.js';
import { initSettings, openSettings } from './ui/settings.js';
import { initLightbox, openLightbox } from './ui/lightbox.js';
import { t, setLanguage, getCurrentLanguage } from './data/translations.js';
import { getConfig, setConfig } from './data/config.js';

window.updateStatsUI = function() {
    const state = getGameState();
    document.getElementById('stat-success').textContent = state.stats.success;
    document.getElementById('stat-romance').textContent = state.stats.romance;
    document.getElementById('stat-humor').textContent = state.stats.humor;
};

export function applyTheme() {
    const config = getConfig();
    const body = document.body;
    if (config.theme === 'light') body.classList.add('light-theme');
    else body.classList.remove('light-theme');
}

export function applyLanguage() {
    const config = getConfig();
    setLanguage(config.language);
    const state = getGameState();
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (key) el.textContent = t(key);
    });
    const menuBtns = document.querySelectorAll('.menu-btn');
    if (menuBtns.length >= 3) {
        menuBtns[0].textContent = t('menu.story1');
        menuBtns[1].textContent = t('menu.story2');
        menuBtns[2].textContent = t('menu.story3');
    }
    const title = document.querySelector('.game-title');
    const subtitle = document.querySelector('.game-subtitle');
    if (title) title.textContent = t('menu.title');
    if (subtitle) subtitle.textContent = t('menu.subtitle');
    const profileTitle = document.getElementById('profile-header-title');
    if (profileTitle) profileTitle.textContent = t('profile.title');
    const settingsTitle = document.querySelector('#settings-modal h2');
    if (settingsTitle) settingsTitle.textContent = t('settings.title');
    const contactName = document.getElementById('contact-name');
    if (contactName) contactName.textContent = t('profile.name');
    const headerStatus = document.getElementById('status');
    if (headerStatus) headerStatus.textContent = t('profile.status');
    const profileName = document.getElementById('profile-name');
    if (profileName) profileName.textContent = t('profile.name');
    const profileStatus = document.getElementById('profile-status');
    if (profileStatus) profileStatus.textContent = t('profile.status');
    const headerAvatarImg = document.getElementById('avatar-img');
    if (headerAvatarImg) {
        headerAvatarImg.src = 'res/ava.png';
        headerAvatarImg.classList.add('has-photo');
        headerAvatarImg.style.display = 'block';
        headerAvatarImg.onclick = (e) => {
            e.stopPropagation();
            const profileModal = document.getElementById('profile-modal');
            if (profileModal) profileModal.classList.add('active');
        };
    }
    const profileAvatarImg = document.getElementById('profile-avatar-img');
    if (profileAvatarImg) {
        profileAvatarImg.src = 'res/ava.png';
        profileAvatarImg.classList.add('has-photo');
        profileAvatarImg.style.display = 'block';
        profileAvatarImg.onclick = (e) => {
            e.stopPropagation();
            openLightbox(profileAvatarImg.src || 'res/ava.png');
        };
    }
    const avatarEmoji = document.getElementById('avatar-emoji');
    if (avatarEmoji) avatarEmoji.classList.add('hidden');
    const profileAvatarEmoji = document.getElementById('profile-avatar-emoji');
    if (profileAvatarEmoji) profileAvatarEmoji.classList.add('hidden');
    const profileJob = document.querySelector('#profile-info-list .profile-info-row:nth-child(1) .profile-info-label');
    if (profileJob) profileJob.textContent = t('profile.job');
    const profileBio = document.querySelector('#profile-info-list .profile-info-row:nth-child(2) .profile-info-label');
    if (profileBio) profileBio.textContent = t('profile.bio');
    const profileSub1 = document.querySelector('#profile-info-list .profile-info-row:nth-child(1) .profile-info-sub');
    if (profileSub1) profileSub1.textContent = t('profile.job_sub');
    const profileSub2 = document.querySelector('#profile-info-list .profile-info-row:nth-child(2) .profile-info-sub');
    if (profileSub2) profileSub2.textContent = t('profile.bio_sub');
    const profileSub3 = document.querySelector('#profile-info-list .profile-info-row:nth-child(3) .profile-info-sub');
    if (profileSub3) profileSub3.textContent = t('profile.username');
    if (state && state.messages && state.messages.length > 0) {
        renderAllMessages(state.messages);
    }

    const dayTransitionLabel = document.getElementById('day-transition-label');
    if (dayTransitionLabel) dayTransitionLabel.textContent = t('day.new');
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) resetBtn.textContent = t('settings.reset_btn');
    const pushNotifName = document.getElementById('push-notif-name');
    if (pushNotifName) pushNotifName.textContent = t('notification.alisa');
    const achievementsTitle = document.querySelector('#achievements-modal h2');
    if (achievementsTitle) achievementsTitle.textContent = t('achievements.title');
    const achievementsBtn = document.getElementById('open-achievements-btn');
    if (achievementsBtn) achievementsBtn.textContent = t('settings.achievements_open');
}

async function loadSaveAndStart() {
    const hasSave = await loadGame();
    const state = getGameState();
    if (state.messages.length > 0) renderAllMessages(state.messages);
    if (hasSave && !state.flags.gameEnded) {
        if (state.currentDay === 'day5') {
            let stageKey = 'stage1';
            if (state.flags.day5Stage1Done && !state.flags.day5Stage2Done) stageKey = 'stage2';
            else if (state.flags.day5Stage2Done && !state.flags.day5Stage3Done) stageKey = 'stage3';
            else if (state.flags.day5Stage3Done) {
                if (GAME_SCRIPT['day5'].nextDay) {
                    state.currentDay = GAME_SCRIPT['day5'].nextDay;
                    setGameState(state);
                    loadDay(state.currentDay);
                } else showEndGame();
                return;
            }
            loadDay('day5', stageKey);
        } else {
            loadDay(state.currentDay);
        }
    } else {
        loadDay('day1');
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    loadConfig();
    await initSDK();
    initAudio();
    initMenu();
    initSettings();
    initLightbox();

    const settingsBtn = document.getElementById('settings-btn-game');
    if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
    const avatar = document.getElementById('avatar');
    if (avatar) {
        avatar.addEventListener('click', () => {
            const profileModal = document.getElementById('profile-modal');
            if (profileModal) profileModal.classList.add('active');
        });
    }
    
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            import('./engine/audio.js').then(({ toggleMusic }) => toggleMusic());
        });
    }

    document.addEventListener('click', () => {
        import('./engine/audio.js').then(({ unlockAudio }) => unlockAudio());
    }, { once: false });

    applyTheme(); // Применяем тему после загрузки конфигурации
    applyLanguage(); // Применяем язык после загрузки конфигурации

    showMenu();
});