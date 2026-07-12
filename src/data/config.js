export const getConfig = () => config;

const defaultConfig = {
    language: 'ru',
    theme: 'dark',
    sound: true,
};

let config = { ...defaultConfig };

export function loadConfig() {
    try {
        const saved = localStorage.getItem('game_config');
        if (saved) {
            const parsed = JSON.parse(saved);
            config = { ...defaultConfig, ...parsed };
        }
    } catch (e) {}
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