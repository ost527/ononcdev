import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LettersPullUp } from "./letters-pull-up";

describe("LettersPullUp", () => {
  it("exposes the full string via aria-label", () => {
    render(<LettersPullUp text="Hello world" />);
    expect(screen.getByLabelText("Hello world")).toBeInTheDocument();
  });
});
