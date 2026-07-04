import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MagicBento } from "./magic-bento";

describe("MagicBento", () => {
  it("exposes a labelled group with a card per item", () => {
    render(<MagicBento label="Features" />);
    expect(screen.getByRole("group", { name: "Features" })).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Insights")).toBeInTheDocument();
  });

  it("renders custom items with titles and subtitles", () => {
    render(
      <MagicBento
        items={[
          { title: "One", subtitle: "first" },
          { title: "Two" },
        ]}
      />,
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("handles pointer move/leave without crashing", () => {
    render(<MagicBento label="Grid" />);
    const grid = screen.getByRole("group", { name: "Grid" });
    fireEvent.pointerMove(grid, { clientX: 40, clientY: 40 });
    fireEvent.pointerLeave(grid);
    expect(grid).toBeInTheDocument();
  });

  it("renders without crashing when items is empty", () => {
    render(<MagicBento items={[]} label="Empty" />);
    expect(screen.getByRole("group", { name: "Empty" })).toBeInTheDocument();
  });
});
