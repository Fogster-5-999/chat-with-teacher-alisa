// State version — increment on schema change
export const SAVE_VERSION = 1;

// Persisted game state (saved to localStorage via Yandex SDK)
export const defaultGameState = {
  version: SAVE_VERSION,
  currentDay: 'day1',
  stats: { success: 0, romance: 0, humor: 0 },
  flags: {},
  messages: [],
  dayStates: {},
  dates: { currentDate: null, currentTime: null },
  achievements: []
};

// Ephemeral session state (NOT saved — reset on page reload)
export const defaultSessionState = {
  dayStepIndex: 0,
  branchStack: [],
  pendingChoice: null,
  pendingGoto: null
};
