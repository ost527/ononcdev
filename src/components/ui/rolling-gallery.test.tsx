import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RollingGallery } from "./rolling-gallery";

describe("RollingGallery", () => {
  it("exposes a focusable, labelled region with usage instructions", () => {
    render(<RollingGallery />);
    const region = screen.getByRole("region", { name: "Rolling gallery" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(
      screen.getByText(/drag sideways or use the left and right arrow keys/i),
    ).toBeInTheDocument();
  });

  it("consumes left/right arrows for spinning but leaves other keys alone", () => {
    render(<RollingGallery label="Ring" />);
    const region = screen.getByRole("region", { name: "Ring" });
    // fireEvent returns false when preventDefault was called.
    expect(fireEvent.keyDown(region, { key: "ArrowLeft" })).toBe(false);
    expect(fireEvent.keyDown(region, { key: "ArrowRight" })).toBe(false);
    expect(fireEvent.keyDown(region, { key: "ArrowUp" })).toBe(true);
    expect(fireEvent.keyDown(region, { key: "Enter" })).toBe(true);
  });

  it("mounts a face per custom item", () => {
    render(
      <RollingGallery items={[{ title: "One" }, { title: "Two" }]} />,
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("renders without crashing when items is empty", () => {
    render(<RollingGallery items={[]} />);
    expect(
      screen.getByRole("region", { name: "Rolling gallery" }),
    ).toBeInTheDocument();
  });
});
