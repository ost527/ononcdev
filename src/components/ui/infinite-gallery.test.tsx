import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { InfiniteGallery } from "./infinite-gallery";

describe("InfiniteGallery", () => {
  it("exposes a focusable, labelled region with usage instructions", () => {
    render(<InfiniteGallery />);
    const region = screen.getByRole("region", { name: "Infinite gallery" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(
      screen.getByText(/drag with the pointer or pan with the arrow keys/i),
    ).toBeInTheDocument();
  });

  it("keeps the duplicated tile plane out of the accessibility tree", () => {
    const { container } = render(<InfiniteGallery />);
    const plane = container.querySelector(".grid");
    expect(plane).toHaveAttribute("aria-hidden", "true");
    expect(plane!.children.length).toBeGreaterThan(0);
  });

  it("consumes arrow keys for panning but leaves other keys alone", () => {
    render(<InfiniteGallery label="Wall" />);
    const region = screen.getByRole("region", { name: "Wall" });
    // fireEvent returns false when preventDefault was called.
    expect(fireEvent.keyDown(region, { key: "ArrowRight" })).toBe(false);
    expect(fireEvent.keyDown(region, { key: "ArrowDown" })).toBe(false);
    expect(fireEvent.keyDown(region, { key: "Tab" })).toBe(true);
  });

  it("cycles custom items across the wall", () => {
    const { container } = render(
      <InfiniteGallery items={[<span key="a">A</span>, <span key="b">B</span>]} />,
    );
    expect(container.textContent).toContain("A");
    expect(container.textContent).toContain("B");
  });
});
