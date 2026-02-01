import TaskItem from './TaskItem'

/**
 * TaskList (skeleton)
 * Props:
 * - tasks: Task[]
 * - onToggle, onEdit, onDelete
 */
export default function TaskList({ tasks = [], onToggle, onEdit, onDelete }) {
  if (!tasks.length) {
    return <div className="task-list__empty">No tasks yet — add one above.</div>
  }

  return (
    <ul className="task-list" aria-label="Task list">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
