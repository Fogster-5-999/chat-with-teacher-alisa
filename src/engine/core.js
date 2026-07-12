import { playNotificationSound } from './audio.js';
import { t } from '../data/translations.js';
import { getConfig } from '../data/config.js';
import { renderMessage, addDayDivider, showTyping, hideTyping, showNetworkStatus, hideNetworkStatus, showOptions, clearMessages, renderFinalScreen } from '../ui/components.js';
import { GAME_SCRIPT } from '../data/story.js';
import { getGameState, setGameState, getCurrentDate, setCurrentDate, getCurrentTime, setCurrentTime, resetCurrentTime, getNextMessageTime, saveGame, loadGame, resetGameState } from './state.js';

export { getGameState, setGameState, getCurrentDate, setCurrentDate, getCurrentTime, setCurrentTime, resetCurrentTime, getNextMessageTime, saveGame, loadGame };

window.unlockPhoto = function() {
    const state = getGameState();
    state.flags.photoUnlocked = true;
    setGameState(state);
    saveGame();
};

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

async function showDayTransition(dayKey) {
    const overlay = document.getElementById('day-transition-overlay');
    const label = document.getElementById('day-transition-label');
    if (!overlay || !label) return;

    const title = dayKey === 'day1' ? 'Новый день' : `День ${dayKey.replace('day', '')}`;
    label.textContent = title;
    overlay.classList.add('active');
    await sleep(220);
    overlay.classList.remove('active');
    await sleep(180);
}

export function resetGame() {
    resetGameState();
    clearMessages();
    loadDay('day1');
}

function showFriendNotification(name, text, durationMs = 5000) {
    const el = document.getElementById('push-notification');
    if (!el) return;
    document.getElementById('push-notif-name').textContent = 'Друг (' + name + ')';
    document.getElementById('push-notif-text').textContent = text;
    el.classList.add('active');
    playNotificationSound();
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('active'), durationMs);
}

export async function loadDay(dayKey, stageKey = null) {
    const state = getGameState();
    if (state.flags.gameEnded) return;
    const dayData = GAME_SCRIPT[dayKey];
    if (!dayData) {
        showEndGame();
        return;
    }

    let currentDate = getCurrentDate();
    if (!currentDate) {
        const now = new Date();
        currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0, 0);
    } else {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
        const hours = randomInt(8, 23);
        currentDate.setHours(hours, randomInt(0, 59), 0, 0);
    }
    setCurrentDate(currentDate);
    resetCurrentTime();

    showNetworkStatus();
    const initialDelay = (dayKey === 'day1' && stageKey === null) ? 5000 : 12000;
    await sleep(initialDelay);
    hideNetworkStatus();
    await showDayTransition(dayKey);

    addDayDivider(currentDate);

    let messagesToShow = [];
    let optionsToShow = [];
    let reactions = null;
    let statsMap = null;
    let nextDay = null;
    let hasPhoto = false;
    let photoUrl = '';
    let photoBlurred = true;
    let photoPrompt = null;
    let friendNotification = null;

    if (dayKey === 'day5') {
        if (!stageKey) stageKey = 'stage1';
        const stage = dayData[stageKey];
        if (!stage) {
            if (dayData.nextDay) {
                const st = getGameState();
                st.currentDay = dayData.nextDay;
                setGameState(st);
                loadDay(dayData.nextDay);
            } else showEndGame();
            return;
        }
        messagesToShow = stage.messages;
        optionsToShow = stage.options;
        reactions = stage.reactions;
        statsMap = stage.stats;
        friendNotification = stage.friendNotification || null;
        const st = getGameState();
        st.stage = stageKey;
        setGameState(st);
    } else {
        messagesToShow = dayData.messages;
        optionsToShow = dayData.options;
        reactions = dayData.reactions;
        statsMap = dayData.stats;
        nextDay = dayData.nextDay;
        hasPhoto = dayData.hasPhoto || false;
        photoUrl = dayData.photoUrl || '';
        photoBlurred = dayData.photoBlurred !== undefined ? dayData.photoBlurred : true;
        photoPrompt = dayData.photoPrompt || null;
        friendNotification = dayData.friendNotification || null;
    }

    if (friendNotification) {
        const st = getGameState();
        const notifKey = dayKey + (stageKey ? ':' + stageKey : '');
        if (!st.flags.shownNotifs[notifKey]) {
            st.flags.shownNotifs[notifKey] = true;
            setGameState(st);
            saveGame();
            showFriendNotification(friendNotification.name, friendNotification.text);
        }
    }

    for (let msg of messagesToShow) {
        showTyping();
        const delay = randomInt(4000, 10000);
        await sleep(delay);
        hideTyping();
        const msgTime = getNextMessageTime();
        const msgObj = { sender: msg.sender, text: msg.text, timestamp: msgTime.toISOString() };
        const st = getGameState();
        st.messages.push(msgObj);
        setGameState(st);
        renderMessage(msgObj);
        if (msg.sender === 'alisa') playNotificationSound();
    }

    if (hasPhoto) {
        await sleep(1500);
        const st = getGameState();
        const isLocked = photoBlurred && !st.flags.photoUnlocked;
        const photoMsg = {
            sender: 'alisa',
            type: 'photo',
            photoUrl,
            blurred: photoBlurred,
            prompt: photoPrompt,
            isLocked: isLocked,
            timestamp: new Date().toISOString()
        };
        st.messages.push(photoMsg);
        setGameState(st);
        renderMessage(photoMsg);
        playNotificationSound();
    }

    showOptions(optionsToShow, async function(optionId, optionLabel) {
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

        const playerTime = getNextMessageTime();
        const playerMsg = { sender: 'player', text: optionLabel, timestamp: playerTime.toISOString() };
        const st = getGameState();
        st.messages.push(playerMsg);
        setGameState(st);
        renderMessage(playerMsg);
        await sleep(1000);

        const reaction = reactions[optionId];
        if (reaction) {
            for (let msg of reaction) {
                showTyping();
                const delay = randomInt(4000, 10000);
                await sleep(delay);
                hideTyping();
                const msgTime = getNextMessageTime();
                const msgObj = { sender: msg.sender, text: msg.text, timestamp: msgTime.toISOString() };
                const st2 = getGameState();
                st2.messages.push(msgObj);
                setGameState(st2);
                renderMessage(msgObj);
                if (msg.sender === 'alisa') playNotificationSound();
            }
        }

        const stat = statsMap[optionId];
        if (stat) {
            const st3 = getGameState();
            st3.stats.success += stat.success;
            st3.stats.romance += stat.romance;
            st3.stats.humor += stat.humor;
            setGameState(st3);
            if (window.updateStatsUI) window.updateStatsUI();
        }

        await saveGame();
        const optionsEl = document.getElementById('options');
        if (optionsEl) optionsEl.innerHTML = '';
        await sleep(3000);

        if (dayKey === 'day5') {
            const st4 = getGameState();
            if (stageKey === 'stage1') {
                st4.flags.day5Stage1Done = true;
                setGameState(st4);
                loadDay('day5', 'stage2');
            } else if (stageKey === 'stage2') {
                st4.flags.day5Stage2Done = true;
                setGameState(st4);
                loadDay('day5', 'stage3');
            } else if (stageKey === 'stage3') {
                st4.flags.day5Stage3Done = true;
                setGameState(st4);
                if (dayData.nextDay) {
                    st4.currentDay = dayData.nextDay;
                    setGameState(st4);
                    loadDay(dayData.nextDay);
                } else showEndGame();
            }
        } else {
            if (nextDay) {
                const st5 = getGameState();
                st5.currentDay = nextDay;
                setGameState(st5);
                loadDay(nextDay);
            } else {
                if (dayData.finalMessage) showFinalMessage(dayData);
                else { 
                    const st6 = getGameState();
                    st6.flags.gameEnded = true;
                    setGameState(st6);
                    showEndGame(); 
                }
            }
        }
    });
}

function showFinalMessage(dayData) {
    hideNetworkStatus();
    hideTyping();
    const state = getGameState();
    const msgs = dayData.finalMessage.map(msg => ({
        sender: 'system',
        text: msg.text.replace(/\{\{success\}\}/g, state.stats.success)
                      .replace(/\{\{romance\}\}/g, state.stats.romance)
                      .replace(/\{\{humor\}\}/g, state.stats.humor)
    }));
    renderFinalScreen(msgs);
    const restartBtn = document.createElement('button');
    restartBtn.className = 'option-btn';
    restartBtn.textContent = t('game.restart');
    restartBtn.addEventListener('click', resetGame);
    document.getElementById('options').appendChild(restartBtn);
}

function showEndGame() {
    hideNetworkStatus();
    hideTyping();
    renderFinalScreen([{ sender: 'system', text: t('game.ended') }]);
    const restartBtn = document.createElement('button');
    restartBtn.className = 'option-btn';
    restartBtn.textContent = t('game.restart');
    restartBtn.addEventListener('click', resetGame);
    document.getElementById('options').appendChild(restartBtn);
}