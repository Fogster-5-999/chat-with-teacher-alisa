// Yandex Games SDK emulation for local development.
// Replace with real ysdk in production.
let ysdk = null;

export async function initSDK() {
    try {
        // In production: const ysdk = await YaGames.init();
        // Currently emulating
        console.log('SDK initialized (emulation)');
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
                    console.log('Showing ad (emulation)');
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
                },
                showRewardedVideo: ({ callbacks }) => {
                    console.log('Showing rewarded video (emulation)');
                    const overlay = document.getElementById('ad-overlay');
                    overlay.classList.add('active');
                    const closeBtn = document.getElementById('close-ad-btn');
                    const handler = () => {
                        overlay.classList.remove('active');
                        closeBtn.removeEventListener('click', handler);
                        if (callbacks?.onRewarded) callbacks.onRewarded();
                        if (callbacks?.onClose) callbacks.onClose();
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
        console.warn('SDK initialization error', e);
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
        console.warn('SDK not initialized');
        if (callbacks?.onError) callbacks.onError('SDK not ready');
    }
}

export async function saveGameData(data) {
    if (ysdk && ysdk.player) {
        await ysdk.player.setData(data);
    } else {
        console.warn('SDK not initialized, saving to localStorage');
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