import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FocusText } from "./focus-text";

describe("FocusText", () => {
  it("exposes the whole phrase via aria-label", () => {
    render(<FocusText words={["Alpha", "Beta", "Gamma"]} />);
    expect(screen.getByLabelText("Alpha Beta Gamma")).toBeInTheDocument();
  });
});
