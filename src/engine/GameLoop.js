/**
 * GameLoop — manage game session lifecycle (pause/resume/cancel).
 *
 * Only one scenario session may be active at a time.
 * Pausing is safer than destroying chat DOM when switching to menu.
 */
let gameSession = null;
let nextSessionId = 1;

export function beginSession() {
  if (gameSession) return gameSession.id;
  gameSession = { id: nextSessionId++, paused: false, resumeWaiters: [] };
  return gameSession.id;
}

export function hasActiveSession() {
  return gameSession !== null;
}

export function isSessionCurrent(sessionId) {
  return gameSession?.id === sessionId;
}

export function pauseSession() {
  if (gameSession) gameSession.paused = true;
}

export function resumeSession() {
  if (!gameSession) return;
  gameSession.paused = false;
  const waiters = gameSession.resumeWaiters.splice(0);
  waiters.forEach(resolve => resolve());
}

export function cancelSession() {
  if (!gameSession) return;
  const waiters = gameSession.resumeWaiters.splice(0);
  gameSession = null;
  waiters.forEach(resolve => resolve());
}

/**
 * Wait for the session to be active (not paused) and current.
 * Returns false if session was cancelled.
 */
export async function waitForActiveSession(sessionId) {
  while (isSessionCurrent(sessionId) && gameSession.paused) {
    await new Promise(resolve => gameSession.resumeWaiters.push(resolve));
  }
  return isSessionCurrent(sessionId);
}

/**
 * Sleep for ms, then check session is still active.
 * Returns false if session was cancelled/paused.
 */
export function createSessionAwaiter(sessionId) {
  return async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
    return waitForActiveSession(sessionId);
  };
}
