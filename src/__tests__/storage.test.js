import { describe, it, expect, beforeEach } from "vitest";
import { loadTasks, saveTasks, STORAGE_KEY } from "../utils/storage";

describe("storage utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saveTasks writes a JSON string to localStorage and loadTasks reads it back", () => {
    const tasks = [{ id: "1", text: "t1", completed: false }];
    saveTasks(tasks);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(tasks));
    expect(loadTasks()).toEqual(tasks);
  });

  it("loadTasks returns [] and clears key when stored value is invalid JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{ bad json");
    const loaded = loadTasks();
    expect(loaded).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("loadTasks filters out malformed entries and persists cleaned array", () => {
    const raw = JSON.stringify([
      { id: "a", text: "ok", completed: false },
      { id: 123, text: null, completed: "no" },
    ]);
    localStorage.setItem(STORAGE_KEY, raw);
    const loaded = loadTasks();
    expect(loaded).toEqual([{ id: "a", text: "ok", completed: false }]);
    // persisted cleaned
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual(loaded);
  });
});
