import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("toggles aria-checked on click", () => {
    render(<Checkbox label="Subscribe" />);
    const cb = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(cb).toHaveAttribute("aria-checked", "false");
    fireEvent.click(cb);
    expect(cb).toHaveAttribute("aria-checked", "true");
  });

  it("reports the mixed state when indeterminate", () => {
    render(<Checkbox label="Select all" indeterminate />);
    expect(screen.getByRole("checkbox", { name: "Select all" })).toHaveAttribute(
      "aria-checked",
      "mixed",
    );
  });
});
