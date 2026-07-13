import { t, setLanguage } from '../data/translations.js';
import { getConfig, setConfig } from '../data/config.js';
import { startGame, applyLanguage } from '../engine/game.js';

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const menuButtons = document.querySelectorAll('.menu-btn');

export function showMenu() {
    menuScreen.classList.add('active');
    gameScreen.classList.remove('active');
}

export function hideMenu() {
    menuScreen.classList.remove('active');
    gameScreen.classList.add('active');
}

export function initMenu() {
    menuButtons.forEach((btn, index) => {
        if (index === 0) {
            btn.addEventListener('click', () => {
                hideMenu();
                startGame('teacher');
            });
        } else if (index === 1) {
            btn.addEventListener('click', () => {
                hideMenu();
                startGame('story2');
            });
        }
    });

    document.querySelectorAll('.lang-flag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            const config = getConfig();
            config.language = lang;
            setConfig(config);
            applyLanguage();
        });
    });

    document.getElementById('settings-btn').addEventListener('click', () => {
        import('./settings.js').then(({ openSettings }) => openSettings());
    });
}
