import { useEffect, useState } from "react";

// Phase 2 component skeletons — imports must appear at the top so JSX references are defined
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";

import "./App.css";

// Named imports must match the exported symbols from the utils files
import { genId } from "./utils/id";
import { loadTasks, saveTasks } from "./utils/storage";

function App() {
  // Primary app state (single source of truth). Initialize from localStorage.
  const [tasks, setTasks] = useState(() => loadTasks());

  // Persist tasks on every change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // --- Business logic (Phase 3) -------------------------------------------------
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'

  const addTask = (text) => {
    const trimmed = String(text ?? "").trim();
    if (!trimmed) return;
    const newTask = {
      id: genId(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((s) => [newTask, ...s]);
  };

  const toggleTask = (id) =>
    setTasks((s) =>
      s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  const deleteTask = (id) => setTasks((s) => s.filter((t) => t.id !== id));
  const updateTask = (id, newText) => {
    const trimmed = String(newText ?? "").trim();
    if (!trimmed) return;
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
  };
  const clearCompleted = () => setTasks((s) => s.filter((t) => !t.completed));

  const visibleTasks = (() => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.completed);
      case "completed":
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  })();

  const activeCount = tasks.filter((t) => !t.completed).length;
  // -------------------------------------------------------------------------------

  return (
    <div id="app-root">
      <h1>Task Manager — (Phase 3: full CRUD)</h1>

      <div className="card">
        <TaskInput placeholder="Add a new task" onCreate={addTask} />

        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onEdit={updateTask}
          onDelete={deleteTask}
        />

        <Filters
          activeFilter={filter}
          activeCount={activeCount}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />

        <p style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
          Verification: add / edit / toggle / delete tasks and check persistence
          after a refresh. Use filters to view subsets and "Clear Completed" to
          remove finished tasks.
        </p>
      </div>

      <p className="read-the-docs">
        Follow the TASK.md & PRD.md for next steps.
      </p>
    </div>
  );
}

export default App;
