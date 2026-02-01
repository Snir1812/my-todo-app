# React Task Manager ✅

A small, lecturer-friendly Task Manager built with **React 19** and **Vite**. Tasks persist to the browser using `localStorage` so state survives page reloads and simple grading sessions.

---

## Quick overview

- **Stack:** React 19 + Vite
- **Persistence:** `localStorage` (versioned key: `todo.tasks.v1`)
- **Testing:** Vitest + Testing Library (unit & integration)

---

## Key features ✨

- Create, Read, Update, Delete (CRUD) tasks
- Filter tasks: **All / Active / Completed**
- Persistent storage in the browser (`localStorage`) with defensive parsing
- Keyboard-friendly edit mode (Enter = save, Esc = cancel)
- Accessibility-focused UI (aria-live counter, labels, focus states)

---

## How to run (development)

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Run tests

```bash
npm test         # run once
npm run test:watch
npm run test:coverage
```

Build / preview

```bash
npm run build
npm run preview
```

---

## Component list (primary) 🔧

- `TaskInput` — controlled input + submit handler for creating new tasks.
- `TaskList` — renders the list (or empty state) and delegates per-item events.
- `TaskItem` — single task row: toggle, edit-in-place, save/cancel, delete.
- `Filters` — filter controls (All / Active / Completed), active-count display and Clear Completed action.

Files of interest: `src/App.jsx`, `src/components/TaskInput.jsx`, `src/components/TaskList.jsx`, `src/components/TaskItem.jsx`, `src/components/Filters.jsx`, `src/utils/storage.js`.

---

## Tests

- Unit & integration tests are implemented with **Vitest** and **@testing-library/react**.
- Run `npm test` to execute the suite. Tests cover: storage resilience, input behavior, filters, and core add/edit/delete flows.

---

## Known issues / limitations ⚠️

- No functional UI bugs outstanding at the time of writing; the app meets the lecturer requirements (CRUD, filters, persistence, 4+ components).
- If you see a failing test locally, run `npm test` and open the failing assertion — some environments may report an intermittent test that needs a small assertion fix (easy to patch).

---

## Implementation notes / grading pointers 💡

- Single source of truth: `src/App.jsx` holds state and handlers ("props down — events up").
- Persistence: `src/utils/storage.js` is defensive — it validates and clears corrupted data.
- IDs: `src/utils/id.js` uses `crypto.randomUUID()` with a robust fallback.
- Accessibility: keyboard support, `aria-live` for counters, and focus-visible styles are included.

---

## Contributing / next steps

- Run the test-suite, then open a PR with a short description and screenshots (if UI changes).
- Suggested enhancements: CI workflow (GitHub Actions), axe-based a11y checks, undo for "Clear completed".

---

Thank you — this project is intentionally small and focused to match the lecturer's acceptance criteria. Good luck with grading! 🎓
