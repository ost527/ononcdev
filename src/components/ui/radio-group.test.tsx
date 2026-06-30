import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RadioGroup } from "./radio-group";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma" },
];

describe("RadioGroup", () => {
  it("selects an option on click", () => {
    render(<RadioGroup aria-label="Letters" options={options} />);
    const beta = screen.getByRole("radio", { name: "Beta" });
    expect(beta).toHaveAttribute("aria-checked", "false");
    fireEvent.click(beta);
    expect(beta).toHaveAttribute("aria-checked", "true");
  });

  it("moves the selection with ArrowDown", () => {
    render(
      <RadioGroup aria-label="Letters" defaultValue="a" options={options} />,
    );
    fireEvent.keyDown(screen.getByRole("radio", { name: "Alpha" }), {
      key: "ArrowDown",
    });
    expect(screen.getByRole("radio", { name: "Beta" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});
