# Task Manager — PRD (Source of Truth) 🎯

## 1. Project overview

A minimal, accessible Task Manager web app built with **React 19** and **Vite**. Users can add, edit, complete, filter, and remove tasks. Data persists in `localStorage`. The implementation uses only functional components and React hooks (no external state managers or routing). This document is the authoritative specification for development, testing and grading.

---

## 2. Goals & success criteria ✅

- Core CRUD for tasks (Add, Toggle Complete, Edit, Delete).
- Filter tasks (All / Active / Completed) with visible, keyboard-focusable indicators.
- Active task counter visible and accurate.
- Persistent storage using `localStorage`.
- Architecture split into at least 4 components: `TaskInput`, `TaskList`, `TaskItem`, `Filters`.
- 100% React 19 compliance (functional components + hooks only).
- No external state management or routing.
- Clean console (no warnings/errors).
- Bonus: `Clear Completed` button + unit tests with Vitest.

Success metrics (lecturer rubric):

- Functionality: all user stories implemented.
- Architecture: ≥4 logical components + clear props/events.
- Code quality: zero runtime warnings; consistent naming and folder structure.
- Persistence: tasks survive refresh.
- Testing: unit/integration tests for core flows; target coverage ≥80%.

---

## 3. User stories (primary)

1. As a user, I can create a new task so I remember work to do.
2. As a user, I can mark a task complete/uncomplete so I can track progress.
3. As a user, I can edit a task to correct or refine it.
4. As a user, I can delete a task when it's no longer needed.
5. As a user, I can filter to view All, Active, or Completed tasks.
6. As a user, I can see how many active tasks remain.
7. As a user, my tasks persist between sessions (browser refresh/close).
8. As a user, I can clear all completed tasks with one action.
9. As a user, the app works with keyboard navigation and is readable by screen readers.

Acceptance example: Given 3 tasks (2 active, 1 completed) → When I select "Active" → Then I see only the 2 active tasks and the counter shows "2".

---

## 4. Functional requirements (detailed)

- Add Task
  - Input accepts non-empty text; Enter or submit button adds task.
  - Trim whitespace; reject empty submissions.
- Toggle Complete
  - Click checkbox toggles `completed` state immediately.
- Edit Task
  - Double-click or edit button enables inline edit; Enter saves; Esc cancels.
  - Preserve focus when starting edit.
- Delete Task
  - Remove task via delete button; confirmation optional.
- Filtering
  - Filters: `All` (default), `Active`, `Completed`.
  - Active filter visually highlighted and keyboard-focusable.
- Task Counter
  - Shows number of active tasks (e.g., "2 items left").
- Persistence
  - Save tasks to `localStorage` on change; load on init.
- Clear Completed (bonus)
  - Button removes all tasks with `completed === true`.
- Quality
  - Unique IDs for tasks; clean console; consistent naming.

Non-functional:

- Responsive and performant for moderate lists (1000+ items).
- Accessible (semantic HTML, ARIA where needed).
- Fast initial load (Vite).

---

## 5. Technical stack & constraints

- Browser (modern)
- React 19 (functional components + hooks only)
- Vite
- Testing: Vitest + @testing-library/react (recommended)
- Storage: `localStorage`

Constraints:

- No class components.
- No external state-management libraries or routing.
- Keep console clean (no warnings).

---

## 6. Architecture & component breakdown 🔧

Single source of truth: top-level (`App`) state — Props down, Events up.

Required components (≥4):

- `App` — holds `tasks` + `filter`, persistence, handlers.
- `TaskInput` — new-task entry; emits `onCreate(text)`.
- `TaskList` — renders filtered tasks; container for `TaskItem`.
- `TaskItem` — display + toggle + edit + delete; emits `onToggle`, `onEdit`, `onDelete`.
- `Filters` — filter buttons + `Clear Completed`; emits `onFilterChange`, `onClearCompleted`.

Suggested file layout:

- `src/components/TaskInput.jsx`
- `src/components/TaskList.jsx`
- `src/components/TaskItem.jsx`
- `src/components/Filters.jsx`
- `src/App.jsx`
- `src/utils/storage.js`
- `src/__tests__/*`

State flow (concise):

- `App` keeps `tasks` and `filter` (useState + useEffect for persistence).
- `App` passes visible tasks to `TaskList`.
- `TaskItem` raises events; `App` updates state and persists.

Component public API (props/events):

- `TaskInput`: props: `placeholder?` — events: `onCreate(text)`
- `TaskList`: props: `tasks` — events: `onToggle(id)`, `onEdit(id,text)`, `onDelete(id)`
- `TaskItem`: props: `task` — events: `onToggle`, `onEdit`, `onDelete`
- `Filters`: props: `activeFilter`, `activeCount` — events: `onFilterChange`, `onClearCompleted`

UI details: filter chip visible state, `aria-live` for the counter, semantic elements (`form`, `ul`, `li`).

---

## 7. Data schema (single Task)

Example JSON:

```json
{
  "id": "a8f3b2e0-4d3b-4c9a-9f8e-1a2b3c4d5e6f",
  "text": "Buy milk",
  "completed": false,
  "createdAt": 1670000000000
}
```

Recommended TypeScript interface (optional):

```ts
interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
```

localStorage:

- Key: `todo.tasks.v1`
- Store: `JSON.stringify(Array<Task>)`

ID generation:

- Primary: `crypto.randomUUID()`; fallback: `${Date.now()}-${Math.random().toString(36).slice(2,9)}`.

---

## 8. Persistence & data handling

- Load on mount; validate parsed shape; fallback to [] on error.
- Save on every tasks change (debounce optional).
- Log a warning (not an exception) on corrupt data and reset storage.
- No network calls; client-only storage.

---

## 9. Testing plan (Vitest + Testing Library) 🧪

Objectives:

- Unit tests for components and utils.
- Integration tests for add → toggle → filter → persist flows.
- Mock `localStorage` for persistence tests.

Minimum tests:

- `TaskInput` — adds valid task; rejects empty input.
- `TaskItem` — toggles; edit save/cancel behavior.
- `TaskList` + `Filters` — correct filtering.
- Persistence — saved to and restored from `localStorage`.
- `Clear Completed` — removes only completed tasks.

Scripts (package.json):

- "dev": "vite"
- "build": "vite build"
- "test": "vitest"
- "test:coverage": "vitest --coverage"

Coverage target: >= 80% for core logic/components.

---

## 10. Acceptance tests (Given/When/Then) — prioritized

1. Add task
   - Given empty list → When I submit "Task A" → Then list contains "Task A" and active count is 1.
2. Toggle
   - Given active "Task A" → When I toggle it → Then it's marked completed and active count is 0.
3. Edit
   - Given "Task A" → When I edit to "Task AA" and save → Then list shows "Task AA".
4. Delete
   - Given "Task A" → When I delete it → Then it is removed and not in localStorage.
5. Filter
   - Given mixed tasks → When I select "Completed" → Then only completed tasks shown.
6. Persistence
   - Given tasks saved → When I reload the page → Then tasks are restored from `localStorage`.
7. Clear Completed
   - Given completed tasks exist → When I click `Clear Completed` → Then all completed tasks are removed.

---

## 11. UX & Accessibility checklist ✅

- Semantic HTML.
- Keyboard operable controls.
- Inputs/buttons have accessible names.
- Sufficient contrast for filter indicators.
- `aria-live="polite"` for task counter updates.

---

## 12. Quality, linting & CI

- ESLint clean (no warnings) before merge.
- CI: install → lint → test → build.
- Optional pre-commit hook to run tests/lint.

---

## 13. Definition of Done (DoD) ✔️

- All acceptance tests pass (manual + automated).
- Tests added for core flows; coverage target met.
- Persistent storage works and survives reloads.
- Only functional components + hooks used.
- No console warnings/errors.
- Component split and naming match this PRD.
- `README.md` updated with run/test instructions.

---

## 14. Timeline & estimates

- MVP (core CRUD, filters, persistence, 4 components): 1–2 days
- QA & accessibility polish: 0.5 day
- Vitest tests + CI: 0.5–1 day
- Total (complete + tests + polish): ~2–4 days (single developer)

---

## 15. Risks & mitigations

- crypto.randomUUID() not supported → fallback ID generator.
- Corrupt `localStorage` JSON → defensive parse + reset.
- Accessibility gaps → keyboard tests + axe scan/manual review.

---

## 16. Implementation notes & code snippets 🔍

localStorage helper (recommended):

```js
const STORAGE_KEY = "todo.tasks.v1";

export const loadTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    console.warn("Failed to load tasks — resetting storage");
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};
export const saveTasks = (tasks) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
```

ID helper:

```js
export const genId = () =>
  typeof crypto?.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
```

App state sketch:

```js
const [tasks, setTasks] = useState(loadTasks);
useEffect(() => saveTasks(tasks), [tasks]);
```

---

## 17. QA checklist (pre-merge)

- [ ] All acceptance tests pass (manual)
- [ ] Automated tests pass
- [ ] No console warnings/errors
- [ ] Accessibility basic checks passed
- [ ] `README.md` contains run/test instructions
- [ ] `PRD.md` included in repo root

---

## 18. Appendix — suggested test cases (short)

- Add: empty prevented; valid creates task.
- Toggle: checkbox toggles `completed`.
- Edit: Enter saves; Esc cancels.
- Delete: removes and updates storage.
- Filters: change visible set + visual state.
- Persistence: simulated reload restores tasks.
- Clear Completed: removes completed only.

---

## 19. Commands & dev notes

- Start dev server: `npm run dev`
- Run tests: `npm test`
- Run coverage: `npm run test:coverage`
- LocalStorage key: `todo.tasks.v1`

---

## Next steps

- Implement component skeletons that match this PRD (I can generate them).
- Add Vitest tests for core flows (I can scaffold tests).
