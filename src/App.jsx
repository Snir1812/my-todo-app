import { useEffect, useState } from "react";

// Phase 2 component skeletons — imports must appear at the top so JSX references are defined
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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

  return (
    <div id="app-root">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Task Manager — (logic + persistence: Phase 1)</h1>

      <div className="card">
        <TaskInput
          placeholder="Add a new task"
          onCreate={(text) => {
            // App-level handler: create and persist a new task
            const newTask = {
              id: genId(),
              text,
              completed: false,
              createdAt: Date.now(),
            };
            setTasks((s) => [newTask, ...s]);
          }}
        />

        <TaskList
          tasks={tasks}
          onToggle={(id) => {
            setTasks((s) =>
              s.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t,
              ),
            );
          }}
          onEdit={(id) => console.log("onEdit", id)}
          onDelete={(id) => console.log("onDelete", id)}
        />

        <Filters
          activeFilter="all"
          activeCount={tasks.filter((t) => !t.completed).length}
          onFilterChange={(f) => console.log("filter->", f)}
          onClearCompleted={() =>
            setTasks((s) => s.filter((t) => !t.completed))
          }
        />

        <p style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
          Verification: ensure TaskInput calls `onCreate`, TaskList renders
          items and TaskItem events (`onToggle`, `onEdit`, `onDelete`) print to
          console.
        </p>
      </div>

      <p className="read-the-docs">
        Follow the TASK.md & PRD.md for next steps.
      </p>
    </div>
  );
}

export default App;
