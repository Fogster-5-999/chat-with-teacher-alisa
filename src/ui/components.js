/**
 * UI Components — dumb renderers with no game logic imports.
 * All side-effects (events, state changes) are emitted via EventBus or callbacks.
 */
import { playNotificationSound } from '../engine/audio.js';
import { openLightbox } from './lightbox.js';
import { t, getCurrentLanguage } from '../data/translations.js';

// DOM references (lazy init)
let messagesContainer = null;
let optionsContainer = null;
let typingIndicator = null;
let networkStatus = null;

export function initUI() {
  messagesContainer = document.getElementById('messages');
  optionsContainer = document.getElementById('options');
  typingIndicator = document.getElementById('typing-indicator');
  networkStatus = document.getElementById('network-status');
}

// ---- Messages ----

export function renderMessage(msgObj) {
  if (!messagesContainer) return;
  const { sender, textKey, text, timestamp, isHtml, type, photoUrl, isLocked } = msgObj;
  const date = new Date(timestamp);
  const div = document.createElement('div');
  div.className = 'message ' + (sender === 'alisa' ? 'incoming' : sender === 'system' ? 'system' : 'outgoing');

  if (type === 'photo') {
    renderPhotoContent(div, { photoUrl, isLocked });
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

  if (msgObj.liked) {
    const reaction = document.createElement('span');
    reaction.className = 'message-reaction';
    reaction.textContent = '❤️';
    div.appendChild(reaction);
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
  if (!messagesContainer) return;
  const div = document.createElement('div');
  div.className = 'day-divider';
  div.textContent = formatDate(date);
  messagesContainer.insertBefore(div, typingIndicator);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function clearMessages() {
  if (!messagesContainer) return;
  messagesContainer.innerHTML = '';
  if (networkStatus) messagesContainer.appendChild(networkStatus);
  if (typingIndicator) messagesContainer.appendChild(typingIndicator);
}

// ---- Typing indicator ----

export function showTyping() {
  if (!messagesContainer) return;
  typingIndicator.style.display = 'flex';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function hideTyping() {
  if (!messagesContainer) return;
  typingIndicator.style.display = 'none';
}

// ---- Network status ----

export function showNetworkStatus() {
  if (!messagesContainer) return;
  messagesContainer.insertBefore(networkStatus, typingIndicator);
  networkStatus.style.display = 'block';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function hideNetworkStatus() {
  if (!messagesContainer) return;
  networkStatus.style.display = 'none';
}

// ---- Photo rendering ----

function renderPhotoContent(container, { photoUrl, isLocked }) {
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  wrap.style.display = 'inline-block';
  wrap.style.width = '100%';

  const img = document.createElement('img');
  img.style.width = '100%';
  img.style.borderRadius = '12px';
  img.style.display = 'block';
  img.className = isLocked ? 'blurred-photo' : 'unblurred';
  img.onerror = function() {
    img.style.display = 'none';
    const stub = document.createElement('div');
    stub.className = 'photo-placeholder';
    stub.textContent = t('photo.error') + (photoUrl || '') + ')';
    wrap.insertBefore(stub, img);
  };
  const normalizedUrl = (photoUrl || '').startsWith('res/') ? photoUrl : `res/${photoUrl}`;
  img.src = normalizedUrl;
  wrap.appendChild(img);

  if (isLocked) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:absolute; top:0; left:0; width:100%; height:100%;
      display:flex; align-items:center; justify-content:center;
      cursor:pointer; z-index:2;
      color:#fff; font-size:14px; font-weight:600;
      text-shadow:0 1px 4px rgba(0,0,0,0.7);
      user-select:none; pointer-events:none;
    `;
    overlay.textContent = 'Открыть за рекламу';
    wrap.appendChild(overlay);

    wrap.addEventListener('click', function unlockHandler(e) {
      e.stopPropagation();
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      import('../engine/sdk.js').then(({ getSDK }) => {
        const ysdk = getSDK();
        if (ysdk && ysdk.adv) {
          ysdk.adv.showRewardedVideo({
            callbacks: {
              onRewarded: () => {
                img.classList.remove('blurred-photo');
                img.classList.add('unblurred');
                // Emit event for state updates
                const event = new CustomEvent('photo:unlocked', { detail: { url: normalizedUrl } });
                document.dispatchEvent(event);
                wrap.removeEventListener('click', unlockHandler);
                wrap.addEventListener('click', function(e2) {
                  e2.stopPropagation();
                  openLightbox(normalizedUrl);
                });
              },
              onClose: () => {}
            }
          });
        }
      });
    });
  } else {
    wrap.addEventListener('click', function(e) {
      e.stopPropagation();
      openLightbox(normalizedUrl);
    });
  }

  container.appendChild(wrap);
}

// ---- Options ----

let _savedOptions = null;
let _savedHandler = null;

export function hideOptions() {
  if (!optionsContainer) return;
  optionsContainer.classList.remove('visible');
}

export function clearOptions() {
  _savedOptions = null;
  _savedHandler = null;
  if (!optionsContainer) return;
  optionsContainer.classList.remove('visible');
  optionsContainer.innerHTML = '';
}

function showOptionsContainer() {
  if (!optionsContainer) return;
  // Force reflow so the transition plays from the current (collapsed) state
  void optionsContainer.offsetHeight;
  optionsContainer.classList.add('visible');
}

export function reRenderSavedOptions() {
  if (_savedOptions && _savedHandler !== null) {
    showOptions(_savedOptions, _savedHandler);
  }
}

export function showOptions(options, clickHandler) {
  if (!messagesContainer) return;
  hideTyping();
  if (options && options.length > 0) {
    _savedOptions = [...options];
    _savedHandler = clickHandler;
  }

  // If already animating out, cancel and update content in-place
  const wasVisible = optionsContainer.classList.contains('visible');
  optionsContainer.innerHTML = '';

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';

    const labelText = t(opt.labelKey || opt.label || '');

    if (opt.hidden || opt._isHidden) {
      btn.classList.add('hidden-option');
      const costBadge = opt.cost && opt.cost > 1 ? ` <span class="cost-badge">📺×${opt.cost}</span>` : '';
      btn.innerHTML = `<span>🔒 ${labelText}${costBadge}</span><span class="lock-icon">🔒</span>`;
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
                    opt._isHidden = false;
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
      btn.textContent = labelText;
      btn.addEventListener('click', function() {
        // Hide panel immediately on choice
        optionsContainer.classList.remove('visible');
        if (clickHandler) clickHandler(opt.id, opt.labelKey || opt.label || '');
      });
    }
    optionsContainer.appendChild(btn);
  });

  // Only animate in if it was hidden; otherwise content just updates in place
  if (!wasVisible) {
    showOptionsContainer();
  }
}

// ---- Date formatting ----

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

// ---- Final screen ----

export function renderFinalScreen(messages) {
  if (!messagesContainer) return;
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

// ---- Mini Test ----

export function showMiniTest(test, onAnswer) {
  return new Promise(resolve => {
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
          appendChatBubble('player', ch);
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

// ---- Notifications ----

export function showTopNotification(title, text, durationMs = 5000, icon) {
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

// ---- Stats UI ----

const statMapping = { grades: 'success', romance: 'romance', humor: 'humor' };

export function updateCoreStatsUI() {
  // This is called via EventBus; actual state comes from store snapshot
}
