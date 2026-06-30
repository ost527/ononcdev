import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextReveal } from "./text-reveal";

describe("TextReveal", () => {
  it("renders the text as real, readable content", () => {
    render(<TextReveal>Reveal me</TextReveal>);
    expect(screen.getByText("Reveal me")).toBeInTheDocument();
  });
});
