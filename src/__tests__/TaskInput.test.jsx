import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskInput from "../components/TaskInput";

describe("TaskInput", () => {
  let onCreate;
  beforeEach(() => {
    onCreate = vi.fn();
  });

  it("calls onCreate with trimmed text and clears input", () => {
    render(<TaskInput onCreate={onCreate} />);
    const input = screen.getByLabelText(/new task/i);
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "  hello world  " } });
    fireEvent.click(button);

    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onCreate).toHaveBeenCalledWith("hello world");
    expect(input.value).toBe("");
  });

  it("does not call onCreate for whitespace-only input", () => {
    render(<TaskInput onCreate={onCreate} />);
    const input = screen.getByLabelText(/new task/i);
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    expect(onCreate).not.toHaveBeenCalled();
  });
});
