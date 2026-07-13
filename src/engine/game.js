import { getConfig } from '../data/config.js';
import { t, setLanguage } from '../data/translations.js';
import { getGameState, setGameState, loadGame, loadDay, resetGame } from './core.js';
import { resetGameState } from './state.js';
import { renderAllMessages, reRenderSavedOptions } from '../ui/components.js';
import { GAME_SCRIPT } from '../data/story.js';

export function applyTheme() {
    const config = getConfig();
    const body = document.body;
    if (config.theme === 'light') body.classList.add('light-theme');
    else body.classList.remove('light-theme');
}

export function applyLanguage() {
    const config = getConfig();
    const lang = config.language;
    setLanguage(lang);
    const state = getGameState();
    state.lang = lang;
    setGameState(state);

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
    const contactName = document.getElementById('contact-name');
    if (contactName) contactName.textContent = t('profile.name');
    const headerStatus = document.getElementById('status');
    if (headerStatus) headerStatus.textContent = t('profile.status');
    const profileName = document.getElementById('profile-name');
    if (profileName) profileName.textContent = t('profile.name');
    const profileStatus = document.getElementById('profile-status');
    if (profileStatus) profileStatus.textContent = t('profile.status');
    const profileTitle = document.getElementById('profile-header-title');
    if (profileTitle) profileTitle.textContent = t('profile.title');

    renderAllMessages(state.messages || []);
    reRenderSavedOptions();
    if (state.flags.gameEnded) {
        const dayData = GAME_SCRIPT[state.currentDay];
        if (dayData && dayData.finalMessage) {
            const finalMsgs = dayData.finalMessage.map(msg => ({
                sender: 'system',
                text: msg.text.replace(/\{\{success\}\}/g, state.stats.success)
                              .replace(/\{\{romance\}\}/g, state.stats.romance)
                              .replace(/\{\{humor\}\}/g, state.stats.humor)
            }));
            renderAllMessages(finalMsgs);
        } else {
            renderAllMessages([{ sender: 'system', text: t('game.ended') }]);
        }
        const optsEl = document.getElementById('options');
        if (optsEl && !optsEl.querySelector('.option-btn')) {
            const restartBtn = document.createElement('button');
            restartBtn.className = 'option-btn';
            restartBtn.textContent = t('game.restart');
            restartBtn.addEventListener('click', resetGame);
            optsEl.appendChild(restartBtn);
            optsEl.style.display = 'flex';
        }
    }
}

export function startGame(storyId) {
    if (storyId === 'teacher') {
        loadSaveAndStart();
    } else if (storyId === 'story2') {
        loadStory2();
    }
}

function loadStory2() {
    const state = getGameState();
    state.currentDay = 'day1_story2';
    state.stage = null;
    state.flags.gameEnded = false;
    setGameState(state);
    resetGameState();
    const freshState = getGameState();
    freshState.currentDay = 'day1_story2';
    freshState.flags.gameEnded = false;
    setGameState(freshState);
    loadDay('day1_story2');
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
                }
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
