"use client";

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StarBorder } from "./star-border";

describe("StarBorder", () => {
  it("renders its children and the text is present", () => {
    render(
      <StarBorder>
        <span>Star</span>
      </StarBorder>,
    );
    expect(screen.getByText("Star")).toBeInTheDocument();
  });

  it("accepts custom color prop without crashing", () => {
    render(
      <StarBorder color="#ff0000">
        <span>Red Border</span>
      </StarBorder>,
    );
    expect(screen.getByText("Red Border")).toBeInTheDocument();
  });

  it("accepts custom speed prop without crashing", () => {
    render(
      <StarBorder speed={10}>
        <span>Slow</span>
      </StarBorder>,
    );
    expect(screen.getByText("Slow")).toBeInTheDocument();
  });

  it("accepts custom thickness prop without crashing", () => {
    render(
      <StarBorder thickness={4}>
        <span>Thick</span>
      </StarBorder>,
    );
    expect(screen.getByText("Thick")).toBeInTheDocument();
  });

  it("accepts custom radius prop without crashing", () => {
    render(
      <StarBorder radius={24}>
        <span>Rounded</span>
      </StarBorder>,
    );
    expect(screen.getByText("Rounded")).toBeInTheDocument();
  });

  it("accepts custom className prop without crashing", () => {
    render(
      <StarBorder className="text-muted">
        <span>Styled</span>
      </StarBorder>,
    );
    expect(screen.getByText("Styled")).toBeInTheDocument();
  });

  it("accepts a custom glow without crashing", () => {
    render(
      <StarBorder glow={24}>
        <span>Glow</span>
      </StarBorder>,
    );
    expect(screen.getByText("Glow")).toBeInTheDocument();
  });
});
