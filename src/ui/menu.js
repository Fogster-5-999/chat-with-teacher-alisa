import { t, setLanguage } from '../data/translations.js';
import { getConfig, setConfig } from '../data/config.js';
import { startGame } from '../app.js';

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
    // Обработчики кнопок сюжетов (пока только первая активна)
    menuButtons.forEach((btn, index) => {
        if (index === 0) {
            btn.addEventListener('click', () => {
                hideMenu();
                startGame('teacher'); // Запускаем основной сюжет
            });
        }
    });

    // Кнопка настроек в меню
    document.getElementById('settings-btn').addEventListener('click', () => {
        import('./settings.js').then(({ openSettings }) => openSettings());
    });
}