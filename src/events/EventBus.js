/**
 * Simple event bus for decoupled communication.
 *
 * Usage:
 *   const bus = new EventBus();
 *   bus.on('stats:changed', (stats) => updateUI(stats));
 *   bus.emit('stats:changed', { success: 10 });
 *   const off = bus.on('day:start', handler);
 *   off(); // unsubscribe
 */
export class EventBus {
  constructor() {
    this._handlers = new Map();
  }

  /** Subscribe to an event. Returns unsubscribe function. */
  on(event, fn) {
    if (!this._handlers.has(event)) {
      this._handlers.set(event, new Set());
    }
    this._handlers.get(event).add(fn);
    return () => this.off(event, fn);
  }

  /** Unsubscribe a specific handler. */
  off(event, fn) {
    const set = this._handlers.get(event);
    if (set) {
      set.delete(fn);
      if (set.size === 0) this._handlers.delete(event);
    }
  }

  /** Emit an event with optional data. */
  emit(event, data) {
    const set = this._handlers.get(event);
    if (set) {
      for (const fn of set) {
        try { fn(data); } catch (e) { console.error(`EventBus handler error (${event})`, e); }
      }
    }
  }

  /** Remove all listeners. */
  clear() {
    this._handlers.clear();
  }
}
