/**
 * StepRunner — register(type, handler) and get(type).
 *
 * Each handler receives (ctx, step) where ctx is a context object
 * provided by the DayRunner.
 */
export class StepRunner {
  constructor() {
    this._registry = new Map();
  }

  /** Register a step handler. Handler can be a function or an object with `handler` method. */
  register(type, handler) {
    if (typeof handler === 'function') {
      this._registry.set(type, handler);
    } else if (handler && typeof handler.handler === 'function') {
      this._registry.set(type, handler.handler);
    } else {
      this._registry.set(type, handler);
    }
  }

  /** Register all handlers from an array of { type, handler } modules. */
  registerAll(modules) {
    for (const mod of modules) {
      if (mod && mod.type && (mod.handler || typeof mod === 'function')) {
        this.register(mod.type, mod);
      }
    }
  }

  /** Get handler for a step type. Throws if not found. */
  get(type) {
    const handler = this._registry.get(type);
    if (!handler) {
      throw new Error(`No handler registered for step type "${type}"`);
    }
    return handler;
  }

  /** Check if a handler exists for the given type. */
  has(type) {
    return this._registry.has(type);
  }
}
