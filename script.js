let gameState = {
    currentDay: 'day1',
    stage: null,
    stats: { success: 0, romance: 0, humor: 0 },
    flags: {
        photoUnlocked: false,
        day5Stage1Done: false,
        day5Stage2Done: false,
        day5Stage3Done: false,
        gameEnded: false
    },
    history: []
};

const YandexSDK = {
    isReady: false,
    init: async function() {
        console.log('SDK инициализирован (эмуляция)');
        this.isReady = true;
        return this;
    },
    setData: async function(data) {
        console.log('Сохраняем данные:', data);
        try {
            localStorage.setItem('game_save', JSON.stringify(data));
        } catch(e) {}
        return true;
    },
    getData: async function() {
        console.log('Загружаем данные');
        try {
            const raw = localStorage.getItem('game_save');
            if (raw) return JSON.parse(raw);
        } catch(e) {}
        return null;
    },
    showFullscreenAdv: function({ callbacks }) {
        console.log('Показываем рекламу (эмуляция)');
        const overlay = document.getElementById('ad-overlay');
        overlay.classList.add('active');
        const closeBtn = document.getElementById('close-ad-btn');
        const handler = () => {
            overlay.classList.remove('active');
            closeBtn.removeEventListener('click', handler);
            if (callbacks && callbacks.onClose) {
                callbacks.onClose(true);
            }
        };
        closeBtn.addEventListener('click', handler);
        if (callbacks && callbacks.onOpen) callbacks.onOpen();
    }
};

const messagesContainer = document.getElementById('messages');
const optionsContainer = document.getElementById('options');
const statSuccess = document.getElementById('stat-success');
const statRomance = document.getElementById('stat-romance');
const statHumor = document.getElementById('stat-humor');
const typingIndicator = document.getElementById('typing-indicator');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateStatsBar() {
    statSuccess.textContent = gameState.stats.success;
    statRomance.textContent = gameState.stats.romance;
    statHumor.textContent = gameState.stats.humor;
}

function addMessage(sender, text, isHtml = false) {
    const div = document.createElement('div');
    let className = 'message ';
    if (sender === 'alisa') {
        className += 'incoming';
    } else if (sender === 'system') {
        className += 'system';
    } else {
        className += 'outgoing';
    }
    div.className = className;
    if (isHtml) {
        div.innerHTML = text;
    } else {
        div.textContent = text;
    }
    messagesContainer.insertBefore(div, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addSystemMessage(text) {
    const div = document.createElement('div');
    div.className = 'message system';
    div.textContent = text;
    messagesContainer.insertBefore(div, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function clearMessages() {
    while (messagesContainer.firstChild && messagesContainer.firstChild !== typingIndicator) {
        messagesContainer.removeChild(messagesContainer.firstChild);
    }
}

function showTyping() {
    typingIndicator.style.display = 'flex';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTyping() {
    typingIndicator.style.display = 'none';
}

function showPhoto(photoUrl, blurred = true, prompt = null) {
    const div = document.createElement('div');
    div.className = 'message incoming';
    const img = document.createElement('img');
    img.src = photoUrl;
    img.style.width = '100%';
    img.style.borderRadius = '12px';
    if (blurred) {
        img.classList.add('blurred-photo');
        div.appendChild(img);
        const caption = document.createElement('div');
        caption.style.cssText = 'margin-top:8px; font-size:13px; color:#8ba9b9; text-align:center;';
        caption.textContent = '👆 Нажми на фото, чтобы открыть (потребуется реклама)';
        div.appendChild(caption);
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            YandexSDK.showFullscreenAdv({
                callbacks: {
                    onClose: (wasShown) => {
                        if (wasShown) {
                            img.classList.remove('blurred-photo');
                            img.classList.add('unblurred');
                            gameState.flags.photoUnlocked = true;
                            saveGame();
                        }
                    }
                }
            });
        });
    } else {
        img.classList.add('unblurred');
        div.appendChild(img);
        if (prompt) {
            const caption = document.createElement('div');
            caption.style.cssText = 'margin-top:6px; font-size:12px; color:#8ba9b9; font-style:italic; text-align:center;';
            caption.textContent = '📷 ' + prompt;
            div.appendChild(caption);
        }
    }
    messagesContainer.insertBefore(div, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showOptions(options, clickHandler) {
    optionsContainer.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (opt.hidden) {
            btn.classList.add('hidden-option');
            btn.innerHTML = `<span>🔒 ${opt.label}</span><span class="lock-icon">🔒</span>`;
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                YandexSDK.showFullscreenAdv({
                    callbacks: {
                        onClose: (wasShown) => {
                            if (wasShown) {
                                opt.hidden = false;
                                showOptions(options, clickHandler);
                            }
                        }
                    }
                });
            });
        } else {
            btn.textContent = opt.label;
            btn.addEventListener('click', function() {
                if (clickHandler) clickHandler(opt.id, opt.label);
            });
        }
        optionsContainer.appendChild(btn);
    });
}

async function displayMessagesWithDelay(messages) {
    for (let msg of messages) {
        showTyping();
        const delay = randomInt(4000, 10000);
        await sleep(delay);
        hideTyping();
        addMessage(msg.sender, msg.text);
    }
}

async function loadDay(dayKey, stageKey = null) {
    if (gameState.flags.gameEnded) return;

    const dayData = GAME_SCRIPT[dayKey];
    if (!dayData) {
        showEndGame();
        return;
    }

    let dayLabel = dayData.dayLabel || 'День ' + dayKey.replace('day','');
    let messagesToShow = [];
    let optionsToShow = [];
    let reactions = null;
    let statsMap = null;
    let nextDay = null;
    let hasPhoto = false;
    let photoUrl = '';
    let photoBlurred = true;
    let photoPrompt = null;

    if (dayKey === 'day5') {
        if (!stageKey) stageKey = 'stage1';
        const stage = dayData[stageKey];
        if (!stage) {
            if (dayData.nextDay) {
                gameState.currentDay = dayData.nextDay;
                loadDay(dayData.nextDay);
            } else {
                showEndGame();
            }
            return;
        }
        messagesToShow = stage.messages;
        optionsToShow = stage.options;
        reactions = stage.reactions;
        statsMap = stage.stats;
        gameState.stage = stageKey;
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
    }

    clearMessages();
    addSystemMessage(`📅 ${dayLabel}`);

    // Ускоренный старт для первого дня (без этапов)
    let initialDelay = 20000;
    if (dayKey === 'day1' && stageKey === null) {
        initialDelay = 5000;
    }
    await sleep(initialDelay);

    await displayMessagesWithDelay(messagesToShow);

    if (hasPhoto) {
        const blurred = photoBlurred && !gameState.flags.photoUnlocked;
        showPhoto(photoUrl, blurred, photoPrompt);
        await sleep(1000);
    }

    showOptions(optionsToShow, async function(optionId, optionLabel) {
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

        // Добавляем сообщение игрока в чат
        addMessage('player', optionLabel);
        await sleep(1000); // небольшая пауза перед ответом учителя

        const reaction = reactions[optionId];
        if (reaction) {
            await displayMessagesWithDelay(reaction);
        }

        const stat = statsMap[optionId];
        if (stat) {
            gameState.stats.success += stat.success;
            gameState.stats.romance += stat.romance;
            gameState.stats.humor += stat.humor;
            updateStatsBar();
        }

        gameState.history.push(optionId);
        await saveGame();

        optionsContainer.innerHTML = '';

        await sleep(15000);

        if (dayKey === 'day5') {
            if (stageKey === 'stage1') {
                gameState.flags.day5Stage1Done = true;
                loadDay('day5', 'stage2');
            } else if (stageKey === 'stage2') {
                gameState.flags.day5Stage2Done = true;
                loadDay('day5', 'stage3');
            } else if (stageKey === 'stage3') {
                gameState.flags.day5Stage3Done = true;
                if (dayData.nextDay) {
                    gameState.currentDay = dayData.nextDay;
                    loadDay(dayData.nextDay);
                } else {
                    showEndGame();
                }
            }
        } else {
            if (nextDay) {
                gameState.currentDay = nextDay;
                loadDay(nextDay);
            } else {
                if (dayData.finalMessage) {
                    showFinalMessage(dayData);
                } else {
                    gameState.flags.gameEnded = true;
                    showEndGame();
                }
            }
        }
    });
}

function showFinalMessage(dayData) {
    clearMessages();
    if (dayData.finalMessage) {
        dayData.finalMessage.forEach(msg => {
            let text = msg.text;
            text = text.replace(/\{\{success\}\}/g, gameState.stats.success);
            text = text.replace(/\{\{romance\}\}/g, gameState.stats.romance);
            text = text.replace(/\{\{humor\}\}/g, gameState.stats.humor);
            addMessage(msg.sender, text);
        });
    }
    optionsContainer.innerHTML = '';
    const restartBtn = document.createElement('button');
    restartBtn.className = 'option-btn';
    restartBtn.textContent = '🔄 Пройти заново';
    restartBtn.addEventListener('click', function() { resetGame(); });
    optionsContainer.appendChild(restartBtn);
}

function showEndGame() {
    clearMessages();
    addMessage('system', '🎮 Игра завершена. Спасибо за прохождение!');
    optionsContainer.innerHTML = '';
    const restartBtn = document.createElement('button');
    restartBtn.className = 'option-btn';
    restartBtn.textContent = '🔄 Начать заново';
    restartBtn.addEventListener('click', function() { resetGame(); });
    optionsContainer.appendChild(restartBtn);
}

async function saveGame() {
    const data = {
        currentDay: gameState.currentDay,
        stage: gameState.stage,
        stats: gameState.stats,
        flags: gameState.flags,
        history: gameState.history
    };
    await YandexSDK.setData({ gameData: JSON.stringify(data) });
}

async function loadGame() {
    const saved = await YandexSDK.getData();
    if (saved && saved.gameData) {
        try {
            const data = JSON.parse(saved.gameData);
            gameState.currentDay = data.currentDay || 'day1';
            gameState.stage = data.stage || null;
            gameState.stats = data.stats || { success: 0, romance: 0, humor: 0 };
            gameState.flags = data.flags || { photoUnlocked: false, day5Stage1Done: false, day5Stage2Done: false, day5Stage3Done: false, gameEnded: false };
            gameState.history = data.history || [];
            return true;
        } catch(e) {
            console.warn('Ошибка загрузки сохранения', e);
        }
    }
    return false;
}

function resetGame() {
    gameState = {
        currentDay: 'day1',
        stage: null,
        stats: { success: 0, romance: 0, humor: 0 },
        flags: { photoUnlocked: false, day5Stage1Done: false, day5Stage2Done: false, day5Stage3Done: false, gameEnded: false },
        history: []
    };
    saveGame();
    updateStatsBar();
    loadDay('day1');
}

(async function init() {
    await YandexSDK.init();
    const hasSave = await loadGame();
    updateStatsBar();

    if (hasSave && !gameState.flags.gameEnded) {
        if (gameState.currentDay === 'day5') {
            let stageKey = 'stage1';
            if (gameState.flags.day5Stage1Done && !gameState.flags.day5Stage2Done) stageKey = 'stage2';
            else if (gameState.flags.day5Stage2Done && !gameState.flags.day5Stage3Done) stageKey = 'stage3';
            else if (gameState.flags.day5Stage3Done) {
                if (GAME_SCRIPT['day5'].nextDay) {
                    gameState.currentDay = GAME_SCRIPT['day5'].nextDay;
                    loadDay(gameState.currentDay);
                } else {
                    showEndGame();
                }
                return;
            }
            loadDay('day5', stageKey);
        } else {
            loadDay(gameState.currentDay);
        }
    } else {
        loadDay('day1');
    }
})();