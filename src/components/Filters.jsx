/**
 * Filters (skeleton)
 * Props:
 * - activeFilter: 'all'|'active'|'completed'
 * - activeCount: number
 * - onFilterChange(filter)
 * - onClearCompleted()
 */
export default function Filters({ activeFilter = 'all', activeCount = 0, onFilterChange, onClearCompleted }) {
  return (
    <div className="filters" role="group" aria-label="Task filters">
      <div className="filters__buttons">
        <button
          className={activeFilter === 'all' ? 'is-active' : ''}
          onClick={() => onFilterChange?.('all')}
        >
          All
        </button>
        <button
          className={activeFilter === 'active' ? 'is-active' : ''}
          onClick={() => onFilterChange?.('active')}
        >
          Active
        </button>
        <button
          className={activeFilter === 'completed' ? 'is-active' : ''}
          onClick={() => onFilterChange?.('completed')}
        >
          Completed
        </button>
      </div>

      <div className="filters__meta">
        <span className="filters__count">{activeCount} items left</span>
        <button className="filters__clear" onClick={() => onClearCompleted?.()}>Clear Completed</button>
      </div>
    </div>
  )
}
