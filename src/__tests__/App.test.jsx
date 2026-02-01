import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a task via the input and shows it in the list", () => {
    render(<App />);

    const input = screen.getByLabelText(/new task/i);
    const addBtn = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "  integrate test  " } });
    fireEvent.click(addBtn);

    expect(screen.getByText("integrate test")).toBeInTheDocument();
    // persisted
    expect(JSON.parse(localStorage.getItem("todo.tasks.v1"))[0].text).toBe(
      "integrate test",
    );
  });
});
