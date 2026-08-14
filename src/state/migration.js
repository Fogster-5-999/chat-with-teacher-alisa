import { SAVE_VERSION, defaultGameState } from './defaults.js';

/**
 * Versioned data migrators.
 * Each key is a "from" version, value is a function(data) => migrated data.
 * Migrations are applied sequentially from oldVersion up to currentVersion.
 */
const migrations = {};

// v1 → v2: add day-divider for current day if missing
registerMigration(1, (data) => {
  const result = { ...data, messages: Array.isArray(data.messages) ? [...data.messages] : [] };
  const hasDivider = result.messages.some(m => m && m.type === 'day-divider');
  if (!hasDivider && result.dates && result.dates.currentDate) {
    result.messages.push({
      type: 'day-divider',
      sender: 'system',
      timestamp: result.dates.currentDate
    });
  }
  return result;
});

// v2 → v3: drop runtime message-time tracking (dates.currentTime)
registerMigration(2, (data) => {
  if (data && data.dates && 'currentTime' in data.dates) {
    const { currentTime, ...dates } = data.dates;
    data.dates = dates;
  }
  return data;
});

/**
 * Register a migration step.
 * @param {number} fromVersion - migrate from this version
 * @param {(data: object) => object} fn - mutates data in-place, returns it
 */
export function registerMigration(fromVersion, fn) {
  migrations[fromVersion] = fn;
}

/**
 * Migrate saved data to current version.
 * @param {object} data - raw data loaded from storage
 * @param {number} [currentVersion] - defaults to SAVE_VERSION
 * @returns {object} migrated data
 */
export function migrate(data, currentVersion = SAVE_VERSION) {
  if (!data || typeof data !== 'object') {
    return { ...defaultGameState, version: currentVersion };
  }

  let version = data.version || 0;

  while (version < currentVersion) {
    const migrator = migrations[version];
    if (migrator) {
      data = migrator(data);
    }
    version++;
    data.version = version;
  }

  // Ensure all default keys exist
  for (const key of Object.keys(defaultGameState)) {
    if (!(key in data)) {
      data[key] = defaultGameState[key];
    }
  }

  return data;
}
