import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ColorPicker } from "./color-picker";

describe("ColorPicker", () => {
  it("renders the saturation and hue sliders", () => {
    render(<ColorPicker defaultValue="#8b5cf6" />);
    expect(screen.getByRole("slider", { name: /saturation/i })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Hue" })).toHaveAttribute("aria-valuemax", "360");
  });

  it("syncs the hue from a typed hex value", () => {
    render(<ColorPicker defaultValue="#8b5cf6" />);
    fireEvent.change(screen.getByLabelText("Hex color"), {
      target: { value: "#00ff00" },
    });
    expect(screen.getByRole("slider", { name: "Hue" })).toHaveAttribute("aria-valuenow", "120");
  });
});
