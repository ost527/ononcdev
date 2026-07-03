import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { Preloader } from "./preloader";

const originalMatchMedia = window.matchMedia;

function forceReducedMotion() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  vi.useRealTimers();
});

describe("Preloader", () => {
  it("announces a polite busy status while loading", () => {
    render(
      <div className="relative">
        <Preloader label="Preparing" />
      </div>,
    );
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Preparing…")).toBeInTheDocument();
  });

  it("completes, reveals and unmounts under reduced motion", () => {
    forceReducedMotion();
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(
      <div className="relative">
        <Preloader onComplete={onComplete} />
      </div>,
    );

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Loaded")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "false");

    act(() => {
      vi.advanceTimersByTime(900);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("keeps the visual readout decorative", () => {
    const { container } = render(
      <div className="relative">
        <Preloader variant="bar" />
      </div>,
    );
    const readouts = container.querySelectorAll('[aria-hidden="true"]');
    expect(readouts.length).toBeGreaterThanOrEqual(2);
  });
});
