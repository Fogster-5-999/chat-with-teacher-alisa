import { SAVE_VERSION, defaultGameState } from './defaults.js';

/**
 * Versioned data migrators.
 * Each key is a "from" version, value is a function(data) => migrated data.
 * Migrations are applied sequentially from oldVersion up to currentVersion.
 */
const migrations = {};

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
