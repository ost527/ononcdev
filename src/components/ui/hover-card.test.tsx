import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HoverCard } from "./hover-card";

describe("HoverCard", () => {
  it("describes the trigger with the panel while open, and clears it on blur", async () => {
    render(<HoverCard trigger={<button>More</button>}>Extra details</HoverCard>);
    const trigger = screen.getByRole("button", { name: "More" });
    expect(trigger).not.toHaveAttribute("aria-describedby");

    fireEvent.focus(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute("aria-describedby"));
    const panel = screen.getByRole("tooltip");
    expect(trigger.getAttribute("aria-describedby")).toBe(panel.id);

    fireEvent.blur(trigger);
    await waitFor(() => expect(trigger).not.toHaveAttribute("aria-describedby"));
  });
});
