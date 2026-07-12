import { getConfig } from '../data/config.js';

let bgMusic = null;
let notificationSound = null;
let isMusicPlaying = false;
let musicUserToggled = false;
let pendingNotification = false;

export function initAudio() {
    try {
        bgMusic = new Audio('res/background.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
    } catch (e) {}
    try {
        notificationSound = new Audio('res/message.mp3');
        notificationSound.volume = 0.5;
        notificationSound.preload = 'auto';
    } catch (e) {}
}

export function toggleMusic() {
    musicUserToggled = true;
    if (!bgMusic) return;
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        const toggleBtn = document.getElementById('music-toggle');
        if (toggleBtn) toggleBtn.textContent = '🔇';
    } else {
        bgMusic.play().catch(() => {});
        isMusicPlaying = true;
        const toggleBtn = document.getElementById('music-toggle');
        if (toggleBtn) toggleBtn.textContent = '🔊';
    }
}

export function playNotificationSound() {
    const config = getConfig();
    if (!config.sound) return;
    if (!notificationSound) return;
    pendingNotification = true;
    try {
        notificationSound.currentTime = 0;
        const p = notificationSound.play();
        if (p && typeof p.catch === 'function') {
            p.catch(() => {
                pendingNotification = true;
            });
        }
    } catch (e) {
        pendingNotification = true;
    }
}

export function unlockAudio() {
    if (pendingNotification && notificationSound) {
        pendingNotification = false;
        try {
            notificationSound.currentTime = 0;
            notificationSound.play().catch(() => {});
        } catch (e) {}
    }
    if (!musicUserToggled && bgMusic && !isMusicPlaying) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            const toggleBtn = document.getElementById('music-toggle');
            if (toggleBtn) toggleBtn.textContent = '🔊';
        }).catch(() => {});
    }
}