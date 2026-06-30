import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Collapsible } from "./collapsible";

describe("Collapsible", () => {
  it("toggles aria-expanded and makes the content inert when closed", () => {
    render(<Collapsible label="More">Hidden details</Collapsible>);
    const trigger = screen.getByRole("button", { name: "More" });
    const region = document.getElementById(
      trigger.getAttribute("aria-controls")!,
    )!;
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(region).toHaveAttribute("inert");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(region).not.toHaveAttribute("inert");
  });
});
