import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("selects a range of two endpoints via keyboard", () => {
    const { container } = render(
      <Calendar mode="range" defaultMonth={new Date(2024, 0, 1)} aria-label="Dates" />,
    );
    const grid = screen.getByRole("grid");
    // Enter selects the focused start (Jan 1), ArrowDown moves a week, Enter sets the end.
    fireEvent.keyDown(grid, { key: "Enter" });
    fireEvent.keyDown(grid, { key: "ArrowDown" });
    fireEvent.keyDown(grid, { key: "Enter" });
    const selected = container.querySelectorAll('[role="gridcell"][aria-selected="true"]');
    expect(selected).toHaveLength(2);
  });

  it("selects a single date by default", () => {
    const { container } = render(
      <Calendar defaultMonth={new Date(2024, 0, 1)} aria-label="Day" />,
    );
    fireEvent.keyDown(screen.getByRole("grid"), { key: "Enter" });
    expect(
      container.querySelectorAll('[role="gridcell"][aria-selected="true"]'),
    ).toHaveLength(1);
  });

  it("keeps focus on the nav button and preserves the day tab stop when paging", () => {
    const { container } = render(
      <Calendar defaultMonth={new Date(2024, 0, 15)} aria-label="Day" />,
    );
    const next = screen.getByRole("button", { name: "Next month" });
    next.focus();
    fireEvent.click(next);
    expect(document.activeElement).toBe(next);
    expect(
      container.querySelectorAll('[role="gridcell"] button[tabindex="0"]'),
    ).toHaveLength(1);
  });
});
