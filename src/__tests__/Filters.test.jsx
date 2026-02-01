import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import Filters from "../components/Filters";

describe("Filters", () => {
  it("calls onFilterChange with the correct filter when a button is clicked", () => {
    const onFilterChange = vi.fn();
    render(
      <Filters
        activeFilter="all"
        activeCount={2}
        onFilterChange={onFilterChange}
        onClearCompleted={() => {}}
      />,
    );

    const btn = screen.getByRole("button", { name: /active/i });
    fireEvent.click(btn);
    expect(onFilterChange).toHaveBeenCalledWith("active");
  });
});
