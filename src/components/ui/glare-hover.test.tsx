"use client";

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { GlareHover } from "./glare-hover";

describe("GlareHover", () => {
  it("renders its children and the text is present", () => {
    render(
      <GlareHover>
        <span>Glare</span>
      </GlareHover>,
    );
    expect(screen.getByText("Glare")).toBeInTheDocument();
  });

  it("accepts custom glareColor prop without crashing", () => {
    render(
      <GlareHover glareColor="#ffff00">
        <span>Yellow Glare</span>
      </GlareHover>,
    );
    expect(screen.getByText("Yellow Glare")).toBeInTheDocument();
  });

  it("accepts custom glareOpacity prop without crashing", () => {
    render(
      <GlareHover glareOpacity={0.5}>
        <span>Bright</span>
      </GlareHover>,
    );
    expect(screen.getByText("Bright")).toBeInTheDocument();
  });

  it("accepts custom angle prop without crashing", () => {
    render(
      <GlareHover angle={90}>
        <span>Vertical</span>
      </GlareHover>,
    );
    expect(screen.getByText("Vertical")).toBeInTheDocument();
  });

  it("accepts custom size prop without crashing", () => {
    render(
      <GlareHover size={300}>
        <span>Large</span>
      </GlareHover>,
    );
    expect(screen.getByText("Large")).toBeInTheDocument();
  });

  it("accepts custom duration prop without crashing", () => {
    render(
      <GlareHover duration={1.2}>
        <span>Slow Sweep</span>
      </GlareHover>,
    );
    expect(screen.getByText("Slow Sweep")).toBeInTheDocument();
  });

  it("accepts custom radius prop without crashing", () => {
    render(
      <GlareHover radius={8}>
        <span>Square</span>
      </GlareHover>,
    );
    expect(screen.getByText("Square")).toBeInTheDocument();
  });

  it("accepts custom className prop without crashing", () => {
    render(
      <GlareHover className="bg-surface">
        <span>Styled</span>
      </GlareHover>,
    );
    expect(screen.getByText("Styled")).toBeInTheDocument();
  });

  it("merges a caller style with the radius instead of clobbering it", () => {
    render(
      <GlareHover radius={8} style={{ margin: 4 }}>
        <span>Merged</span>
      </GlareHover>,
    );
    const wrapper = screen.getByText("Merged").parentElement as HTMLElement;
    expect(wrapper).toHaveStyle({ borderRadius: "8px", margin: "4px" });
  });
});
