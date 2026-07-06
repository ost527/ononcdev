import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FlowingMenu } from "./flowing-menu";

describe("FlowingMenu", () => {
  it("renders the nav by label with a link per default item", () => {
    render(<FlowingMenu />);
    expect(screen.getByRole("navigation", { name: "Flowing menu" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("renders custom items, using a button when href is omitted", () => {
    render(
      <FlowingMenu
        label="Custom menu"
        items={[{ label: "One", href: "/one" }, { label: "Two" }]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Custom menu" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "One" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Two" })).toBeInTheDocument();
  });

  it("renders without crashing when items is empty", () => {
    render(<FlowingMenu items={[]} label="Empty menu" />);
    expect(screen.getByRole("navigation", { name: "Empty menu" })).toBeInTheDocument();
  });

  it("keeps a single accessible name under reduced motion", () => {
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia;
    try {
      render(<FlowingMenu items={[{ label: "Home", href: "/" }]} />);
      // The marquee band stays aria-hidden, so the name is the resting label
      // only — never the doubled "Home Home" the band would otherwise add.
      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    } finally {
      window.matchMedia = original;
    }
  });
});
