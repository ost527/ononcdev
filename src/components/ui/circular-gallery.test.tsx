import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CircularGallery } from "./circular-gallery";

describe("CircularGallery", () => {
  it("exposes a focusable, labelled region with usage instructions", () => {
    render(<CircularGallery />);
    const region = screen.getByRole("region", { name: "Circular gallery" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(
      screen.getByText(/drag sideways or use the left and right arrow keys/i),
    ).toBeInTheDocument();
  });

  it("keeps the card track out of the accessibility tree", () => {
    const { container } = render(<CircularGallery />);
    const track = container.querySelector("[aria-hidden='true']");
    expect(track).not.toBeNull();
  });

  it("consumes arrow/Home keys for browsing but leaves other keys alone", () => {
    render(<CircularGallery label="Arc" />);
    const region = screen.getByRole("region", { name: "Arc" });
    // fireEvent returns false when preventDefault was called.
    expect(fireEvent.keyDown(region, { key: "ArrowLeft" })).toBe(false);
    expect(fireEvent.keyDown(region, { key: "ArrowRight" })).toBe(false);
    expect(fireEvent.keyDown(region, { key: "Home" })).toBe(false);
    expect(fireEvent.keyDown(region, { key: "Tab" })).toBe(true);
  });

  it("renders a card per custom item", () => {
    render(
      <CircularGallery
        items={[
          { title: "Alpha" },
          { title: "Beta" },
          { title: "Gamma" },
        ]}
      />,
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
  });

  it("renders without crashing when items is empty", () => {
    render(<CircularGallery items={[]} />);
    expect(
      screen.getByRole("region", { name: "Circular gallery" }),
    ).toBeInTheDocument();
  });
});
