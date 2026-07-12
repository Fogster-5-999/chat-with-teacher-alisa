// ================================================================
// 1. СОСТОЯНИЕ ИГРЫ
// ================================================================
let gameState = {
    currentDay: 'day1',
    stage: null,
    stats: { success: 0, romance: 0, humor: 0 },
    flags: {
        photoUnlocked: false,
        day5Stage1Done: false,
        day5Stage2Done: false,
        day5Stage3Done: false,
        gameEnded: false,
        shownNotifs: {}   // какие push-уведомления (типа сообщения от друга) уже показывались
    },
    messages: []          // все сообщения { sender, text, timestamp, isHtml }
};

let currentDate = null;          // текущая дата для дня
let currentTime = null;          // текущее время внутри дня (для монотонности)

// ================================================================
// 2. АУДИО
// ================================================================
let bgMusic = null;
let notificationSound = null;
let isMusicPlaying = false;
let musicUserToggled = false; // ставится в true, если игрок сам нажал на кнопку музыки

// ================================================================
// ФОТО УЧИТЕЛЬНИЦЫ
// ================================================================
// Впиши сюда путь к фото (например 'res/alisa.jpg'), когда оно будет готово —
// оно автоматически появится и в шапке, и в профиле вместо эмодзи.
const TEACHER_PHOTO_URL = 'res/ava.png';

function applyTeacherPhoto() {
    if (!TEACHER_PHOTO_URL) return;
    const headerImg = document.getElementById('avatar-img');
    const headerEmoji = document.getElementById('avatar-emoji');
    const profileImg = document.getElementById('profile-avatar-img');
    const profileEmoji = document.getElementById('profile-avatar-emoji');
    const pairs = [[headerImg, headerEmoji], [profileImg, profileEmoji]];
    pairs.forEach(([img, emoji]) => {
        if (!img) return;
        img.addEventListener('load', function() {
            img.classList.add('has-photo');
            if (emoji) emoji.classList.add('hidden');
        });
        img.addEventListener('error', function() {
            // Файла ещё нет — остаёмся на эмодзи-заглушке, ничего не ломаем.
            img.classList.remove('has-photo');
            if (emoji) emoji.classList.remove('hidden');
        });
        img.src = TEACHER_PHOTO_URL;
    });
}

function initAudio() {
    try {
        bgMusic = new Audio('res/background.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
        console.log('Фоновая музыка загружена (res/background.mp3)');
    } catch (e) {
        console.warn('Не удалось загрузить фоновую музыку:', e);
    }
    try {
        notificationSound = new Audio('res/message.mp3');
        notificationSound.volume = 0.5;
        notificationSound.preload = 'auto';
        console.log('Звук уведомления загружен (res/message.mp3)');
    } catch (e) {
        console.warn('Не удалось загрузить звук уведомления:', e);
    }
}

function toggleMusic() {
    musicUserToggled = true;
    if (!bgMusic) {
        console.warn('Фоновая музыка не загружена');
        return;
    }
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        document.getElementById('music-toggle').textContent = '🔇';
        console.log('Музыка выключена');
    } else {
        bgMusic.play().catch(e => console.warn('Не удалось запустить музыку:', e));
        isMusicPlaying = true;
        document.getElementById('music-toggle').textContent = '🔊';
        console.log('Музыка включена');
    }
}

let pendingNotificationSound = false;

function playNotification() {
    if (!notificationSound) {
        console.warn('Звук уведомления не загружен');
        return;
    }
    try { notificationSound.currentTime = 0; } catch (e) {}
    const p = notificationSound.play();
    if (p && typeof p.catch === 'function') {
        p.catch(e => {
            // Браузер заблокировал автоматическое воспроизведение —
            // доиграем звук на самом ближайшем тапе игрока.
            console.warn('Не удалось проиграть уведомление сразу, отложено до следующего тапа:', e);
            pendingNotificationSound = true;
        });
    }
}

document.addEventListener('click', function playPendingNotification() {
    if (pendingNotificationSound && notificationSound) {
        pendingNotificationSound = false;
        try { notificationSound.currentTime = 0; } catch (e) {}
        notificationSound.play().catch(() => {});
    }
});

// ================================================================
// 3. YANDEX SDK (ЭМУЛЯЦИЯ)
// ================================================================
const YandexSDK = {
    isReady: false,
    init: async function() {
        console.log('SDK инициализирован (эмуляция)');
        this.isReady = true;
        return this;
    },
    setData: async function(data) {
        console.log('Сохраняем данные:', data);
        try { localStorage.setItem('game_save', JSON.stringify(data)); } catch (e) {}
        return true;
    },
    getData: async function() {
        console.log('Загружаем данные');
        try {
            const raw = localStorage.getItem('game_save');
            if (raw) return JSON.parse(raw);
        } catch (e) {}
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
            if (callbacks && callbacks.onClose) callbacks.onClose(true);
        };
        closeBtn.addEventListener('click', handler);
        if (callbacks && callbacks.onOpen) callbacks.onOpen();
    }
};

// ================================================================
// 4. DOM-ЭЛЕМЕНТЫ
// ================================================================
const messagesContainer = document.getElementById('messages');
const optionsContainer = document.getElementById('options');
const statSuccess = document.getElementById('stat-success');
const statRomance = document.getElementById('stat-romance');
const statHumor = document.getElementById('stat-humor');
const typingIndicator = document.getElementById('typing-indicator');
const networkStatus = document.getElementById('network-status');
const profileModal = document.getElementById('profile-modal');
const closeProfileBtn = document.getElementById('close-profile');
const avatar = document.getElementById('avatar');

// ================================================================
// 5. ПРОФИЛЬ
// ================================================================
const headerText = document.getElementById('header-text');
const headerStatusEl = document.getElementById('status');
const profileStatusEl = document.getElementById('profile-status');

function openProfile() {
    if (profileStatusEl && headerStatusEl) {
        profileStatusEl.textContent = headerStatusEl.textContent;
    }
    profileModal.classList.add('active');
}
function closeProfile() {
    profileModal.classList.remove('active');
}

const profileAvatarLarge = document.getElementById('profile-avatar-large');
const profileAvatarImgEl = document.getElementById('profile-avatar-img');
if (profileAvatarLarge) {
    profileAvatarLarge.addEventListener('click', function(e) {
        e.stopPropagation();
        if (profileAvatarImgEl && profileAvatarImgEl.classList.contains('has-photo')) {
            openLightbox(TEACHER_PHOTO_URL);
        }
    });
}

avatar.addEventListener('click', function(e) {
    e.stopPropagation();
    openProfile();
});
if (headerText) {
    headerText.addEventListener('click', function(e) {
        e.stopPropagation();
        openProfile();
    });
}
closeProfileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closeProfile();
});

// ================================================================
// 6. МУЗЫКА
// ================================================================
document.getElementById('music-toggle').addEventListener('click', toggleMusic);

// В Yandex Games (и в браузерах вообще) музыка не может начать играть без
// действия игрока — запускаем её на первом же тапе по экрану, если игрок
// сам ещё не трогал кнопку музыки.
document.addEventListener('click', function autoStartMusic() {
    if (!musicUserToggled && bgMusic && !isMusicPlaying) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            document.getElementById('music-toggle').textContent = '🔊';
        }).catch(() => {});
    }
    // "Разблокируем" звук уведомления первым тапом: некоторые браузеры/вебвью
    // (в т.ч. в Yandex Games) блокируют play(), если он вызван не напрямую
    // из клика — а playNotification() у нас срабатывает позже, из таймеров.
    if (notificationSound && !notificationSound.dataset.unlocked) {
        notificationSound.dataset.unlocked = '1';
        const vol = notificationSound.volume;
        notificationSound.volume = 0;
        notificationSound.play().then(() => {
            notificationSound.pause();
            notificationSound.currentTime = 0;
            notificationSound.volume = vol;
        }).catch(() => {
            notificationSound.volume = vol;
        });
    }
}, { once: false });

// ================================================================
// 7. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ================================================================
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function updateStatsBar() {
    statSuccess.textContent = gameState.stats.success;
    statRomance.textContent = gameState.stats.romance;
    statHumor.textContent = gameState.stats.humor;
}

function formatTime(date) {
    return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
}

function formatDate(date) {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${date.getDate()} ${months[date.getMonth()]}, ${days[date.getDay()]}`;
}

function getNextMessageTime() {
    if (!currentTime) {
        currentTime = new Date(currentDate);
        currentTime.setMinutes(currentTime.getMinutes() + randomInt(0, 5));
    } else {
        const delta = randomInt(1, 5);
        currentTime = new Date(currentTime);
        currentTime.setMinutes(currentTime.getMinutes() + delta);
    }
    return new Date(currentTime);
}

// ================================================================
// 8. РЕНДЕРИНГ СООБЩЕНИЙ
// ================================================================
function addMessageToHistory(sender, text, timestamp, isHtml = false) {
    if (!timestamp) timestamp = new Date();
    const msgObj = { sender, text, timestamp: timestamp.toISOString(), isHtml };
    gameState.messages.push(msgObj);
    renderMessage(msgObj);
    saveGame();
}

function renderMessage(msgObj) {
    const { sender, timestamp } = msgObj;
    const date = new Date(timestamp);

    const div = document.createElement('div');
    div.className = 'message ' + (
        sender === 'alisa' ? 'incoming' :
        sender === 'system' ? 'system' : 'outgoing'
    );

    if (msgObj.type === 'photo') {
        renderPhotoContent(div, msgObj);
    } else {
        const contentSpan = document.createElement('span');
        if (msgObj.isHtml) contentSpan.innerHTML = msgObj.text;
        else contentSpan.textContent = msgObj.text;
        div.appendChild(contentSpan);
    }

    if (sender !== 'system') {
        const timeSpan = document.createElement('div');
        timeSpan.className = 'time';
        timeSpan.textContent = formatTime(date);
        div.appendChild(timeSpan);
    }

    // Вставляем перед индикатором печати
    messagesContainer.insertBefore(div, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function renderAllMessages() {
    // Удаляем все дочерние элементы, кроме networkStatus и typingIndicator
    while (messagesContainer.firstChild) {
        const child = messagesContainer.firstChild;
        if (child === networkStatus || child === typingIndicator) break;
        messagesContainer.removeChild(child);
    }
    // Перемещаем индикаторы в конец
    messagesContainer.appendChild(networkStatus);
    messagesContainer.appendChild(typingIndicator);
    // Добавляем все сообщения из истории
    if (gameState.messages && gameState.messages.length > 0) {
        gameState.messages.forEach(msg => renderMessage(msg));
    }
}

function addDayDivider(date) {
    const div = document.createElement('div');
    div.className = 'day-divider';
    div.textContent = formatDate(date);
    messagesContainer.insertBefore(div, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
    typingIndicator.style.display = 'flex';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function hideTyping() {
    typingIndicator.style.display = 'none';
}
function showNetworkStatus() {
    // Переносим индикатор к последнему сообщению (в самый низ ленты),
    // а не оставляем его прибитым к верху контейнера.
    messagesContainer.insertBefore(networkStatus, typingIndicator);
    networkStatus.style.display = 'block';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function hideNetworkStatus() {
    networkStatus.style.display = 'none';
}

// ================================================================
// 8.1 ПУШ-УВЕДОМЛЕНИЕ (например, сообщение от друга поверх чата)
// ================================================================
const pushNotification = document.getElementById('push-notification');
const pushNotifName = document.getElementById('push-notif-name');
const pushNotifText = document.getElementById('push-notif-text');
let pushNotifTimer = null;

function showFriendNotification(name, text, durationMs = 5000) {
    if (!pushNotification) return;
    pushNotifName.textContent = 'Друг (' + name + ')';
    pushNotifText.textContent = text;
    pushNotification.classList.add('active');
    playNotification();
    clearTimeout(pushNotifTimer);
    pushNotifTimer = setTimeout(hideFriendNotification, durationMs);
}
function hideFriendNotification() {
    if (!pushNotification) return;
    pushNotification.classList.remove('active');
}
if (pushNotification) {
    pushNotification.addEventListener('click', hideFriendNotification);
}

// ================================================================
// 9. ФОТО
// ================================================================
function showPhoto(photoUrl, blurred = true, prompt = null) {
    const timestamp = getNextMessageTime();
    const msgObj = {
        sender: 'alisa',
        type: 'photo',
        photoUrl,
        blurred,       // изначальная задумка (нужна ли реклама для открытия)
        prompt,
        timestamp: timestamp.toISOString()
    };
    gameState.messages.push(msgObj);
    renderMessage(msgObj);
    saveGame();
}

// Строит содержимое сообщения-фото. Состояние блюра считается каждый раз
// заново из gameState.flags.photoUnlocked, поэтому корректно переживает
// перезагрузку страницы (а не запекается в сохранённый HTML).
function renderPhotoContent(container, msgObj) {
    const { photoUrl, blurred, prompt } = msgObj;
    const isLocked = blurred && !gameState.flags.photoUnlocked;

    const wrap = document.createElement('div');

    const img = document.createElement('img');
    img.style.width = '100%';
    img.style.borderRadius = '12px';
    img.className = isLocked ? 'blurred-photo' : 'unblurred';
    img.addEventListener('error', function() {
        // Файл ещё не добавлен — показываем аккуратную заглушку вместо "битой" картинки.
        img.style.display = 'none';
        const stub = document.createElement('div');
        stub.className = 'photo-placeholder';
        stub.style.pointerEvents = 'none';
        stub.textContent = '📷 фото ещё не добавлено (' + photoUrl + ')';
        wrap.insertBefore(stub, img);
    }, { once: true });
    img.src = photoUrl;
    wrap.appendChild(img);

    if (prompt) {
        const promptDiv = document.createElement('div');
        promptDiv.style.cssText = 'margin-top:6px; font-size:12px; color:#8ba9b9; font-style:italic; text-align:center;';
        promptDiv.textContent = '📷 ' + prompt;
        wrap.appendChild(promptDiv);
    }

    const hintDiv = document.createElement('div');
    hintDiv.style.cssText = 'margin-top:8px; font-size:13px; color:#8ba9b9; text-align:center;';
    hintDiv.textContent = isLocked
        ? '👆 Нажми на фото, чтобы открыть (потребуется реклама)'
        : '👆 Нажми на фото, чтобы рассмотреть поближе';
    wrap.appendChild(hintDiv);

    container.appendChild(wrap);

    if (isLocked) {
        img.addEventListener('click', function unlockHandler(e) {
            e.stopPropagation();
            YandexSDK.showFullscreenAdv({
                callbacks: {
                    onClose: (wasShown) => {
                        if (wasShown) {
                            gameState.flags.photoUnlocked = true;
                            img.classList.remove('blurred-photo');
                            img.classList.add('unblurred');
                            hintDiv.textContent = '👆 Нажми на фото, чтобы рассмотреть поближе';
                            img.removeEventListener('click', unlockHandler);
                            img.addEventListener('click', function(e2) {
                                e2.stopPropagation();
                                openLightbox(photoUrl);
                            });
                            saveGame();
                        }
                    }
                }
            });
        });
    } else {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(photoUrl);
        });
    }
}

// ================================================================
// 9.1 ЛАЙТБОКС (просмотр фото крупнее)
// ================================================================
const photoLightbox = document.getElementById('photo-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(url) {
    if (!url) return;
    lightboxImg.src = url;
    photoLightbox.classList.add('active');
}
function closeLightbox() {
    photoLightbox.classList.remove('active');
}
if (lightboxClose) {
    lightboxClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeLightbox();
    });
}
if (photoLightbox) {
    photoLightbox.addEventListener('click', function(e) {
        if (e.target === this) closeLightbox();
    });
}

// ================================================================
// 10. ВАРИАНТЫ ОТВЕТОВ
// ================================================================
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

// ================================================================
// 11. ОСНОВНАЯ ЛОГИКА ЗАГРУЗКИ ДНЯ
// ================================================================
async function loadDay(dayKey, stageKey = null) {
    if (gameState.flags.gameEnded) return;

    const dayData = GAME_SCRIPT[dayKey];
    if (!dayData) {
        showEndGame();
        return;
    }

    // --- Устанавливаем дату для дня ---
    if (!currentDate) {
        const now = new Date();
        currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0, 0);
    } else {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
        const hours = randomInt(8, 23);
        currentDate.setHours(hours, randomInt(0, 59), 0, 0);
    }
    currentTime = null;

    // --- Сначала показываем индикатор сети ---
    showNetworkStatus();
    const initialDelay = (dayKey === 'day1' && stageKey === null) ? 5000 : 20000;
    await sleep(initialDelay);
    hideNetworkStatus();

    // --- Теперь добавляем разделитель дня и сообщения ---
    addDayDivider(currentDate);

    // --- Подготовка данных ---
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
                gameState.currentDay = dayData.nextDay;
                loadDay(dayData.nextDay);
            } else showEndGame();
            return;
        }
        messagesToShow = stage.messages;
        optionsToShow = stage.options;
        reactions = stage.reactions;
        statsMap = stage.stats;
        friendNotification = stage.friendNotification || null;
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
        friendNotification = dayData.friendNotification || null;
    }

    // --- Пуш-уведомление от друга (один раз за стадию/день) ---
    if (friendNotification) {
        const notifKey = dayKey + (stageKey ? ':' + stageKey : '');
        if (!gameState.flags.shownNotifs[notifKey]) {
            gameState.flags.shownNotifs[notifKey] = true;
            saveGame();
            showFriendNotification(friendNotification.name, friendNotification.text);
        }
    }

    // --- Показываем сообщения с индикатором печати ---
    for (let msg of messagesToShow) {
        showTyping();
        const delay = randomInt(4000, 10000);
        await sleep(delay);
        hideTyping();

        const msgTime = getNextMessageTime();
        if (msg.sender === 'system') {
            addMessageToHistory('system', msg.text, msgTime);
        } else {
            addMessageToHistory('alisa', msg.text, msgTime);
        }
    }

    // --- Фото ---
    if (hasPhoto) {
        await sleep(1500);
        showPhoto(photoUrl, photoBlurred && !gameState.flags.photoUnlocked, photoPrompt);
    }

    // --- Показываем варианты ---
    showOptions(optionsToShow, async function(optionId, optionLabel) {
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

        // Ответ игрока
        const playerTime = getNextMessageTime();
        addMessageToHistory('player', optionLabel, playerTime);
        await sleep(1000);

        // Реакции
        const reaction = reactions[optionId];
        if (reaction) {
            for (let msg of reaction) {
                showTyping();
                const delay = randomInt(4000, 10000);
                await sleep(delay);
                hideTyping();
                const msgTime = getNextMessageTime();
                addMessageToHistory('alisa', msg.text, msgTime);
            }
        }

        // Статистика
        const stat = statsMap[optionId];
        if (stat) {
            gameState.stats.success += stat.success;
            gameState.stats.romance += stat.romance;
            gameState.stats.humor += stat.humor;
            updateStatsBar();
        }

        await saveGame();
        optionsContainer.innerHTML = '';

        // Через 3 сек после конца переписки начинается загрузка следующего дня
        // (дальше всё как обычно — showNetworkStatus внутри loadDay).
        await sleep(3000);

        // Переход
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
                } else showEndGame();
            }
        } else {
            if (nextDay) {
                gameState.currentDay = nextDay;
                loadDay(nextDay);
            } else {
                if (dayData.finalMessage) showFinalMessage(dayData);
                else { gameState.flags.gameEnded = true; showEndGame(); }
            }
        }
    });
}

// ================================================================
// 12. ФИНАЛ
// ================================================================
function showFinalMessage(dayData) {
    // Скрываем индикаторы
    hideNetworkStatus();
    hideTyping();

    if (dayData.finalMessage) {
        dayData.finalMessage.forEach(msg => {
            let text = msg.text.replace(/\{\{success\}\}/g, gameState.stats.success)
                               .replace(/\{\{romance\}\}/g, gameState.stats.romance)
                               .replace(/\{\{humor\}\}/g, gameState.stats.humor);
            addMessageToHistory('system', text, new Date());
        });
    }
    optionsContainer.innerHTML = '';
    const restartBtn = document.createElement('button');
    restartBtn.className = 'option-btn';
    restartBtn.textContent = '🔄 Пройти заново';
    restartBtn.addEventListener('click', resetGame);
    optionsContainer.appendChild(restartBtn);
}

function showEndGame() {
    hideNetworkStatus();
    hideTyping();

    addMessageToHistory('system', '🎮 Игра завершена. Спасибо за прохождение!', new Date());
    optionsContainer.innerHTML = '';
    const restartBtn = document.createElement('button');
    restartBtn.className = 'option-btn';
    restartBtn.textContent = '🔄 Начать заново';
    restartBtn.addEventListener('click', resetGame);
    optionsContainer.appendChild(restartBtn);
}

// ================================================================
// 13. СОХРАНЕНИЕ / ЗАГРУЗКА / СБРОС
// ================================================================
async function saveGame() {
    const data = {
        currentDay: gameState.currentDay,
        stage: gameState.stage,
        stats: gameState.stats,
        flags: gameState.flags,
        messages: gameState.messages,
        currentDate: currentDate ? currentDate.toISOString() : null
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
            gameState.flags = data.flags || { photoUnlocked: false, day5Stage1Done: false, day5Stage2Done: false, day5Stage3Done: false, gameEnded: false, shownNotifs: {} };
            if (!gameState.flags.shownNotifs) gameState.flags.shownNotifs = {};
            gameState.messages = data.messages || [];
            if (data.currentDate) currentDate = new Date(data.currentDate);
            else currentDate = null;
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
        flags: { photoUnlocked: false, day5Stage1Done: false, day5Stage2Done: false, day5Stage3Done: false, gameEnded: false, shownNotifs: {} },
        messages: []
    };
    currentDate = null;
    currentTime = null;
    saveGame();
    updateStatsBar();
    // Очищаем контейнер, сохраняя индикаторы
    while (messagesContainer.firstChild) {
        const child = messagesContainer.firstChild;
        if (child === networkStatus || child === typingIndicator) break;
        messagesContainer.removeChild(child);
    }
    // Перемещаем индикаторы в конец
    messagesContainer.appendChild(networkStatus);
    messagesContainer.appendChild(typingIndicator);
    // Скрываем их
    hideNetworkStatus();
    hideTyping();
    loadDay('day1');
}

// ================================================================
// 14. ЗАПУСК
// ================================================================
(async function init() {
    initAudio();
    applyTeacherPhoto();
    await YandexSDK.init();
    const hasSave = await loadGame();
    updateStatsBar();

    if (gameState.messages.length > 0) {
        renderAllMessages();
    }

    if (hasSave && !gameState.flags.gameEnded) {
        if (gameState.currentDay === 'day5') {
            let stageKey = 'stage1';
            if (gameState.flags.day5Stage1Done && !gameState.flags.day5Stage2Done) stageKey = 'stage2';
            else if (gameState.flags.day5Stage2Done && !gameState.flags.day5Stage3Done) stageKey = 'stage3';
            else if (gameState.flags.day5Stage3Done) {
                if (GAME_SCRIPT['day5'].nextDay) {
                    gameState.currentDay = GAME_SCRIPT['day5'].nextDay;
                    loadDay(gameState.currentDay);
                } else showEndGame();
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