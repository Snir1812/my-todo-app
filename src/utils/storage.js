const STORAGE_KEY = 'todo.tasks.v1'

/**
 * Lightweight runtime validation for a Task-like object.
 * Returns true for objects that match the minimal expected shape.
 */
function isValidTask(obj) {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.text === 'string' &&
    typeof obj.completed === 'boolean'
  )
}

/**
 * Save tasks array to localStorage. Logs a warning on failure but does not throw.
 * @param {Array} tasks
 */
function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (err) {
    console.warn('saveTasks: failed to write to localStorage', err)
  }
}

/**
 * Load tasks from localStorage with defensive parsing and validation.
 * - If key is missing => returns []
 * - If JSON.parse throws => clears the key, logs a warning, returns []
 * - If parsed value is not an array => clears the key, logs a warning, returns []
 * - If parsed is array but items are malformed => filters them out, saves cleaned array
 * @returns {Array}
 */
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      console.warn(
        `loadTasks: unexpected data type for ${STORAGE_KEY} — resetting to []`,
        parsed,
      )
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch (_) {
        /* ignore */
      }
      return []
    }

    // Filter and keep only valid tasks — helps recover from partial corruption
    const valid = parsed.filter(isValidTask)
    if (valid.length !== parsed.length) {
      console.warn('loadTasks: found malformed task entries — cleaning stored data')
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(valid))
      } catch (err) {
        console.warn('loadTasks: failed to persist cleaned data', err)
      }
    }

    return valid
  } catch (err) {
    console.warn('loadTasks: failed to parse localStorage — clearing corrupt data', err)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (_) {
      /* ignore */
    }
    return []
  }
}

// Explicit named exports
export { STORAGE_KEY, loadTasks, saveTasks }
