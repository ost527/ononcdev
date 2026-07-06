import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("falls back to initials with an accessible name when no src", () => {
    render(<Avatar name="Mara Vance" />);
    expect(screen.getByText("MV")).toBeInTheDocument();
    expect(screen.getByText("Mara Vance")).toBeInTheDocument();
  });

  it("renders an image with alt text when src is provided", () => {
    render(<Avatar name="Iris Cho" src="/iris.png" />);
    const img = screen.getByRole("img", { name: "Iris Cho" });
    expect(img.tagName).toBe("IMG");
  });

  it("renders a labelled status dot as a sibling (not inside the clipped circle)", () => {
    render(<Avatar name="Mara Vance" status="online" />);
    const dot = screen.getByRole("img", { name: "Status: online" });
    // The dot must not sit inside an overflow-hidden ancestor, or it gets clipped.
    expect(dot.parentElement?.className).not.toContain("overflow-hidden");
  });
});
