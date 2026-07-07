import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SwipeCards, type SwipeCardItem } from "./swipe-cards";

const ITEMS: SwipeCardItem[] = [
  { id: "a", title: "Alpha", subtitle: "First", tags: ["one"] },
  { id: "b", title: "Bravo", subtitle: "Second" },
  { id: "c", title: "Charlie" },
];

/** Force reduced-motion so a swipe commits synchronously (no rAF animation). */
function reduceMotion() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("reduced-motion"),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

/** The front card is the only one not hidden from assistive tech. */
function expectFrontCard(title: string) {
  const el = screen.getByText(title);
  expect(el.closest('[aria-hidden="true"]')).toBeNull();
}

describe("SwipeCards", () => {
  it("exposes a focusable, labelled deck with keyboard instructions", () => {
    render(<SwipeCards items={ITEMS} label="Deck" />);
    const group = screen.getByRole("group", { name: "Deck" });
    expect(group).toHaveAttribute("tabindex", "0");
    expect(group).toHaveAttribute("aria-roledescription", "Card deck");
    expect(
      screen.getByText(/use the left and right arrow keys/i),
    ).toBeInTheDocument();
  });

  it("shows the front card and pointer-free Pass/Keep controls", () => {
    render(<SwipeCards items={ITEMS} />);
    expectFrontCard("Alpha");
    expect(screen.getByRole("button", { name: "Pass" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Keep" })).toBeInTheDocument();
  });

  it("advances to the next card on an arrow key, leaving other keys alone", () => {
    reduceMotion();
    render(<SwipeCards items={ITEMS} />);
    const group = screen.getByRole("group", { name: "Swipeable card deck" });
    // Arrow keys are consumed (preventDefault → dispatchEvent returns false)…
    expect(fireEvent.keyDown(group, { key: "ArrowRight" })).toBe(false);
    // …and reveal the next card.
    expectFrontCard("Bravo");
    // A non-arrow key is left for the browser.
    expect(fireEvent.keyDown(group, { key: "Enter" })).toBe(true);
  });

  it("stops with a restart affordance when the deck empties and loop is off", () => {
    reduceMotion();
    render(<SwipeCards items={ITEMS} loop={false} />);
    const group = screen.getByRole("group", { name: "Swipeable card deck" });
    fireEvent.keyDown(group, { key: "ArrowLeft" });
    fireEvent.keyDown(group, { key: "ArrowLeft" });
    fireEvent.keyDown(group, { key: "ArrowLeft" });
    expect(screen.getByText(/that's everyone/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /restart/i })).toBeInTheDocument();
  });

  it("keeps the cards behind the front one out of the accessibility tree", () => {
    const { container } = render(<SwipeCards items={ITEMS} />);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });
});
