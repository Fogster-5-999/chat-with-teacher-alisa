/**
 * Immutable store with shallow-merge setState and subscriber notification.
 *
 * Usage:
 *   const store = new Store(defaultGameState);
 *   store.getState()        // → current state (frozen in development)
 *   store.setState({ stats: { romance: 5 } })  // shallow merge
 *   store.subscribe(fn)     // called after each setState
 *   store.reset()           // restore to defaultGameState
 */
export class Store {
  constructor(defaultState) {
    this._state = { ...defaultState };
    this._listeners = new Set();
    this._defaultState = { ...defaultState };
  }

  /** Returns current state snapshot. */
  getState() {
    return this._state;
  }

  /**
   * Shallow-merge a patch into state, then notify subscribers.
   * Nested objects (stats, flags, dayStates, dates) are also shallow-merged.
   */
  setState(patch) {
    const prev = this._state;
    const next = { ...prev };

    for (const key of Object.keys(patch)) {
      const val = patch[key];
      if (
        val !== null &&
        typeof val === 'object' &&
        !Array.isArray(val) &&
        typeof prev[key] === 'object' &&
        prev[key] !== null &&
        !Array.isArray(prev[key])
      ) {
        next[key] = { ...prev[key], ...val };
      } else {
        next[key] = val;
      }
    }

    this._state = next;
    this._notify();
  }

  /** Replace entire messages array (special case). */
  setMessages(messages) {
    this._state = { ...this._state, messages: [...messages] };
    this._notify();
  }

  /** Reset to default state. */
  reset() {
    this._state = { ...this._defaultState };
    this._notify();
  }

  subscribe(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }

  _notify() {
    for (const fn of this._listeners) {
      try { fn(this._state); } catch (e) { console.error('Store listener error', e); }
    }
  }
}
