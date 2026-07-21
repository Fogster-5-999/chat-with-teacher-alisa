import { defaultGameState, defaultSessionState, SAVE_VERSION } from './defaults.js';
import { migrate } from './migration.js';
import { getSDK } from '../engine/sdk.js';

// ---- Session store (NOT persisted) ----
let sessionStore = { ...defaultSessionState };

export function getSession() { return sessionStore; }
export function setSession(patch) { sessionStore = { ...sessionStore, ...patch }; }
export function resetSession() { sessionStore = { ...defaultSessionState }; }

// ---- Debounced save queue ----
const SAVE_KEY = 'game_save';
let saveQueue = [];
let saveTimer = null;
const SAVE_DEBOUNCE_MS = 500;

/**
 * Queue a save. Debounced: only one write per window.
 */
export function queueSave(store) {
  saveQueue.push(store);
  if (saveTimer) return;
  saveTimer = setTimeout(() => flushSave(), SAVE_DEBOUNCE_MS);
}

async function flushSave() {
  saveTimer = null;
  // Deduplicate: use the latest store reference
  const store = saveQueue[saveQueue.length - 1];
  saveQueue = [];
  await writeSave(store);
}

async function writeSave(store) {
  try {
    const state = store.getState();
    // Wrap state in { gameData: ... } to match SDK storage format
    const payload = { gameData: JSON.stringify(state) };
    const sdk = getSDK();
    if (sdk && sdk.player) {
      // SDK setData internally does JSON.stringify(payload)
      await sdk.player.setData(payload);
    } else {
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    }
  } catch (e) {
    console.warn('Save failed', e);
  }
}

/**
 * Load and migrate saved game.
 * Supports both new format ({ gameData: "..." }) and legacy format (raw state object).
 * Returns true if a save existed and was loaded.
 */
export async function loadGameIntoStore(store) {
  try {
    let raw = null;
    const sdk = getSDK();
    if (sdk && sdk.player) {
      const result = await sdk.player.getData();
      raw = result ? result.gameData : null;
    } else {
      const item = localStorage.getItem(SAVE_KEY);
      if (item) {
        try {
          const parsed = JSON.parse(item);
          // Support both wrapped and unwrapped formats
          raw = parsed.gameData || item;
        } catch {
          raw = item; // fallback: treat raw string as JSON
        }
      }
    }
    if (!raw) return false;

    const stateData = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const migrated = migrate(stateData, SAVE_VERSION);
    store.setState(migrated);
    return true;
  } catch (e) {
    console.warn('Load failed', e);
    return false;
  }
}

/**
 * Delete save data from storage.
 */
export function deleteSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) { /* ignore */ }
}

/**
 * Check if a save exists.
 */
export function hasSavedGame() {
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch (e) {
    return false;
  }
}

// ---- beforeunload handler: flush save queue synchronously before page close ----
function onBeforeUnload() {
  // Cancel pending debounced flush
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  // If there's a pending save, write it synchronously
  if (saveQueue.length > 0) {
    const store = saveQueue[saveQueue.length - 1];
    saveQueue = [];
    try {
      const state = store.getState();
      const payload = { gameData: JSON.stringify(state) };
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Synchronous save on beforeunload failed', e);
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', onBeforeUnload);
}
