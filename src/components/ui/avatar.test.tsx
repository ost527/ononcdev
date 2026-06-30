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
});
