import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TimePicker } from "./time-picker";

describe("TimePicker", () => {
  it("increments the hour spinbutton and wraps 12 → 1", () => {
    render(<TimePicker defaultValue={{ hour: 11, minute: 0, period: "AM" }} />);
    const hour = screen.getByRole("spinbutton", { name: "Hour" });
    expect(hour).toHaveAttribute("aria-valuenow", "11");
    fireEvent.keyDown(hour, { key: "ArrowUp" });
    expect(hour).toHaveAttribute("aria-valuenow", "12");
    fireEvent.keyDown(hour, { key: "ArrowUp" });
    expect(hour).toHaveAttribute("aria-valuenow", "1");
  });

  it("toggles AM/PM", () => {
    render(<TimePicker defaultValue={{ hour: 9, minute: 0, period: "AM" }} />);
    const period = screen.getByRole("button", { name: /Period/ });
    expect(period).toHaveTextContent("AM");
    fireEvent.click(period);
    expect(period).toHaveTextContent("PM");
  });
});
