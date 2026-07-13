import { saveGameData, loadGameData } from './sdk.js';

function getDefaultFlags() {
    return {
        photoUnlocked: false,
        day5Stage1Done: false,
        day5Stage2Done: false,
        day5Stage3Done: false,
        gameEnded: false,
        flirtWithTeacher: false,
        helpedFriend: false,
        wasRude: false,
        allHonest: false,
        secondChanceUsed: false,
        shownNotifs: {}
    };
}

let gameState = {
    currentDay: 'day1',
    stage: null,
    stats: { success: 0, romance: 0, humor: 0 },
    flags: getDefaultFlags(),
    messages: []
};

let currentDate = null;
let currentTime = null;

export function getGameState() { return gameState; }
export function setGameState(newState) {
    gameState = {
        ...gameState,
        ...newState,
        stats: { ...gameState.stats, ...(newState.stats || {}) },
        flags: { ...getDefaultFlags(), ...gameState.flags, ...(newState.flags || {}) }
    };
}
export function getCurrentDate() { return currentDate; }
export function setCurrentDate(date) { currentDate = date; }
export function getCurrentTime() { return currentTime; }
export function setCurrentTime(time) { currentTime = time; }
export function resetCurrentTime() { currentTime = null; }

export function getNextMessageTime() {
    if (!currentTime) {
        currentTime = new Date(currentDate);
        currentTime.setMinutes(currentTime.getMinutes() + Math.floor(Math.random() * 6));
    } else {
        const delta = Math.floor(Math.random() * 5) + 1;
        currentTime = new Date(currentTime);
        currentTime.setMinutes(currentTime.getMinutes() + delta);
    }
    return new Date(currentTime);
}

export async function saveGame() {
    const data = {
        currentDay: gameState.currentDay,
        stage: gameState.stage,
        stats: gameState.stats,
        flags: gameState.flags,
        messages: gameState.messages,
        currentDate: currentDate ? currentDate.toISOString() : null,
        currentTime: currentTime ? currentTime.toISOString() : null
    };
    await saveGameData({ gameData: JSON.stringify(data) });
}

export async function loadGame() {
    const saved = await loadGameData();
    if (saved && saved.gameData) {
        try {
            const data = JSON.parse(saved.gameData);
            gameState.currentDay = data.currentDay || 'day1';
            gameState.stage = data.stage || null;
            gameState.stats = { success: 0, romance: 0, humor: 0, ...(data.stats || {}) };
            gameState.flags = { ...getDefaultFlags(), ...(data.flags || {}) };
            if (!gameState.flags.shownNotifs) gameState.flags.shownNotifs = {};
            gameState.messages = data.messages || [];
            if (data.currentDate) currentDate = new Date(data.currentDate);
            else currentDate = null;
            if (data.currentTime) currentTime = new Date(data.currentTime);
            else currentTime = null;
            return true;
        } catch (e) {
            console.warn('Ошибка загрузки сохранения', e);
        }
    }
    return false;
}

export function resetGameState() {
    gameState = {
        currentDay: 'day1',
        stage: null,
        stats: { success: 0, romance: 0, humor: 0 },
        flags: getDefaultFlags(),
        messages: []
    };
    currentDate = null;
    currentTime = null;
    saveGame();
}