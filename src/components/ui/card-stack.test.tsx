import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CardStack } from "./card-stack";

describe("CardStack", () => {
  it("exposes a labelled group with an article per item", () => {
    render(<CardStack label="Deck" />);
    expect(screen.getByRole("group", { name: "Deck" })).toBeInTheDocument();
    expect(screen.getAllByRole("article", { hidden: true })).toHaveLength(4);
    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });

  it("renders custom items with titles and subtitles", () => {
    render(
      <CardStack
        label="Custom"
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

  it("cycles the exposed top card via keyboard on the group", () => {
    render(
      <CardStack
        label="Keyed"
        items={[{ title: "A" }, { title: "B" }, { title: "C" }]}
      />,
    );
    const group = screen.getByRole("group", { name: "Keyed" });
    // Only the front card is exposed to assistive tech; the rest are aria-hidden,
    // so getByRole("article") resolves to exactly the current top card.
    expect(screen.getByRole("article")).toHaveTextContent("A");
    fireEvent.keyDown(group, { key: "Enter" });
    expect(screen.getByRole("article")).toHaveTextContent("B");
    fireEvent.keyDown(group, { key: " " });
    expect(screen.getByRole("article")).toHaveTextContent("C");
  });

  it("renders without crashing when items is empty", () => {
    render(<CardStack items={[]} label="Empty" />);
    expect(screen.getByRole("group", { name: "Empty" })).toBeInTheDocument();
  });
});
