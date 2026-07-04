import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardSwap } from "./card-swap";

describe("CardSwap", () => {
  it("exposes a labelled group describing itself as a card stack", () => {
    render(<CardSwap />);
    const group = screen.getByRole("group", {
      name: "Auto-rotating card stack",
    });
    expect(group).toHaveAttribute(
      "aria-roledescription",
      "Auto-rotating card stack",
    );
  });

  it("renders every card in the stack", () => {
    render(
      <CardSwap
        label="Deck"
        items={[
          { title: "First" },
          { title: "Second" },
          { title: "Third" },
        ]}
      />,
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Third")).toBeInTheDocument();
  });

  it("shows a tag when provided", () => {
    render(<CardSwap items={[{ title: "Solo", tag: "Beta" }]} />);
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders without crashing when items is empty", () => {
    render(<CardSwap items={[]} />);
    expect(
      screen.getByRole("group", { name: "Auto-rotating card stack" }),
    ).toBeInTheDocument();
  });
});
