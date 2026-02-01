import { useEffect, useRef, useState } from "react";

/**
 * TaskItem — full small-item behavior (edit mode implemented)
 * Props:
 * - task: { id, text, completed }
 * - onToggle(id)
 * - onEdit(id, newText)
 * - onDelete(id)
 */
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setValue(task.text);
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing, task.text]);

  const handleSave = () => {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return;
    if (trimmed !== task.text) onEdit?.(task.id, trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setIsEditing(false);
      setValue(task.text);
    }
  };

  return (
    <li
      className={`task-item ${task.completed ? "is-completed" : ""}`}
      data-task-id={task.id}
      role="listitem"
      aria-label={task.text}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => onToggle?.(task.id)}
          aria-label={`Mark ${task.text} as ${task.completed ? "incomplete" : "complete"}`}
        />

        {!isEditing ? (
          <span className="task-item__text">{task.text}</span>
        ) : (
          <input
            ref={inputRef}
            className="task-item__edit"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={`Edit ${task.text}`}
          />
        )}
      </div>

      <div className="task-item__actions">
        {!isEditing ? (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit ${task.text}`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(task.id)}
              aria-label={`Delete ${task.text}`}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSave}
              aria-label={`Save ${task.text}`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setValue(task.text);
              }}
              aria-label={`Cancel editing ${task.text}`}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
}
