import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChromaGrid } from "./chroma-grid";

describe("ChromaGrid", () => {
  it("exposes a labelled region", () => {
    render(<ChromaGrid label="Team" />);
    expect(screen.getByRole("region", { name: "Team" })).toBeInTheDocument();
  });

  it("renders each tile twice (colour + greyscale reveal layers)", () => {
    render(<ChromaGrid items={[{ title: "Nova", subtitle: "Ops" }]} />);
    // One copy in the accessible colour layer, one in the aria-hidden twin.
    expect(screen.getAllByText("Nova")).toHaveLength(2);
    expect(screen.getAllByText("Ops")).toHaveLength(2);
  });

  it("keeps a decorative greyscale twin hidden from assistive tech", () => {
    const { container } = render(<ChromaGrid />);
    expect(container.querySelector("[aria-hidden='true']")).not.toBeNull();
  });

  it("renders without crashing when items is empty", () => {
    render(<ChromaGrid items={[]} label="Team" />);
    expect(screen.getByRole("region", { name: "Team" })).toBeInTheDocument();
  });
});
