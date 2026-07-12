import { playNotificationSound } from '../engine/audio.js';
import { openLightbox } from './lightbox.js';
import { translateStoryText } from '../data/translations.js';

const messagesContainer = document.getElementById('messages');
const optionsContainer = document.getElementById('options');
const typingIndicator = document.getElementById('typing-indicator');
const networkStatus = document.getElementById('network-status');

export function renderMessage(msgObj) {
    const { sender, text, timestamp, isHtml, type, photoUrl, blurred, prompt, isLocked } = msgObj;
    const date = new Date(timestamp);
    const div = document.createElement('div');
    div.className = 'message ' + (sender === 'alisa' ? 'incoming' : sender === 'system' ? 'system' : 'outgoing');

    if (type === 'photo') {
        renderPhotoContent(div, { photoUrl, blurred, prompt, isLocked });
    } else {
        const contentSpan = document.createElement('span');
        const translatedText = translateStoryText(text);
        if (isHtml) contentSpan.innerHTML = translatedText;
        else contentSpan.textContent = translatedText;
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
        stub.textContent = '📷 фото не добавлено (' + photoUrl + ')';
        wrap.insertBefore(stub, img);
    };
    const normalizedUrl = (photoUrl || '').startsWith('res/') ? photoUrl : `res/${photoUrl}`;
    img.src = normalizedUrl;
    wrap.appendChild(img);

    if (prompt) {
        const promptDiv = document.createElement('div');
        promptDiv.style.cssText = 'margin-top:6px; font-size:12px; color:var(--text-secondary); font-style:italic; text-align:center;';
        promptDiv.textContent = '📷 ' + prompt;
        wrap.appendChild(promptDiv);
    }

    const hintDiv = document.createElement('div');
    hintDiv.style.cssText = 'margin-top:8px; font-size:13px; color:var(--text-secondary); text-align:center;';
    hintDiv.textContent = isLocked
        ? '👆 Нажми на фото, чтобы открыть (потребуется реклама)'
        : '👆 Нажми на фото, чтобы рассмотреть поближе';
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
                                hintDiv.textContent = '👆 Нажми на фото, чтобы рассмотреть поближе';
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

export function showOptions(options, clickHandler) {
    optionsContainer.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (opt.hidden) {
            btn.classList.add('hidden-option');
            btn.innerHTML = `<span>🔒 ${opt.label}</span><span class="lock-icon">🔒</span>`;
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                import('../engine/sdk.js').then(({ showAd }) => {
                    showAd({
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
            });
        } else {
            const labelText = translateStoryText(opt.label);
            btn.textContent = labelText;
            btn.addEventListener('click', function() {
                if (clickHandler) clickHandler(opt.id, opt.label);
            });
        }
        optionsContainer.appendChild(btn);
    });
}

function formatTime(date) {
    return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
}
function formatDate(date) {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${date.getDate()} ${months[date.getMonth()]}, ${days[date.getDay()]}`;
}

export function renderFinalScreen(messages) {
    clearMessages();
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'message system';
        div.textContent = msg.text;
        messagesContainer.insertBefore(div, typingIndicator);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}