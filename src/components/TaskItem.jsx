/**
 * TaskItem (skeleton)
 * Props:
 * - task: { id, text, completed }
 * - onToggle(id)
 * - onEdit(id)  -- note: edit mode not implemented yet
 * - onDelete(id)
 */
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'is-completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => onToggle?.(task.id)}
          aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`} 
        />
        <span className="task-item__text">{task.text}</span>
      </label>

      <div className="task-item__actions">
        <button onClick={() => onEdit?.(task.id)} aria-label={`Edit ${task.text}`}>Edit</button>
        <button onClick={() => onDelete?.(task.id)} aria-label={`Delete ${task.text}`}>Delete</button>
      </div>
    </li>
  )
}
