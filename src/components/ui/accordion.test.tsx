import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Accordion } from "./accordion";

describe("Accordion", () => {
  it("toggles aria-expanded when a header is clicked", () => {
    render(
      <Accordion
        items={[
          { title: "First", content: "One" },
          { title: "Second", content: "Two" },
        ]}
      />,
    );
    const first = screen.getByRole("button", { name: "First" });
    expect(first).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
  });
});
