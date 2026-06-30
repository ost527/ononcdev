import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TreeView } from "./tree-view";

const data = [
  { id: "src", label: "src", children: [{ id: "a", label: "alpha.tsx" }] },
  { id: "readme", label: "README.md" },
];

describe("TreeView", () => {
  it("expands a node with ArrowRight and reveals its children", () => {
    render(<TreeView aria-label="Files" data={data} />);
    const src = screen.getByRole("treeitem", { name: /src/ });
    expect(src).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("alpha.tsx")).toBeNull();

    fireEvent.keyDown(src, { key: "ArrowRight" });

    expect(src).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("alpha.tsx")).toBeInTheDocument();
  });
});
