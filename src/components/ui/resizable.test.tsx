import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Resizable } from "./resizable";

describe("Resizable", () => {
  it("exposes a separator and resizes with the arrow keys", () => {
    render(<Resizable aria-label="Split" first={<div>A</div>} second={<div>B</div>} defaultSize={50} step={2} />);
    const sep = screen.getByRole("separator", { name: "Split" });
    expect(sep).toHaveAttribute("aria-valuenow", "50");
    fireEvent.keyDown(sep, { key: "ArrowRight" });
    expect(sep).toHaveAttribute("aria-valuenow", "52");
    fireEvent.keyDown(sep, { key: "Home" });
    expect(sep).toHaveAttribute("aria-valuenow", "15");
  });
});
