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
    messages: [],
    progress: {}
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
export function getFlag(key) { return gameState.flags[key]; }
export function setFlag(key, value) { gameState.flags[key] = value; return value; }
export function setFlags(flags) { Object.assign(gameState.flags, flags); return gameState.flags; }
export function hasShownNotification(key) {
    const notifs = gameState.flags.shownNotifs;
    return notifs && typeof notifs === 'object' ? !!notifs[key] : false;
}
export function markNotificationShown(key) {
    if (!gameState.flags.shownNotifs || typeof gameState.flags.shownNotifs !== 'object') {
        gameState.flags.shownNotifs = {};
    }
    gameState.flags.shownNotifs[key] = true;
    return true;
}
export function applyStatChanges(changes) {
    if (!gameState.stats || typeof gameState.stats !== 'object') {
        gameState.stats = { success: 0, romance: 0, humor: 0 };
    }
    const validKeys = ['success', 'romance', 'humor'];
    for (const key of validKeys) {
        const delta = changes[key];
        if (typeof delta === 'number') {
            if (typeof gameState.stats[key] !== 'number') {
                gameState.stats[key] = 0;
            }
            gameState.stats[key] += delta;
        }
    }
    return gameState.stats;
}

export function appendMessage(message) {
    if (!Array.isArray(gameState.messages)) {
        gameState.messages = [];
    }
    gameState.messages.push(message);
    return message;
}

export function updateLastMessage(partialProps) {
    if (!Array.isArray(gameState.messages) || gameState.messages.length === 0) {
        return null;
    }
    const lastMsg = gameState.messages[gameState.messages.length - 1];
    if (!lastMsg || typeof lastMsg !== 'object') {
        return null;
    }
    if (!partialProps || typeof partialProps !== 'object') {
        return lastMsg;
    }
    Object.assign(lastMsg, partialProps);
    return lastMsg;
}

export function setCurrentDay(day) {
    gameState.currentDay = day;
    return gameState.currentDay;
}

export function setStage(stage) {
    gameState.stage = stage;
    return gameState.stage;
}

export function getDayProgress(dayKey) {
    const p = gameState.progress;
    if (!p || typeof p !== 'object') return null;
    return p[dayKey] || null;
}

export function setDayProgress(dayKey, updates) {
    if (!gameState.progress || typeof gameState.progress !== 'object') {
        gameState.progress = {};
    }
    if (!gameState.progress[dayKey] || typeof gameState.progress[dayKey] !== 'object') {
        gameState.progress[dayKey] = {
            phase: null,
            messageIndex: 0,
            selectedOption: null
        };
    }
    Object.assign(gameState.progress[dayKey], updates);
    return gameState.progress[dayKey];
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
        progress: gameState.progress,
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
            gameState.progress = (data.progress && typeof data.progress === 'object') ? data.progress : {};
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
        messages: [],
        progress: {}
    };
    currentDate = null;
    currentTime = null;
    saveGame();
}