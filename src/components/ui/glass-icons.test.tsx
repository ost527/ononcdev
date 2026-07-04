import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { GlassIcons } from "./glass-icons";

describe("GlassIcons", () => {
  it("exposes a labelled group of icon buttons named by their labels", () => {
    render(<GlassIcons label="Launcher" />);
    expect(screen.getByRole("group", { name: "Launcher" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument();
  });

  it("fires onSelect with the tile index", () => {
    const onSelect = vi.fn();
    render(
      <GlassIcons
        onSelect={onSelect}
        items={[{ label: "One" }, { label: "Two" }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Two" }));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it("handles pointer tilt without crashing", () => {
    render(<GlassIcons items={[{ label: "Solo" }]} />);
    const btn = screen.getByRole("button", { name: "Solo" });
    fireEvent.pointerMove(btn, { clientX: 10, clientY: 10 });
    fireEvent.pointerLeave(btn);
    expect(btn).toBeInTheDocument();
  });
});
