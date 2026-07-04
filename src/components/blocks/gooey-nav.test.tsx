import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { GooeyNav } from "./gooey-nav";

describe("GooeyNav", () => {
  it("renders a labelled nav with a button per item and marks the active one", () => {
    render(<GooeyNav label="Main" items={["Home", "Docs", "About"]} />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Docs" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("moves the active state and fires onChange on click", () => {
    const onChange = vi.fn();
    render(
      <GooeyNav items={["Home", "Docs", "About"]} onChange={onChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Docs" }));
    expect(onChange).toHaveBeenCalledWith(1);
    expect(screen.getByRole("button", { name: "Docs" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("honors defaultActive", () => {
    render(<GooeyNav items={["A", "B", "C"]} defaultActive={2} />);
    expect(screen.getByRole("button", { name: "C" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
