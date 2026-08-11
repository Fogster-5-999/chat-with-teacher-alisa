/**
 * voicePlayer — playback manager for voice message bubbles.
 *
 * Maintains a single shared HTMLAudioElement so only one voice plays at a time.
 * Updates the bubble UI (play/pause button, waveform animation, elapsed/total time,
 * progress bar) directly via DOM classes/children — no game logic here.
 *
 * Features:
 * - Single audio element (only one voice at a time)
 * - Duration caching (avoid double-load)
 * - Seek by clicking on waveform
 * - Throttled UI updates
 * - Proper cleanup on navigation
 *
 * Usage:
 *   import { toggleVoice, stopVoice } from './voicePlayer.js';
 *   playBtn.addEventListener('click', () => toggleVoice(bubbleEl, 'res/voice/day_3.mp3'));
 */

let currentAudio = null;
let currentBubble = null;
const durationCache = new Map();
let lastTimeUpdateTime = 0;
const UI_UPDATE_THROTTLE = 100; // ms

export function formatDuration(sec) {
  const s = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function normalizeSrc(src) {
  try {
    return new URL(src, window.location.href).href;
  } catch (e) {
    return src;
  }
}

function setPlayingUI(bubble, playing) {
  if (!bubble) return;
  bubble.classList.toggle('playing', playing);
  const btn = bubble.querySelector('.voice-play-btn');
  if (btn) btn.textContent = playing ? '❚❚' : '▶';
}

function setTimeLabel(text) {
  if (currentBubble) {
    const timeEl = currentBubble.querySelector('.voice-time');
    if (timeEl) timeEl.textContent = text;
  }
}

function onTimeUpdate() {
  if (!currentAudio || !currentBubble) return;
  
  // Throttle UI updates to avoid excessive DOM operations
  const now = Date.now();
  if (now - lastTimeUpdateTime < UI_UPDATE_THROTTLE) return;
  lastTimeUpdateTime = now;

  const timeEl = currentBubble.querySelector('.voice-time');
  if (timeEl) timeEl.textContent = formatDuration(currentAudio.currentTime);
  
  // Update wave bars progress
  if (currentAudio.duration && Number.isFinite(currentAudio.duration)) {
    const progress = currentAudio.currentTime / currentAudio.duration;
    const bars = currentBubble.querySelectorAll('.voice-bar');
    const barCount = bars.length;
    
    bars.forEach((bar, index) => {
      // Calculate which bars should be filled
      const barProgress = (progress * barCount) - index;
      const fillAmount = Math.max(0, Math.min(1, barProgress));
      bar.style.setProperty('--fill', fillAmount);
    });
  }
}

function onEnded() {
  if (currentBubble) {
    setPlayingUI(currentBubble, false);
    const timeEl = currentBubble.querySelector('.voice-time');
    if (timeEl && currentAudio && currentAudio.duration) {
      timeEl.textContent = formatDuration(currentAudio.duration);
    }
    // Fill all bars on end
    const bars = currentBubble.querySelectorAll('.voice-bar');
    bars.forEach(bar => bar.style.setProperty('--fill', '1'));
  }
  currentBubble = null;
  currentAudio = null;
}

/**
 * Toggle play/pause for a voice bubble.
 * @param {HTMLElement} bubble - root .voice-msg element
 * @param {string} src - audio file url
 */
export function toggleVoice(bubble, src) {
  // Same bubble → toggle pause/resume
  if (currentAudio && currentBubble === bubble) {
    if (currentAudio.paused) {
      const p = currentAudio.play();
      if (p && p.catch) p.catch(() => {});
      setPlayingUI(bubble, true);
    } else {
      currentAudio.pause();
      setPlayingUI(bubble, false);
    }
    return;
  }

  // Different bubble → stop the current one and start a new one
  stopVoice();

  currentBubble = bubble;
  currentAudio = new Audio(src);
  currentAudio.preload = 'auto';
  
  const onLoadedMetadata = () => {
    if (currentAudio && currentAudio.duration && Number.isFinite(currentAudio.duration)) {
      durationCache.set(src, currentAudio.duration);
      setTimeLabel(formatDuration(currentAudio.duration));
    }
  };
  
  currentAudio.addEventListener('loadedmetadata', onLoadedMetadata);
  currentAudio.addEventListener('timeupdate', onTimeUpdate);
  currentAudio.addEventListener('ended', onEnded);
  
  // Add seek support
  const progressEl = bubble.querySelector('.voice-progress');
  if (progressEl) {
    progressEl.style.width = '0%';
    const waveEl = bubble.querySelector('.voice-wave');
    if (waveEl) {
      waveEl.style.cursor = 'pointer';
      waveEl.addEventListener('click', handleWaveClick);
    }
  }
  
  // Reset bars
  const bars = bubble.querySelectorAll('.voice-bar');
  bars.forEach(bar => bar.style.setProperty('--fill', '0'));

  setPlayingUI(bubble, true);
  const p = currentAudio.play();
  if (p && p.catch) p.catch(() => setPlayingUI(bubble, false));
}

function handleWaveClick(e) {
  if (!currentAudio || !currentAudio.duration || !Number.isFinite(currentAudio.duration)) {
    return;
  }
  
  const waveEl = e.currentTarget;
  const rect = waveEl.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  const newTime = Math.max(0, Math.min(percentage * currentAudio.duration, currentAudio.duration));
  
  currentAudio.currentTime = newTime;
  
  // Update bars immediately
  const bars = currentBubble.querySelectorAll('.voice-bar');
  const barCount = bars.length;
  bars.forEach((bar, index) => {
    const barProgress = (percentage * barCount) - index;
    const fillAmount = Math.max(0, Math.min(1, barProgress));
    bar.style.setProperty('--fill', fillAmount);
  });
}

/** Stop playback and reset the active bubble UI. */
export function stopVoice() {
  if (currentAudio) {
    currentAudio.pause();
    // Clean up event listeners to prevent memory leaks
    currentAudio.removeEventListener('loadedmetadata', null);
    currentAudio.removeEventListener('timeupdate', onTimeUpdate);
    currentAudio.removeEventListener('ended', onEnded);
  }
  if (currentBubble) {
    setPlayingUI(currentBubble, false);
    const waveEl = currentBubble.querySelector('.voice-wave');
    if (waveEl) {
      waveEl.style.cursor = 'default';
      waveEl.removeEventListener('click', handleWaveClick);
    }
  }
  
  currentAudio = null;
  currentBubble = null;
  lastTimeUpdateTime = 0;
}

/**
 * Get cached duration for a voice file.
 * @param {string} src - audio file url
 * @returns {number|null} duration in seconds or null if not cached
 */
export function getCachedDuration(src) {
  return durationCache.get(src) || null;
}

/**
 * Preload duration for a voice file without playing.
 * @param {string} src - audio file url
 * @returns {Promise<number>} resolves with duration
 */
export function preloadDuration(src) {
  return new Promise((resolve) => {
    if (durationCache.has(src)) {
      resolve(durationCache.get(src));
      return;
    }
    
    const probe = new Audio(src);
    probe.preload = 'metadata';
    
    const onLoadedMetadata = () => {
      if (probe.duration && Number.isFinite(probe.duration)) {
        durationCache.set(src, probe.duration);
        resolve(probe.duration);
      } else {
        resolve(0);
      }
      cleanup();
    };
    
    const onError = () => {
      console.warn(`Failed to load duration for ${src}`);
      resolve(0);
      cleanup();
    };
    
    const cleanup = () => {
      probe.removeEventListener('loadedmetadata', onLoadedMetadata);
      probe.removeEventListener('error', onError);
      probe.src = '';
    };
    
    probe.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
    probe.addEventListener('error', onError, { once: true });
  });
}

/** Cleanup on page unload */
export function cleanupAudioResources() {
  stopVoice();
  durationCache.clear();
}
