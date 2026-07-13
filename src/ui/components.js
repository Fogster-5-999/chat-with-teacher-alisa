import { playNotificationSound } from '../engine/audio.js';
import { openLightbox } from './lightbox.js';
import { t, getCurrentLanguage } from '../data/translations.js';

const messagesContainer = document.getElementById('messages');
const optionsContainer = document.getElementById('options');
const typingIndicator = document.getElementById('typing-indicator');
const networkStatus = document.getElementById('network-status');

let _savedOptions = null;
let _savedHandler = null;

export function renderMessage(msgObj) {
    const { sender, textKey, text, timestamp, isHtml, type, photoUrl, blurred, prompt, isLocked } = msgObj;
    const date = new Date(timestamp);
    const div = document.createElement('div');
    div.className = 'message ' + (sender === 'alisa' ? 'incoming' : sender === 'system' ? 'system' : 'outgoing');

    if (type === 'photo') {
        renderPhotoContent(div, { photoUrl, blurred, prompt, isLocked });
    } else {
        const contentSpan = document.createElement('span');
        const translated = t(textKey || '');
        const displayText = (translated === (textKey || '')) ? (text || translated) : translated;
        if (isHtml) contentSpan.innerHTML = displayText;
        else contentSpan.textContent = displayText;
        div.appendChild(contentSpan);
    }

    if (sender !== 'system') {
        const timeSpan = document.createElement('div');
        timeSpan.className = 'time';
        timeSpan.textContent = formatTime(date);
        div.appendChild(timeSpan);
    }

    messagesContainer.insertBefore(div, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function renderAllMessages(messages) {
    clearMessages();
    if (messages && messages.length > 0) {
        messages.forEach(msg => renderMessage(msg));
    }
}

export function addDayDivider(date) {
    const div = document.createElement('div');
    div.className = 'day-divider';
    div.textContent = formatDate(date);
    messagesContainer.insertBefore(div, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function clearMessages() {
    while (messagesContainer.firstChild) {
        const child = messagesContainer.firstChild;
        if (child === networkStatus || child === typingIndicator) break;
        messagesContainer.removeChild(child);
    }
}

export function showTyping() {
    typingIndicator.style.display = 'flex';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
export function hideTyping() {
    typingIndicator.style.display = 'none';
}
export function showNetworkStatus() {
    messagesContainer.insertBefore(networkStatus, typingIndicator);
    networkStatus.style.display = 'block';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
export function hideNetworkStatus() {
    networkStatus.style.display = 'none';
}

function renderPhotoContent(container, { photoUrl, blurred, prompt, isLocked }) {
    const wrap = document.createElement('div');
    const img = document.createElement('img');
    img.style.width = '100%';
    img.style.borderRadius = '12px';
    img.className = isLocked ? 'blurred-photo' : 'unblurred';
    img.onerror = function() {
        img.style.display = 'none';
        const stub = document.createElement('div');
        stub.className = 'photo-placeholder';
        stub.textContent = t('photo.error') + photoUrl + ')';
        wrap.insertBefore(stub, img);
    };
    const normalizedUrl = (photoUrl || '').startsWith('res/') ? photoUrl : `res/${photoUrl}`;
    img.src = normalizedUrl;
    wrap.appendChild(img);

    if (prompt) {
        const promptDiv = document.createElement('div');
        promptDiv.style.cssText = 'margin-top:6px; font-size:12px; color:var(--text-secondary); font-style:italic; text-align:center;';
        promptDiv.textContent = '📷 ' + t(prompt);
        wrap.appendChild(promptDiv);
    }

    const hintDiv = document.createElement('div');
    hintDiv.style.cssText = 'margin-top:8px; font-size:13px; color:var(--text-secondary); text-align:center;';
    hintDiv.textContent = isLocked
        ? t('photo.hint_locked')
        : t('photo.hint_unlocked');
    wrap.appendChild(hintDiv);

    container.appendChild(wrap);

    if (isLocked) {
        img.addEventListener('click', function unlockHandler(e) {
            e.stopPropagation();
            import('../engine/sdk.js').then(({ showAd }) => {
                showAd({
                    callbacks: {
                        onClose: (wasShown) => {
                            if (wasShown) {
                                if (window.unlockPhoto) window.unlockPhoto();
                                img.classList.remove('blurred-photo');
                                img.classList.add('unblurred');
                                hintDiv.textContent = t('photo.hint_unlocked');
                                img.removeEventListener('click', unlockHandler);
                                img.addEventListener('click', function(e2) {
                                    e2.stopPropagation();
                                    openLightbox(normalizedUrl);
                                });
                            }
                        }
                    }
                });
            });
        });
    } else {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(normalizedUrl);
        });
    }
}

export function hideOptions() {
    optionsContainer.style.display = 'none';
}

function showOptionsContainer() {
    optionsContainer.style.display = 'flex';
}

export function reRenderSavedOptions() {
    if (_savedOptions && _savedHandler !== null) {
        showOptions(_savedOptions, _savedHandler);
    }
}

export function showOptions(options, clickHandler) {
    hideTyping();
    if (options && options.length > 0) {
        _savedOptions = [...options];
        _savedHandler = clickHandler;
    }
    optionsContainer.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (opt.hidden) {
            btn.classList.add('hidden-option');
            const costBadge = opt.cost && opt.cost > 1 ? ` <span class="cost-badge">📺×${opt.cost}</span>` : '';
            btn.innerHTML = `<span>🔒 ${t(opt.label)}${costBadge}</span><span class="lock-icon">🔒</span>`;
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const adsNeeded = opt.cost && opt.cost > 0 ? opt.cost : 1;
                let adsWatched = 0;
                function watchNextAd() {
                    import('../engine/sdk.js').then(({ showAd }) => {
                        showAd({
                            callbacks: {
                                onClose: (wasShown) => {
                                    if (!wasShown) return;
                                    adsWatched++;
                                    if (adsWatched >= adsNeeded) {
                                        opt.hidden = false;
                                        showOptions(options, clickHandler);
                                    } else {
                                        watchNextAd();
                                    }
                                }
                            }
                        });
                    });
                }
                watchNextAd();
            });
        } else {
            const labelText = t(opt.label);
            btn.textContent = labelText;
            btn.addEventListener('click', function() {
                if (clickHandler) clickHandler(opt.id, opt.label);
            });
        }
        optionsContainer.appendChild(btn);
    });
    showOptionsContainer();
}

function formatTime(date) {
    return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
}
function formatDate(date) {
    const lang = getCurrentLanguage();
    if (lang === 'en') {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
    }
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${date.getDate()} ${months[date.getMonth()]}, ${days[date.getDay()]}`;
}

export function renderFinalScreen(messages) {
    clearMessages();
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'message system';
        const sourceText = msg.textKey || msg.text || '';
        div.textContent = t(sourceText);
        messagesContainer.insertBefore(div, typingIndicator);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function showMiniTest(test, onAnswer) {
    return new Promise(resolve => {
        // create modal overlay for mini-chat test
        const overlay = document.createElement('div');
        overlay.className = 'mini-test-modal';
        overlay.innerHTML = `
            <div class="mini-test-card">
                <div class="mini-test-chat"></div>
                <div class="mini-test-controls"></div>
            </div>`;
        document.getElementById('app').appendChild(overlay);

        const chat = overlay.querySelector('.mini-test-chat');
        const controls = overlay.querySelector('.mini-test-controls');

        function appendChatBubble(sender, text) {
            const d = document.createElement('div');
            d.className = 'mini-chat-bubble ' + (sender === 'alisa' ? 'incoming' : 'outgoing');
            d.textContent = text;
            chat.appendChild(d);
            chat.scrollTop = chat.scrollHeight;
        }

        appendChatBubble('alisa', t(test.intro || ''));

        let idx = 0;
        let correctCount = 0;

        function renderQuestion() {
            controls.innerHTML = '';
            if (idx >= (test.questions || []).length) {
                // finish
                setTimeout(() => {
                    overlay.remove();
                    resolve(correctCount);
                }, 300);
                return;
            }
            const q = test.questions[idx];
            appendChatBubble('alisa', t(q.text));

            const choicesWrap = document.createElement('div');
            choicesWrap.className = 'mini-test-choices';
            (q.choices || []).forEach((ch, i) => {
                const b = document.createElement('button');
                b.className = 'option-btn mini-test-choice';
                b.textContent = ch;
                b.addEventListener('click', function() {
                    // show player's choice in mini-chat
                    appendChatBubble('player', ch);
                    // disable
                    choicesWrap.querySelectorAll('button').forEach(x => x.disabled = true);
                    const isCorrect = (i === q.correct);
                    if (isCorrect) correctCount++;
                    if (onAnswer) onAnswer(q, ch, isCorrect);
                    setTimeout(() => {
                        idx++;
                        renderQuestion();
                    }, 700);
                });
                choicesWrap.appendChild(b);
            });
            controls.appendChild(choicesWrap);
        }

        renderQuestion();
    });
}