import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Named imports must match the exported symbols from the utils files
import { genId } from "./utils/id";
import { loadTasks, saveTasks } from "./utils/storage";

function App() {
  // Primary app state (single source of truth). Initialize from localStorage.
  const [tasks, setTasks] = useState(() => loadTasks());
  const [dummyCount, setDummyCount] = useState(0);

  // Persist tasks on every change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Small helper to verify state + persistence (Phase 1 only)
  const addDummyTask = () => {
    const next = dummyCount + 1;
    const newTask = {
      id: genId(),
      text: `Dummy task ${next}`,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((s) => [newTask, ...s]);
    setDummyCount(next);
  };

  return (
    <>
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
        <button onClick={addDummyTask}>Add Dummy Task</button>

        <p>
          Tasks stored: <strong>{tasks.length}</strong>
        </p>

        <details>
          <summary>Quick inspect (for development)</summary>
          <pre style={{ maxHeight: 240, overflow: "auto" }}>
            {JSON.stringify(tasks, null, 2)}
          </pre>
        </details>

        <p style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
          Verification: click "Add Dummy Task", then refresh the page — the
          dummy task must persist (check `localStorage.todo.tasks.v1`).
        </p>
      </div>

      <p className="read-the-docs">
        Follow the TASK.md & PRD.md for next steps.
      </p>
    </>
  );
}

export default App;
