import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Toolbar } from "./toolbar";

const items = [
  { type: "toggle" as const, id: "bold", label: "Bold", icon: <span>B</span>, defaultPressed: true },
  { type: "toggle" as const, id: "italic", label: "Italic", icon: <span>I</span> },
  { type: "separator" as const, id: "s1" },
  { id: "list", label: "List", icon: <span>L</span> },
];

describe("Toolbar", () => {
  it("reflects toggle state via aria-pressed", () => {
    render(<Toolbar aria-label="Format" items={items} />);
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    const italic = screen.getByRole("button", { name: "Italic" });
    expect(italic).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(italic);
    expect(italic).toHaveAttribute("aria-pressed", "true");
  });

  it("roves the tab stop with ArrowRight", () => {
    render(<Toolbar aria-label="Format" items={items} />);
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("tabindex", "0");
    fireEvent.keyDown(screen.getByRole("toolbar"), { key: "ArrowRight" });
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("tabindex", "-1");
  });
});
