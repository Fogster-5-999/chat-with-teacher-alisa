/**
 * Legal screen — first-launch disclaimer about fictional characters.
 */
import { getConfig, setConfig } from '../data/config.js';

const legalScreen = document.getElementById('legal-screen');
const acceptBtn = document.getElementById('legal-accept-btn');

// Sync with --legal-anim-duration 0.5s in legal.css
const HIDE_DURATION_MS = 500;

export function showLegal() {
  legalScreen.classList.add('active');
  if (acceptBtn) acceptBtn.focus();
}

export function hideLegal() {
  const card = legalScreen.querySelector('.legal-card');
  legalScreen.classList.add('legal-screen-leaving');
  if (card) card.classList.add('legal-card-leaving');
  setTimeout(() => {
    legalScreen.classList.remove('legal-screen-leaving');
    legalScreen.classList.remove('active');
    if (card) card.classList.remove('legal-card-leaving');
  }, HIDE_DURATION_MS);
}

export function isLegalAccepted() {
  return getConfig().disclaimerAccepted === true;
}

export function initLegal() {
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      setConfig({ disclaimerAccepted: true });
      hideLegal();
    });
  }
}
