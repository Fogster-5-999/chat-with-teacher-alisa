import { playNotificationSound } from './audio.js';
import { t, getCurrentLanguage } from '../data/translations.js';
import { renderMessage, addDayDivider, showTyping, hideTyping, showNetworkStatus, hideNetworkStatus, showOptions, hideOptions, clearMessages, renderFinalScreen, showMiniTest } from '../ui/components.js';
import { GAME_SCRIPT } from '../data/story.js';
import { getGameState, setGameState, getCurrentDate, setCurrentDate, getCurrentTime, setCurrentTime, resetCurrentTime, getNextMessageTime, saveGame, loadGame, resetGameState } from './state.js';

export { getGameState, setGameState, getCurrentDate, setCurrentDate, getCurrentTime, setCurrentTime, resetCurrentTime, getNextMessageTime, saveGame, loadGame };

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

async function showDayTransition(dayKey) {
    const overlay = document.getElementById('day-transition-overlay');
    const label = document.getElementById('day-transition-label');
    if (!overlay || !label) return;

    const num = dayKey.replace('day', '').replace(/_.*$/, '');
    const title = `${t('day.new')} ${num}`;
    label.textContent = title;
    overlay.classList.add('active');
    await sleep(1800);
    overlay.classList.remove('active');
    await sleep(400);
}

export function resetGame() {
    resetGameState();
    clearMessages();
    loadDay('day1');
}

function showTopNotification(title, text, durationMs = 5000, icon) {
    const el = document.getElementById('push-notification');
    if (!el) return;
    const iconEl = document.getElementById('push-notif-icon');
    if (iconEl && icon) iconEl.textContent = icon;
    document.getElementById('push-notif-name').textContent = title;
    document.getElementById('push-notif-text').textContent = text;
    el.classList.add('active');
    playNotificationSound();
    clearTimeout(el._timer);
    el._timer = setTimeout(() => {
        el.classList.remove('active');
        if (iconEl) iconEl.textContent = '💬';
    }, durationMs);
}

function showFriendNotification(name, text, durationMs = 5000) {
    showTopNotification(name, text, durationMs, '👤');
}

// ================================================================
// АЧИВКИ: сверяем состояние со списком GAME_SCRIPT.achievementsMeta
// и разблокируем всё новое, что подходит под условие.
// ================================================================
export function checkAchievements() {
    const meta = GAME_SCRIPT.achievementsMeta || [];
    if (!meta.length) return;
    const state = getGameState();
    if (!state.achievements) state.achievements = [];
    let changed = false;
    meta.forEach(a => {
        if (state.achievements.includes(a.id)) return;
        if (a.condition(state)) {
            state.achievements.push(a.id);
            changed = true;
            const lang = getCurrentLanguage();
            const name = (a.name && (a.name[lang] || a.name.ru)) || a.id;
            showTopNotification(t('achievement.title'), name, 5000, a.icon || '🏆');
        }
    });
    if (changed) {
        setGameState(state);
        saveGame();
    }
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

    hideOptions();

    if (dayData.conditionalMessages) {
        const currentState = getGameState();
        for (let condMsg of dayData.conditionalMessages) {
            if (condMsg.condition(currentState)) {
                messagesToShow.push({ sender: condMsg.sender, textKey: condMsg.textKey || condMsg.text });
            }
        }
    }

    for (let msg of messagesToShow) {
        showTyping();
        const delay = randomInt(4000, 10000);
        await sleep(delay);
        hideTyping();
        const msgTime = getNextMessageTime();
        const msgObj = { sender: msg.sender, textKey: msg.textKey || msg.text, timestamp: msgTime.toISOString() };
        const st = getGameState();
        st.messages.push(msgObj);
        setGameState(st);
        renderMessage(msgObj);
        if (msg.sender === 'alisa') playNotificationSound();
    }

    // Мини-тест идёт сразу после первого сообщения дня 2, до фото и дальнейшего сюжета.
    if (dayData.miniTest) {
        hideTyping();
        await sleep(500);
        const stMini = getGameState();
        const miniKey = 'miniTest:' + dayKey;
        if (!stMini.flags[miniKey]) {
            const introMsgTime = getNextMessageTime();
            const introMsg = { sender: 'alisa', textKey: dayData.miniTest.intro, timestamp: introMsgTime.toISOString() };
            stMini.messages.push(introMsg);
            setGameState(stMini);
            renderMessage(introMsg);

            const preOptions = [
                { id: 'take_test', label: t('minitest.take') },
                { id: 'decline_test', label: t('minitest.decline') },
                { id: 'skip_ad', label: t('minitest.skip') }
            ];

            await new Promise(resolveChoice => {
                showOptions(preOptions, async function(optId, optLabel) {
                    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
                    if (optId === 'take_test') {
                        const correctCount = await showMiniTest(dayData.miniTest, () => {});
                        const stRes = getGameState();
                        stRes.flags[miniKey] = true;
                        if (!stRes.achievements) stRes.achievements = [];
                        const totalQuestions = (dayData.miniTest.questions || []).length;
                        if (correctCount === totalQuestions) {
                            stRes.achievements.push(dayData.miniTest.achievementId || 'mini_test');
                            stRes.stats.success += (dayData.miniTest.successPoints || 3);
                            showTopNotification(t('notif.alisa'), t(dayData.miniTest.successMessage));
                            if (window.updateStatsUI) window.updateStatsUI();
                        } else {
                            showTopNotification(t('notif.alisa'), t(dayData.miniTest.failMessage));
                        }
                        if (dayKey === 'day2' && dayData.miniTest.followUpMessage) {
                            const followUpTime = getNextMessageTime();
                            const followUpMsg = { sender: 'alisa', textKey: dayData.miniTest.followUpMessage, timestamp: followUpTime.toISOString() };
                            stRes.messages.push(followUpMsg);
                            setGameState(stRes);
                            renderMessage(followUpMsg);
                        } else {
                            setGameState(stRes);
                        }
                        await saveGame();
                        await sleep(900);
                        resolveChoice();
                    } else if (optId === 'skip_ad') {
                        import('../engine/sdk.js').then(({ showAd }) => {
                            showAd({
                                callbacks: {
                                    onClose: async (wasShown) => {
                                        const stRes = getGameState();
                                        stRes.flags[miniKey] = true;
                                        if (!stRes.achievements) stRes.achievements = [];
                                        if (wasShown) {
                                            stRes.achievements.push(dayData.miniTest.achievementId || 'mini_test');
                                            stRes.stats.success += (dayData.miniTest.successPoints || 3);
                                            showTopNotification(t('notif.alisa'), t(dayData.miniTest.successMessage));
                                            if (window.updateStatsUI) window.updateStatsUI();
                                            if (dayKey === 'day2' && dayData.miniTest.followUpMessage) {
                                                const followUpTime = getNextMessageTime();
                                                const followUpMsg = { sender: 'alisa', textKey: dayData.miniTest.followUpMessage, timestamp: followUpTime.toISOString() };
                                                stRes.messages.push(followUpMsg);
                                                setGameState(stRes);
                                                renderMessage(followUpMsg);
                                            } else {
                                                setGameState(stRes);
                                            }
                                            await saveGame();
                                        }
                                        await sleep(900);
                                        resolveChoice();
                                    }
                                }
                            });
                        });
                    } else if (optId === 'decline_test') {
                        const stRes = getGameState();
                        stRes.flags[miniKey] = true;
                        setGameState(stRes);
                        await saveGame();
                        await sleep(700);
                        resolveChoice();
                    } else {
                        resolveChoice();
                    }
                });
            });
        }
    }

    if (hasPhoto) {
        await sleep(1500);
        const st = getGameState();
        const isLocked = photoBlurred && !st.flags.photoUnlocked;
        const photoMsg = {
            sender: 'alisa',
            type: 'photo',
            photoUrl,
            isLocked: isLocked,
            timestamp: new Date().toISOString()
        };
        st.messages.push(photoMsg);
        setGameState(st);
        renderMessage(photoMsg);
        playNotificationSound();
    }

    let allOptions = [...optionsToShow];
    if (dayData.conditionalOptions) {
        const currentState = getGameState();
        for (let condOpt of dayData.conditionalOptions) {
            if (condOpt.condition(currentState)) {
                allOptions.push(condOpt);
            }
        }
    }

    hideTyping();
    await sleep(600);

    showOptions(allOptions, async function(optionId, optionLabel) {
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

        const playerTime = getNextMessageTime();
        const playerMsg = { sender: 'player', textKey: optionId, timestamp: playerTime.toISOString() };
        const st = getGameState();
        st.messages.push(playerMsg);
        setGameState(st);
        renderMessage(playerMsg);
        await sleep(1000);

        if (Math.random() < 0.25) {
            const outgoing = document.querySelectorAll('#messages > .message.outgoing');
            const lastMsg = outgoing.length ? outgoing[outgoing.length - 1] : null;
            if (lastMsg) {
                const reaction = document.createElement('span');
                reaction.className = 'message-reaction';
                reaction.textContent = '❤️';
                lastMsg.appendChild(reaction);
            }
            const st = getGameState();
            const msgs = st.messages;
            if (msgs.length > 0) {
                msgs[msgs.length - 1].liked = true;
                setGameState(st);
                saveGame();
            }
        }

        if (dayData.flagsOnComplete && dayData.flagsOnComplete[optionId]) {
            const st = getGameState();
            Object.assign(st.flags, dayData.flagsOnComplete[optionId]);
            setGameState(st);
        }
        if (typeof dayData.onComplete === 'function') {
            const stOnComplete = getGameState();
            dayData.onComplete(stOnComplete);
            setGameState(stOnComplete);
        }
        checkAchievements();

        const reaction = reactions[optionId];
        if (reaction) {
            for (let msg of reaction) {
                showTyping();
                const delay = randomInt(4000, 10000);
                await sleep(delay);
                hideTyping();
                const msgTime = getNextMessageTime();
                const msgObj = { sender: msg.sender, textKey: msg.textKey || msg.text, timestamp: msgTime.toISOString() };
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
        checkAchievements();

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
                let next = null;
                if (Array.isArray(nextDay)) {
                    const st5 = getGameState();
                    for (let rule of nextDay) {
                        if (rule.condition && rule.condition(st5)) {
                            next = rule.day;
                            break;
                        }
                    }
                    if (!next) next = nextDay.find(r => r.default)?.day || 'day2';
                } else {
                    next = nextDay;
                }
                const st5 = getGameState();
                st5.currentDay = next;
                setGameState(st5);
                loadDay(next);
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
    state.flags.gameEnded = true;
    setGameState(state);
    checkAchievements();
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
    const optsEl = document.getElementById('options');
    optsEl.appendChild(restartBtn);
    optsEl.style.display = 'flex';
}

function showEndGame() {
    hideNetworkStatus();
    hideTyping();
    checkAchievements();
    renderFinalScreen([{ sender: 'system', text: t('game.ended') }]);
    const restartBtn = document.createElement('button');
    restartBtn.className = 'option-btn';
    restartBtn.textContent = t('game.restart');
    restartBtn.addEventListener('click', resetGame);
    const optsEl = document.getElementById('options');
    optsEl.appendChild(restartBtn);
    optsEl.style.display = 'flex';
}