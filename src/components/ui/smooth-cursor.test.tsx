import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SmoothCursor } from "./smooth-cursor";

function area(container: HTMLElement) {
  return container.firstElementChild as HTMLDivElement;
}

describe("SmoothCursor", () => {
  it("renders its hover area content with a decorative cursor layer", () => {
    const { container } = render(
      <SmoothCursor>
        <button type="button">Target</button>
      </SmoothCursor>,
    );
    expect(screen.getByRole("button", { name: "Target" })).toBeInTheDocument();
    const layer = container.querySelector('[aria-hidden="true"]');
    expect(layer).not.toBeNull();
  });

  it("reveals the cursor on enter and hides it again on leave", () => {
    const { container } = render(<SmoothCursor>area</SmoothCursor>);
    const root = area(container);
    fireEvent.pointerEnter(root, { clientX: 40, clientY: 40 });
    expect(root.style.getPropertyValue("--cursor-opacity")).toBe("1");
    fireEvent.pointerLeave(root);
    expect(root.style.getPropertyValue("--cursor-opacity")).toBe("0");
  });

  it("renders the requested trail ghost count", () => {
    const { container } = render(
      <SmoothCursor trail={3}>area</SmoothCursor>,
    );
    const layer = container.querySelector('[aria-hidden="true"]')!;
    // 3 ghosts + ring + dot.
    expect(layer.children.length).toBe(5);
  });

  it("hides the native cursor only when asked", () => {
    const { container, rerender } = render(
      <SmoothCursor>area</SmoothCursor>,
    );
    expect(area(container).className).toContain("cursor-none");
    rerender(<SmoothCursor hideNative={false}>area</SmoothCursor>);
    expect(area(container).className).not.toContain("cursor-none");
  });
});
