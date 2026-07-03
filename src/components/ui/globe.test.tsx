import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Globe } from "./globe";

describe("Globe", () => {
  it("exposes an image role with a descriptive default label", () => {
    render(<Globe className="size-40" />);
    expect(
      screen.getByRole("img", { name: "Rotating dotted globe" }),
    ).toBeInTheDocument();
  });

  it("keeps the canvas itself decorative and supports a custom label", () => {
    const { container } = render(<Globe label="Network globe" />);
    expect(screen.getByRole("img", { name: "Network globe" })).toBeInTheDocument();
    expect(container.querySelector("canvas")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("only offers the grab cursor when draggable", () => {
    const { container, rerender } = render(<Globe />);
    expect(
      (container.firstElementChild as HTMLElement).className,
    ).toContain("cursor-grab");
    rerender(<Globe draggable={false} />);
    expect(
      (container.firstElementChild as HTMLElement).className,
    ).not.toContain("cursor-grab");
  });
});
