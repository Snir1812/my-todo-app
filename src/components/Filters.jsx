/**
 * Filters (behavioral)
 * Props:
 * - activeFilter: 'all'|'active'|'completed'
 * - activeCount: number
 * - onFilterChange(filter)
 * - onClearCompleted()
 */
export default function Filters({
  activeFilter = "all",
  activeCount = 0,
  onFilterChange,
  onClearCompleted,
}) {
  return (
    <div className="filters" role="group" aria-label="Task filters">
      <div className="filters__buttons" role="tablist" aria-label="Filters">
        <button
          type="button"
          aria-pressed={activeFilter === "all"}
          className={activeFilter === "all" ? "is-active" : ""}
          onClick={() => onFilterChange?.("all")}
        >
          All
        </button>
        <button
          type="button"
          aria-pressed={activeFilter === "active"}
          className={activeFilter === "active" ? "is-active" : ""}
          onClick={() => onFilterChange?.("active")}
        >
          Active
        </button>
        <button
          type="button"
          aria-pressed={activeFilter === "completed"}
          className={activeFilter === "completed" ? "is-active" : ""}
          onClick={() => onFilterChange?.("completed")}
        >
          Completed
        </button>
      </div>

      <div className="filters__meta">
        <span className="filters__count" role="status" aria-live="polite">
          {activeCount} items left
        </span>
        <button
          type="button"
          className="filters__clear"
          aria-label="Clear completed tasks"
          onClick={() => onClearCompleted?.()}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}
