import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NumberInput } from "./number-input";

describe("NumberInput", () => {
  it("is a spinbutton that increments and clamps to max", () => {
    render(
      <NumberInput aria-label="Qty" defaultValue={9} min={0} max={10} step={1} />,
    );
    const input = screen.getByRole("spinbutton", { name: "Qty" });
    expect(input).toHaveAttribute("aria-valuenow", "9");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveAttribute("aria-valuenow", "10");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveAttribute("aria-valuenow", "10");
  });
});
