const STORAGE_KEY = "todo.tasks.v1";

/**
 * Save tasks array to localStorage. Logs a warning on failure but does not throw.
 * @param {Array} tasks
 */
function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.warn("saveTasks: failed to write to localStorage", err);
  }
}

/**
 * Load tasks from localStorage with defensive parsing.
 * Returns an array (empty array on missing/corrupt data).
 * @returns {Array}
 */
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("loadTasks: invalid localStorage data, resetting to []", err);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      /* ignore */
    }
    return [];
  }
}

// Explicit named exports
export { STORAGE_KEY, loadTasks, saveTasks };
