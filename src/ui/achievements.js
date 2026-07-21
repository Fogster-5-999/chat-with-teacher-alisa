/**
 * Achievements modal — reads state from the store.
 */
import { t } from '../data/translations.js';
import { GAME_SCRIPT } from '../data/story.js';

const achievementsModal = document.getElementById('achievements-modal');
const closeAchievementsBtn = document.getElementById('close-achievements');

// Store reference set externally
let _store = null;

export function setStore(store) {
  _store = store;
}

export function openAchievements() {
  if (achievementsModal.classList.contains('open')) {
    closeAchievements();
    return;
  }
  renderAchievements();
  achievementsModal.classList.add('open');
  requestAnimationFrame(() => achievementsModal.classList.add('visible'));
}

export function closeAchievements() {
  achievementsModal.classList.remove('visible');
  setTimeout(() => {
    achievementsModal.classList.remove('open');
  }, 350);
}

export function initAchievements() {
  closeAchievementsBtn.addEventListener('click', closeAchievements);
  achievementsModal.addEventListener('click', (e) => {
    if (e.target === achievementsModal) closeAchievements();
  });
}

function renderAchievements() {
  const container = document.getElementById('achievements-list');
  container.innerHTML = '';

  if (!_store) return;

  const state = _store.getState();
  const unlocked = state.achievements || [];
  const meta = GAME_SCRIPT.achievementsMeta || [];

  meta.forEach(a => {
    const isUnlocked = unlocked.includes(a.id);
    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;

    const name = a.name && a.name.ru ? a.name.ru : a.id;
    const status = isUnlocked ? t('achievements.unlocked') : t('achievements.locked');

    card.innerHTML = `
      <div class="achievement-icon">${isUnlocked ? (a.icon || '🏆') : '🔒'}</div>
      <div class="achievement-info">
        <div class="achievement-name">${isUnlocked ? name : '???'}</div>
        <div class="achievement-status">${status}</div>
      </div>
    `;

    container.appendChild(card);
  });

  if (meta.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:rgba(255,255,255,0.3);padding:30px;font-size:14px;">Нет достижений</div>';
  }
}
