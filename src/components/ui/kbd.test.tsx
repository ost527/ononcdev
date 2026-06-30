import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Kbd } from "./kbd";

describe("Kbd", () => {
  it("renders each key as a kbd element", () => {
    render(<Kbd keys={["Ctrl", "K"]} />);
    expect(screen.getByText("Ctrl").tagName).toBe("KBD");
    expect(screen.getByText("K").tagName).toBe("KBD");
  });
});
