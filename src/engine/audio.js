import { getConfig, setConfig } from '../data/config.js';

let bgMusic = null;
let notificationSound = null;
let isMusicPlaying = false;
let musicUserToggled = false;
let pendingNotification = false;

/**
 * Приводит значение громкости к диапазону 0-100.
 * Возвращает fallback, только если значение не является числом (NaN).
 * Важно: 0 — корректное значение (полное выключение), его нельзя заменять fallback.
 */
function clampVolume(value, fallback) {
    const v = parseInt(value, 10);
    return isNaN(v) ? fallback : Math.max(0, Math.min(100, v));
}

/**
 * Инициализирует аудио элементы с начальными громкостями из конфига
 */
export function initAudio() {
    try {
        bgMusic = new Audio('res/background.mp3');
        bgMusic.loop = true;
    } catch (e) {}
    try {
        notificationSound = new Audio('res/message.mp3');
        notificationSound.preload = 'auto';
    } catch (e) {}
    
    // Установить громкость с конфига
    updateAudioVolumes();
}

/**
 * Обновляет громкость аудио элементов на основе конфига
 * Вызывается при изменении ползунков в настройках
 */
export function updateAudioVolumes() {
    const config = getConfig();
    const musicVolume = config.musicVolume !== undefined ? config.musicVolume : 30;
    const notificationsVolume = config.notificationsVolume !== undefined ? config.notificationsVolume : 100;
    
    // Преобразовать в числа для надежности
    const musicVol = clampVolume(musicVolume, 30);
    const notifVol = clampVolume(notificationsVolume, 100);
    
    // Громкость музыки: от 0 до 100% → 0 до 0.5 для Web Audio
    if (bgMusic) {
        bgMusic.volume = musicVol / 200;
        // Если громкость музыки 0, останови её
        if (musicVol === 0 && isMusicPlaying) {
            try {
                bgMusic.pause();
                bgMusic.currentTime = 0;
            } catch (e) {}
            isMusicPlaying = false;
        }
    }
    
    // Громкость уведомлений: от 0 до 100% → 0 до 1 для Web Audio
    if (notificationSound) {
        notificationSound.volume = notifVol / 100;
        // Если громкость уведомлений 0, останови их
        if (notifVol === 0 && !notificationSound.paused) {
            try {
                notificationSound.pause();
                notificationSound.currentTime = 0;
            } catch (e) {}
        }
    }
}

/**
 * Переключает музыку вкл/выкл
 */
export function toggleMusic() {
    musicUserToggled = true;
    if (!bgMusic) return;
    
    const config = getConfig();
    const musicVol = clampVolume(config.musicVolume, 30);
    
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
    } else {
        // Если громкость 0, не воспроизводим
        if (musicVol === 0) {
            return;
        }
        bgMusic.play().catch(() => {});
        isMusicPlaying = true;
    }
}

/**
 * Воспроизводит звук уведомления, если громкость > 0
 */
export function playNotificationSound() {
    const config = getConfig();
    const notifVol = clampVolume(config.notificationsVolume, 100);
    
    // Если громкость уведомлений 0, не воспроизводим
    if (notifVol === 0) {
        return;
    }
    
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

/**
 * Разблокирует автовоспроизведение аудио при первом взаимодействии пользователя
 */
export function unlockAudio() {
    const config = getConfig();
    const musicVol = clampVolume(config.musicVolume, 30);
    const notifVol = clampVolume(config.notificationsVolume, 100);
    
    if (pendingNotification && notificationSound && notifVol > 0) {
        pendingNotification = false;
        try {
            notificationSound.currentTime = 0;
            notificationSound.play().catch(() => {});
        } catch (e) {}
    }
    if (!musicUserToggled && bgMusic && !isMusicPlaying && musicVol > 0) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
        }).catch(() => {});
    }
}

/**
 * Получить текущее состояние воспроизведения музыки
 */
export function isMusicRunning() {
    return isMusicPlaying;
}