import { initSDK } from './engine/sdk.js';
import { initAudio } from './engine/audio.js';
import { getGameState } from './engine/core.js';
import { showMenu, initMenu } from './ui/menu.js';
import { initSettings, openSettings } from './ui/settings.js';
import { initAchievements } from './ui/achievements.js';
import { initLightbox } from './ui/lightbox.js';
import { loadConfig } from './data/config.js';
import { applyTheme, applyLanguage } from './engine/game.js';

window.updateStatsUI = function() {
    const state = getGameState();
    document.getElementById('stat-success').textContent = state.stats.success;
    document.getElementById('stat-romance').textContent = state.stats.romance;
    document.getElementById('stat-humor').textContent = state.stats.humor;
};

document.addEventListener('DOMContentLoaded', async function() {
    loadConfig();
    applyTheme();
    applyLanguage();
    await initSDK();
    initAudio();
    initMenu();
    initSettings();
    initAchievements();
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
    const closeProfileBtn = document.getElementById('close-profile');
    if (closeProfileBtn) {
        closeProfileBtn.addEventListener('click', () => {
            const profileModal = document.getElementById('profile-modal');
            if (profileModal) profileModal.classList.remove('active');
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

    showMenu();
});