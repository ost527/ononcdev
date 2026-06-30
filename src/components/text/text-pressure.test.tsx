import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextPressure } from "./text-pressure";

describe("TextPressure", () => {
  it("exposes the text via aria-label", () => {
    render(<TextPressure text="Press me" />);
    expect(screen.getByLabelText("Press me")).toBeInTheDocument();
  });
});
