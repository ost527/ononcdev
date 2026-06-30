import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Carousel } from "./carousel";

describe("Carousel", () => {
  const slides = [<div key="a">A</div>, <div key="b">B</div>, <div key="c">C</div>];

  it("renders the carousel region, controls, and a dot per slide", () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByRole("region", { name: "Gallery" })).toBeInTheDocument();
    expect(screen.getByLabelText("Next slide")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous slide")).toBeInTheDocument();
    expect(screen.getAllByLabelText(/^Go to slide/)).toHaveLength(slides.length);
  });
});
