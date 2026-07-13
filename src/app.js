import { initSDK } from './engine/sdk.js';
import { initAudio } from './engine/audio.js';
import { saveGame } from './engine/core.js';
import { hideOptions } from './ui/components.js';
import { showMenu, initMenu } from './ui/menu.js';
import { initSettings, openSettings } from './ui/settings.js';
import { initAchievements } from './ui/achievements.js';
import { initLightbox, openLightbox } from './ui/lightbox.js';
import { loadConfig } from './data/config.js';
import { applyTheme, applyLanguage, updateCoreStatsUI } from './engine/game.js';

window.updateStatsUI = updateCoreStatsUI;

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
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', async () => {
            await saveGame();
            hideOptions();
            const profileModal = document.getElementById('profile-modal');
            if (profileModal) profileModal.classList.remove('active');
            showMenu();
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