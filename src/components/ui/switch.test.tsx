import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders as a switch and toggles aria-checked on click", () => {
    render(<Switch label="Notifications" />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("aria-checked", "false");
    fireEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("respects defaultChecked", () => {
    render(<Switch label="On" defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });
});
