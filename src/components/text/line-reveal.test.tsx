import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LineReveal } from "./line-reveal";

describe("LineReveal", () => {
  it("joins the lines into the accessible label", () => {
    render(<LineReveal lines={["First line", "Second line"]} />);
    expect(screen.getByLabelText("First line Second line")).toBeInTheDocument();
  });
});
