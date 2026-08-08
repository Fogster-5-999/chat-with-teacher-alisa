/**
 * Theme management — applies dark/light theme to the document.
 */
import { loadConfig } from '../data/config.js';

/**
 * Apply the current theme from config to the DOM.
 */
export function applyTheme() {
  const config = loadConfig();
  const body = document.body;
  const isLight = config.theme === 'light';
  if (isLight) body.classList.add('light-theme');
  else body.classList.remove('light-theme');

  const heroAvatar = document.getElementById('menu-hero-avatar');
  if (heroAvatar) {
    heroAvatar.style.backgroundImage = isLight ? 'url(res/ava_light.png)' : 'url(res/ava.png)';
  }
}
