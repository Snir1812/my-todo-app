# TASK.md — Incremental implementation plan ✅

Purpose: a step-by-step, phase-based plan to implement the Task Manager described in `PRD.md`. Each item is small, verifiable, and follows React 19 best practices (functional components, hooks only, no external state management).

---

## How to use this file

- Work top → down by phase. Complete small tasks and tick the checkbox when verified.
- After each small task use the **Verification** step to confirm correctness.
- Keep commits small and PRs aligned to single phases or features.

---

## Phase 0 — Infrastructure & repository (0.5 day) ⚙️

- [ ] Create feature branch: `feat/todo-mvp`  
      Check: `git status` shows branch and no unrelated changes.
- [ ] Add ESLint + Prettier (if missing) and basic config matching repo rules.  
      Check: `npm run lint` returns no errors/warnings for an empty-start commit.
- [ ] Add useful npm scripts to `package.json`: `dev`, `build`, `test`, `test:coverage`, `lint`.  
      Check: run `npm run dev` starts Vite without errors.
- [ ] Create folders: `src/components`, `src/utils`, `src/__tests__`.  
      Check: directories exist and are empty-ready.

Verification (phase): Open dev server; confirm no console warnings and that README/PRD are present.

Estimated: 2–4 hours

---

## Phase 1 — Core state & data model (0.5 day) 🧠

- [ ] Define Task schema and implement `src/utils/storage.js` with `loadTasks`, `saveTasks`, and `STORAGE_KEY`.  
      Check: `loadTasks()` returns `[]` on empty storage and `saveTasks([task])` writes valid JSON.
- [ ] Implement `src/utils/id.js` with `genId()` using `crypto.randomUUID()` + fallback.  
      Check: generated id is a string and unique across 1000 calls.
- [ ] Wire top-level state in `src/App.jsx`: `const [tasks, setTasks] = useState(loadTasks)` + `useEffect` to persist on change.  
      Check: Add a task in UI → `localStorage.getItem('todo.tasks.v1')` contains it.

Acceptance: data shape matches PRD.md `Task` interface; console has no warnings.

Estimated: 2–3 hours

---

## Phase 2 — Component skeletons & props (components only) (1 day) 🧩

Goal: create minimal, typed (prop-checked) components with no business logic — render stubs and props only.

- [ ] `TaskInput` — `src/components/TaskInput.jsx`
  - Props: `placeholder?: string`, `onCreate: (text: string) => void`
  - Render: controlled `<input>` inside `<form>` with submit button.
  - Verification: Render component in `App`; call `onCreate` mock when form submitted.
  - Check: keyboard Enter triggers `onCreate` in devtools console.

- [ ] `TaskList` — `src/components/TaskList.jsx`
  - Props: `tasks: Task[]`, `onToggle`, `onEdit`, `onDelete`
  - Render: `<ul>` placeholder for `TaskItem`s.
  - Verification: Pass sample tasks prop → correct number of `<li>` are rendered.

- [ ] `TaskItem` — `src/components/TaskItem.jsx`
  - Props: `task: Task`, `onToggle(id)`, `onEdit(id, text)`, `onDelete(id)`
  - Render: checkbox, label, edit button, delete button (no edit-mode yet).
  - Verification: Click checkbox calls `onToggle` with `task.id`.

- [ ] `Filters` — `src/components/Filters.jsx`
  - Props: `activeFilter: 'all'|'active'|'completed'`, `activeCount: number`, `onFilterChange`, `onClearCompleted`
  - Render: 3 buttons + counter + `Clear Completed` button.
  - Verification: Buttons call `onFilterChange` and visual active state switches.

Component acceptance: Prop contracts implemented; components are accessible (labels, roles) and console-clean.

Estimated: 6–8 hours (skeletons + manual verification)

---

## Phase 3 — Feature implementation (behaviour) (1–2 days)

Implement business logic and connect components to `App` state. Break into small tasks.

Add Task

- [ ] Implement creation flow in `TaskInput` → `App.setTasks` (trim + reject empty).  
      Check: Submit `  hello  ` → list shows `hello` and localStorage contains trimmed text.

Toggle Complete

- [ ] Implement `onToggle(id)` to flip `completed`.  
      Check: Toggle checkbox → UI updates and `localStorage` reflects the change.

Edit Task

- [ ] Implement inline edit in `TaskItem` (double-click or edit button) with Enter to save and Esc to cancel.  
      Check: Start edit → input focused; Enter saves new value; Esc reverts.

Delete Task

- [ ] Implement `onDelete(id)` and optional confirm UX.  
      Check: Delete removes the item and storage no longer contains it.

Filtering + Counter

- [ ] Implement `Filters` behaviour: `all|active|completed` (visual state + keyboard focus).  
      Check: Select `Active` → only active items visible; counter shows active count.

Clear Completed (bonus)

- [ ] Implement `Clear Completed` button in `Filters`.  
      Check: Click clears only completed tasks and updates storage.

Edge-cases & validations

- [ ] Prevent duplicate-empty tasks; handle very long text (truncate in UI).  
      Check: Empty/whitespace-only submission rejected; long text displayed with ellipsis but full on edit.

Acceptance: All user stories from PRD pass manual acceptance tests.

Estimated: 1–2 days

---

## Phase 4 — Persistence hardening & data migration (small) (2–4 hours)

- [ ] Add defensive parsing for `localStorage` and reset-on-corrupt data.  
      Check: Manually write invalid JSON to storage, reload → app recovers to `[]` and logs a warning (no crash).
- [ ] Implement storage key versioning (`todo.tasks.v1`) and migration notes.  
      Check: Old-schema data triggers migration or safe reset with console note.

---

## Phase 5 — Testing (Vitest) (0.5–1 day) 🧪

Setup

- [ ] Install and configure Vitest + @testing-library/react.  
      Check: `npm test` runs and reports zero tests initially.

Unit & integration tests (create `src/__tests__`) — minimum required:

- [ ] `TaskInput` — add valid task; reject empty.  
      Check: test asserts `onCreate` called with trimmed value.
- [ ] `TaskItem` — toggle checkbox; edit save/cancel; delete calls handler.  
      Check: fires and assertions pass.
- [ ] `TaskList` + `Filters` — correct filtering results.  
      Check: Render `App` with preloaded tasks and assert visible items per filter.
- [ ] Persistence — mock `localStorage` to ensure load/save behavior.  
      Check: after action and rerender, tasks are present via `localStorage` mock.
- [ ] Clear Completed — test it removes only completed items.

Integration / E2E-light

- [ ] Render `App` and run through add → toggle → filter → reload (mock) flow.  
      Check: final assertions match acceptance criteria.

Coverage goal: add tests to reach **>= 80%** on core logic.

Commands: `npm test`, `npm run test:coverage`.

Estimated: 4–8 hours

---

## Phase 6 — Polish, accessibility & CI (0.5–1 day) ✨

- [ ] Accessibility: aria labels, `aria-live` for counter, keyboard focus states, semantic elements.  
      Check: basic axe scan (or manual) — no high-impact violations.
- [ ] Lint & fix console warnings.  
      Check: `npm run lint` clean; dev console free of warnings.
- [ ] Add CI pipeline (run: install → lint → test → build).  
      Check: push branch and confirm CI passes.
- [ ] Update `README.md` with run/test/coverage instructions and the PRD link.  
      Check: README contains commands and a short project description.

Estimated: 4 hours

---

## Bonus phase — Performance & extras (optional)

- [ ] Add `Clear Completed` confirmation option or undo snackbar.  
      Check: Undo restores deleted tasks within timeframe.
- [ ] Tests for keyboard-only flows and screen-reader announcements.  
      Check: tests simulate keyboard events and assert accessibility behavior.
- [ ] (Optional) Add simple virtualization for very large lists.  
      Check: manual perf smoke-test with 10k items (no UI freeze).

---

## Component roadmap (detailed props & acceptance) 🔍

- `TaskInput` — props: `placeholder?: string`, `onCreate(text)`
  - Acceptance: trims input; Enter & button submit; rejects empty.
- `TaskList` — props: `tasks`, `onToggle`, `onEdit`, `onDelete`
  - Acceptance: renders tasks in order (newest top or bottom per PRD decision).
- `TaskItem` — props: `task`, `onToggle`, `onEdit`, `onDelete`
  - Acceptance: checkbox toggles; edit mode with Enter/Esc; delete removes and announces to screen readers.
- `Filters` — props: `activeFilter`, `activeCount`, `onFilterChange`, `onClearCompleted`
  - Acceptance: three filters + clear button; active state visually distinct and keyboard operable.

Event flow: Props down — Events up. `App` remains the single source of truth.

---

## Definition of Done (check before merge) ✅

- [ ] All acceptance tests (PRD) pass manually.
- [ ] Automated tests for core flows exist and pass.
- [ ] `localStorage` persistence verified.
- [ ] App uses only functional components and hooks.
- [ ] No console warnings/errors in dev & production builds.
- [ ] Accessibility basic checklist satisfied.
- [ ] PR linked to this `TASK.md` and `PRD.md`.

---

## Quick commands

- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npm test`
- Coverage: `npm run test:coverage`

---

## Suggested next git workflow (small commits)

1. `git checkout -b feat/todo-mvp` — commit: project scaffold + PRD/TASK.
2. `git commit -m "chore: add storage util + id helper"` — Phase 1 done.
3. `git commit -m "feat: add TaskInput & TaskList skeletons"` — Phase 2 done.
4. Create PR per feature group and request review.

---

If you want, I can now:

- Scaffold the component files and utilities to match this TASK.md, or
- Create the first Vitest unit tests (TaskInput + storage utils).

Pick one: `scaffold` or `tests`.
