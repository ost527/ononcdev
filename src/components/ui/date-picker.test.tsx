import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DatePicker } from "./date-picker";

describe("DatePicker", () => {
  it("clamps the day when paging across months (Jan 31 + 1 month → Feb 29 in 2024, not Mar)", () => {
    render(<DatePicker aria-label="Date" defaultValue={new Date(2024, 0, 31)} />);
    fireEvent.click(screen.getByRole("button", { name: "Date" }));
    fireEvent.keyDown(screen.getByRole("grid"), { key: "PageDown" });
    // The focused day is the clamped Feb 29, not an overflowed Mar 2.
    expect(document.activeElement?.textContent).toBe("29");
  });

  it("closes and restores focus to the trigger on Tab", () => {
    render(<DatePicker aria-label="Date" defaultValue={new Date(2024, 0, 15)} />);
    const trigger = screen.getByRole("button", { name: "Date" });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Tab" });
    expect(document.activeElement).toBe(trigger);
  });

  it("keeps focus on the nav button and preserves the day tab stop when paging", () => {
    const { container } = render(
      <DatePicker aria-label="Date" defaultValue={new Date(2024, 0, 15)} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Date" }));
    const next = screen.getByRole("button", { name: "Next month" });
    next.focus();
    fireEvent.click(next);
    expect(document.activeElement).toBe(next);
    expect(
      container.querySelectorAll('[role="gridcell"] button[tabindex="0"]'),
    ).toHaveLength(1);
  });
});
