/**
 * Language management — applies language to the DOM via data-i18n attributes.
 */
import { loadConfig } from '../data/config.js';
import { t, setLanguage } from '../data/translations.js';

/**
 * Apply the current language from config to the DOM.
 */
export function applyLanguage() {
  const config = loadConfig();
  const lang = config.language;
  setLanguage(lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  const langLabel = document.getElementById('current-lang-label');
  if (langLabel) langLabel.textContent = lang === 'ru' ? 'RU' : 'EN';
  const contactName = document.getElementById('contact-name');
  if (contactName) contactName.textContent = t('profile.name');
  const headerStatus = document.getElementById('status');
  if (headerStatus) headerStatus.textContent = t('profile.status');
  const profileName = document.getElementById('profile-name');
  if (profileName) profileName.textContent = t('profile.name');
  const profileStatus = document.getElementById('profile-status');
  if (profileStatus) profileStatus.textContent = t('profile.status');
  const profileTitle = document.getElementById('profile-header-title');
  if (profileTitle) profileTitle.textContent = t('profile.title');

  const app = document.getElementById('app');
  app.classList.add('lang-flash');
  setTimeout(() => app.classList.remove('lang-flash'), 300);
}
