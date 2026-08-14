export const getConfig = () => config;

export const MAX_STATS = {
    romance: 50,
    grades: 50,
    humor: 50
};

const defaultConfig = {
    language: 'ru',
    theme: 'dark',
    musicVolume: 30,
    notificationsVolume: 100,
    disclaimerAccepted: false,
};

let config = { ...defaultConfig };

export function loadConfig() {
    try {
        const saved = localStorage.getItem('game_config');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Убедиться что значения громкости - числа (0 допустимо и не заменяется на fallback)
            if (parsed.musicVolume !== undefined) {
                const m = parseInt(parsed.musicVolume, 10);
                if (!isNaN(m)) parsed.musicVolume = Math.max(0, Math.min(100, m));
            }
            if (parsed.notificationsVolume !== undefined) {
                const n = parseInt(parsed.notificationsVolume, 10);
                if (!isNaN(n)) parsed.notificationsVolume = Math.max(0, Math.min(100, n));
            }
            config = { ...defaultConfig, ...parsed };
        }
    } catch (e) {
        console.error('Error loading config:', e);
    }
    return config;
}

export function saveConfig() {
    try {
        localStorage.setItem('game_config', JSON.stringify(config));
    } catch (e) {}
}

export function setConfig(newConfig) {
    config = { ...config, ...newConfig };
    saveConfig();
    return config;
}