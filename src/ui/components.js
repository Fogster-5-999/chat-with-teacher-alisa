/**
 * UI Components — dumb renderers with no game logic imports.
 * All side-effects (events, state changes) are emitted via EventBus or callbacks.
 */
import { playNotificationSound } from '../engine/audio.js';
import { openLightbox } from './lightbox.js';
import { toggleVoice, formatDuration, preloadDuration, cleanupAudioResources } from '../engine/voicePlayer.js';
import { getVoiceClip } from '../data/voice.js';
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
  
  // Cleanup audio resources on page unload
  window.addEventListener('beforeunload', cleanupAudioResources);
  window.addEventListener('unload', cleanupAudioResources);
}

// ---- Messages ----

export function renderMessage(msgObj) {
  if (!messagesContainer) return;
  const { sender, textKey, text, timestamp, isHtml, type, photoUrl, isLocked } = msgObj;
  const date = new Date(timestamp);

  // Day-divider — standalone element (not a .message), persisted in the store
  if (type === 'day-divider') {
    if (!timestamp) {
      console.warn('renderMessage: day-divider without timestamp, skipping');
      return;
    }
    if (isNaN(date.getTime())) {
      console.warn('renderMessage: day-divider with invalid timestamp, skipping');
      return;
    }
    const div = document.createElement('div');
    div.className = 'day-divider';
    div.textContent = formatDate(date);
    messagesContainer.insertBefore(div, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return;
  }

  const div = document.createElement('div');
  div.className = 'message ' + (sender === 'alisa' ? 'incoming' : sender === 'system' ? 'system' : 'outgoing');
  if (type === 'voice') div.classList.add('voice-msg');

  if (type === 'photo') {
    renderPhotoContent(div, { photoUrl, isLocked });
  } else if (type === 'voice') {
    renderVoiceContent(div, msgObj);
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
    overlay.textContent = t('photo.unlock');
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

// ---- Voice message rendering ----

function renderVoiceContent(container, msg) {
  const { voiceId, isLocked } = msg;
  const clip = getVoiceClip(voiceId);
  const src = clip ? clip.file : `res/voice/${voiceId}.mp3`;

  const content = document.createElement('div');
  content.className = 'voice-content';

  const btn = document.createElement('button');
  btn.className = 'voice-play-btn';
  btn.type = 'button';
  btn.textContent = '▶';
  btn.setAttribute('aria-label', t('voice.label'));

  const main = document.createElement('div');
  main.className = 'voice-main';

  const wave = document.createElement('div');
  wave.className = 'voice-wave';
  wave.setAttribute('role', 'progressbar');
  wave.setAttribute('aria-valuemin', '0');
  wave.setAttribute('aria-valuemax', '100');
  wave.setAttribute('aria-valuenow', '0');
  
  const barCount = 28;
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('span');
    bar.className = 'voice-bar';
    bar.setAttribute('aria-hidden', 'true');
    const h = 25 + Math.round(((Math.abs(Math.sin(i * 12.9898)) * 43758.5453) % 1) * 70);
    bar.style.setProperty('--h', h + '%');
    bar.style.animationDelay = (i * 0.04).toFixed(2) + 's';
    wave.appendChild(bar);
  }
  const progress = document.createElement('div');
  progress.className = 'voice-progress';
  wave.appendChild(progress);

  const meta = document.createElement('div');
  meta.className = 'voice-meta';
  const label = document.createElement('span');
  label.className = 'voice-label';
  label.textContent = t('voice.label');
  const timeEl = document.createElement('span');
  timeEl.className = 'voice-time';
  timeEl.textContent = formatDuration(0);
  meta.appendChild(label);
  meta.appendChild(timeEl);

  main.appendChild(wave);
  main.appendChild(meta);
  content.appendChild(btn);
  content.appendChild(main);
  container.appendChild(content);

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleVoice(container, src);
  });

  if (isLocked) {
    container.classList.add('is-locked');
    const overlay = document.createElement('div');
    overlay.className = 'voice-lock';
    const icon = document.createElement('span');
    icon.className = 'voice-lock-icon';
    icon.textContent = '🔒';
    const lockLabel = document.createElement('span');
    lockLabel.className = 'voice-lock-label';
    lockLabel.textContent = t('voice.unlock');
    overlay.appendChild(icon);
    overlay.appendChild(lockLabel);
    overlay.addEventListener('click', function unlockHandler(e) {
      e.stopPropagation();
      import('../engine/sdk.js').then(({ getSDK }) => {
        const ysdk = getSDK();
        if (ysdk && ysdk.adv) {
          ysdk.adv.showRewardedVideo({
            callbacks: {
              onRewarded: () => {
                overlay.remove();
                container.classList.remove('is-locked');
                container.classList.add('voice-unlocked');
                // Use preloadDuration instead of probeDuration
                preloadDuration(src).then(duration => {
                  if (duration) {
                    timeEl.textContent = formatDuration(duration);
                  }
                });
                const event = new CustomEvent('voice:unlocked', { detail: { voiceId } });
                document.dispatchEvent(event);
              },
              onClose: () => {}
            }
          });
        }
      });
    });
    container.appendChild(overlay);
  } else {
    container.classList.add('voice-unlocked');
    // Show total duration immediately via optimized preload
    preloadDuration(src).then(duration => {
      if (duration) {
        timeEl.textContent = formatDuration(duration);
      }
    });
  }
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
    const sourceText = msg.text != null ? msg.text : t(msg.textKey || '');
    div.textContent = sourceText;
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

/**
 * Update the stats bar UI from a state snapshot.
 * @param {object} state - current game state (must have stats)
 * @param {object} maxStats - max values for each stat key
 */
export function updateCoreStatsUI(state, maxStats) {
  if (!state || !state.stats) return;
  const stats = state.stats;
  for (const [uiKey, stateKey] of Object.entries(statMapping)) {
    const value = stats[stateKey] || 0;
    const valEl = document.getElementById('val-' + uiKey);
    if (valEl) valEl.textContent = value;
    const fillEl = document.getElementById('fill-' + uiKey);
    if (fillEl) {
      const maxVal = (maxStats && maxStats[uiKey]) || 50;
      const percent = Math.min(100, Math.max(0, (value / maxVal) * 100));
      fillEl.style.width = percent + '%';
    }
  }
}
