import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Masonry } from "./masonry";

describe("Masonry", () => {
  it("exposes a labelled list", () => {
    render(<Masonry label="Gallery" />);
    expect(screen.getByRole("list", { name: "Gallery" })).toBeInTheDocument();
  });

  it("renders a list item per tile with its title", () => {
    render(
      <Masonry
        items={[
          { title: "Alpha" },
          { title: "Beta" },
          { title: "Gamma" },
        ]}
      />,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
  });

  it("renders without crashing when items is empty", () => {
    render(<Masonry items={[]} label="Empty" />);
    const list = screen.getByRole("list", { name: "Empty" });
    expect(list).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
