import { t, setLanguage, getCurrentLanguage } from '../data/translations.js';
import { getConfig, setConfig } from '../data/config.js';
import { startGame, applyLanguage } from '../engine/game.js';
import { openSettings } from './settings.js';
import { openAchievements } from './achievements.js';

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');

export function showMenu() {
    gameScreen.classList.remove('active', 'screen-enter');
    menuScreen.classList.remove('screen-exit');
    menuScreen.classList.add('active');
}

export function hideMenu() {
    menuScreen.classList.remove('active');
    gameScreen.classList.add('active');
}

export function initMenu() {
    document.getElementById('top-lang-btn').addEventListener('click', () => {
        const current = getCurrentLanguage();
        const next = current === 'ru' ? 'en' : 'ru';
        setLanguage(next);
        const config = getConfig();
        config.language = next;
        setConfig(config);
        applyLanguage();
        document.getElementById('current-lang-label').textContent =
            next === 'ru' ? 'RU' : 'EN';
    });

    document.querySelectorAll('.story-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.story-card');
            if (card && !card.classList.contains('locked')) {
                const storyId = card.dataset.story || 'teacher';
                hideMenu();
                startGame(storyId);
            }
        });
    });

    document.getElementById('menu-achievements-btn').addEventListener('click', openAchievements);

    document.getElementById('menu-settings-btn').addEventListener('click', openSettings);
}
