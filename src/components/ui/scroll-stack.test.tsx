import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ScrollStack } from "./scroll-stack";

describe("ScrollStack", () => {
  it("renders a labelled region with an article per item", () => {
    render(<ScrollStack label="Features" />);
    const region = screen.getByRole("region", { name: "Features" });
    expect(region).toBeInTheDocument();
    // DEFAULT_ITEMS ships four cards.
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });

  it("renders custom items with titles and subtitles", () => {
    render(
      <ScrollStack
        label="Custom"
        items={[
          { title: "One", subtitle: "first" },
          { title: "Two" },
        ]}
      />,
    );
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("does not crash on a scroll event on the viewport", () => {
    const { container } = render(<ScrollStack label="Scrolling" />);
    const viewport = container.querySelector("div[style]");
    expect(viewport).not.toBeNull();
    fireEvent.scroll(viewport as Element);
    expect(
      screen.getByRole("region", { name: "Scrolling" }),
    ).toBeInTheDocument();
  });

  it("renders without crashing when items is empty", () => {
    render(<ScrollStack items={[]} label="Empty" />);
    expect(screen.getByRole("region", { name: "Empty" })).toBeInTheDocument();
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
