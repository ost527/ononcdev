import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BounceCards } from "./bounce-cards";

describe("BounceCards", () => {
  it("exposes a focusable, labelled group with usage instructions", () => {
    render(<BounceCards />);
    const group = screen.getByRole("group", { name: "Bounce cards" });
    expect(group).toHaveAttribute("tabindex", "0");
    expect(screen.getByText(/hover or focus to spread the cards apart/i)).toBeInTheDocument();
  });

  it("renders every card", () => {
    render(
      <BounceCards items={[{ title: "One" }, { title: "Two" }, { title: "Three" }]} />,
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(screen.getByText("Three")).toBeInTheDocument();
  });

  it("does not throw when focused/blurred (spread toggle)", () => {
    render(<BounceCards label="Fan" />);
    const group = screen.getByRole("group", { name: "Fan" });
    fireEvent.focus(group);
    fireEvent.blur(group);
    expect(group).toBeInTheDocument();
  });

  it("renders without crashing when items is empty", () => {
    render(<BounceCards items={[]} label="Empty" />);
    expect(screen.getByRole("group", { name: "Empty" })).toBeInTheDocument();
  });
});
