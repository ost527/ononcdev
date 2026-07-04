import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PixelCard } from "./pixel-card";

describe("PixelCard", () => {
  it("renders its children above the effect", () => {
    render(
      <PixelCard>
        <p>Card body</p>
      </PixelCard>,
    );
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("is focusable so keyboard users can trigger the reveal", () => {
    render(
      <PixelCard label="Feature">
        <span>content</span>
      </PixelCard>,
    );
    const card = screen.getByLabelText("Feature");
    expect(card).toHaveAttribute("tabindex", "0");
  });

  it("keeps the pixel canvas decorative", () => {
    const { container } = render(
      <PixelCard>
        <span>x</span>
      </PixelCard>,
    );
    const canvas = container.querySelector("canvas");
    expect(canvas).not.toBeNull();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });
});
