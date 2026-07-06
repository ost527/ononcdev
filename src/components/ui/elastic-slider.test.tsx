import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ElasticSlider } from "./elastic-slider";

describe("ElasticSlider", () => {
  it("renders role=slider with aria-valuenow reflecting defaultValue and aria-valuemin/max", () => {
    render(<ElasticSlider defaultValue={30} min={0} max={100} label="Volume" />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("aria-valuenow", "30");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });

  it("increases aria-valuenow and fires onValueChange on ArrowRight", () => {
    const onValueChange = vi.fn();
    render(
      <ElasticSlider
        defaultValue={50}
        step={5}
        label="Volume"
        onValueChange={onValueChange}
      />,
    );
    const slider = screen.getByRole("slider", { name: "Volume" });
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "55");
    expect(onValueChange).toHaveBeenCalledWith(55);
  });

  it("sets value to min on Home", () => {
    render(<ElasticSlider defaultValue={50} min={10} max={90} label="Volume" />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveAttribute("aria-valuenow", "10");
  });

  it("renders with showIcons on and off without crashing", () => {
    const { rerender } = render(<ElasticSlider showIcons label="A" />);
    expect(screen.getByRole("slider", { name: "A" })).toBeInTheDocument();
    rerender(<ElasticSlider showIcons={false} label="A" />);
    expect(screen.getByRole("slider", { name: "A" })).toBeInTheDocument();
  });
});
