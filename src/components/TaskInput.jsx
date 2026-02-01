import { useState } from "react";

/**
 * TaskInput (skeleton)
 * Props:
 * - onCreate(text: string): void
 */
export default function TaskInput({
  placeholder = "What needs to be done?",
  onCreate,
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onCreate?.(trimmed);
    setValue("");
  };

  return (
    <form className="task-input" onSubmit={handleSubmit} aria-label="Add task">
      <input
        className="task-input__field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="New task"
      />
      <button className="task-input__add" type="submit" aria-label="Add task">
        Add
      </button>
    </form>
  );
}
