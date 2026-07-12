// Эмуляция Yandex Games SDK для локальной разработки.
// В продакшене заменить на реальный ysdk.
let ysdk = null;

export async function initSDK() {
    try {
        // В реальном проекте: const ysdk = await YaGames.init();
        // Сейчас эмулируем
        console.log('SDK инициализирован (эмуляция)');
        ysdk = {
            player: {
                setData: async (data) => {
                    try { localStorage.setItem('game_save', JSON.stringify(data)); } catch(e) {}
                    return true;
                },
                getData: async () => {
                    try {
                        const raw = localStorage.getItem('game_save');
                        if (raw) return JSON.parse(raw);
                    } catch(e) {}
                    return null;
                }
            },
            adv: {
                showFullscreenAdv: ({ callbacks }) => {
                    console.log('Показываем рекламу (эмуляция)');
                    const overlay = document.getElementById('ad-overlay');
                    overlay.classList.add('active');
                    const closeBtn = document.getElementById('close-ad-btn');
                    const handler = () => {
                        overlay.classList.remove('active');
                        closeBtn.removeEventListener('click', handler);
                        if (callbacks?.onClose) callbacks.onClose(true);
                    };
                    closeBtn.addEventListener('click', handler);
                    if (callbacks?.onOpen) callbacks.onOpen();
                }
            },
            features: {
                LoadingAPI: {
                    ready: () => console.log('Game Ready')
                }
            }
        };
        return ysdk;
    } catch (e) {
        console.warn('Ошибка инициализации SDK', e);
        return null;
    }
}

export function getSDK() {
    return ysdk;
}

export function showAd(callbacks) {
    if (ysdk && ysdk.adv) {
        ysdk.adv.showFullscreenAdv(callbacks);
    } else {
        console.warn('SDK не инициализирован');
        if (callbacks?.onError) callbacks.onError('SDK not ready');
    }
}

export async function saveGameData(data) {
    if (ysdk && ysdk.player) {
        await ysdk.player.setData(data);
    } else {
        console.warn('SDK не инициализирован, сохранение в localStorage');
        try { localStorage.setItem('game_save', JSON.stringify(data)); } catch(e) {}
    }
}

export async function loadGameData() {
    if (ysdk && ysdk.player) {
        return await ysdk.player.getData();
    } else {
        try {
            const raw = localStorage.getItem('game_save');
            return raw ? JSON.parse(raw) : null;
        } catch(e) { return null; }
    }
}