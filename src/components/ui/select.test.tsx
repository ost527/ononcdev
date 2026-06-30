import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Select } from "./select";

const options = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

describe("Select", () => {
  it("keeps aria-activedescendant on the focused trigger (not the listbox), only while open", () => {
    render(<Select aria-label="Framework" options={options} />);
    const trigger = screen.getByRole("combobox", { name: "Framework" });
    expect(trigger).not.toHaveAttribute("aria-activedescendant");

    fireEvent.click(trigger);

    const active = trigger.getAttribute("aria-activedescendant");
    expect(active).toBeTruthy();
    expect(document.getElementById(active!)).toBeInTheDocument();
    expect(screen.getByRole("listbox")).not.toHaveAttribute(
      "aria-activedescendant",
    );
  });

  it("selects an option on click", () => {
    render(<Select aria-label="Framework" options={options} />);
    fireEvent.click(screen.getByRole("combobox", { name: "Framework" }));
    fireEvent.mouseDown(screen.getByRole("option", { name: "Remix" }));
    expect(screen.getByRole("combobox", { name: "Framework" })).toHaveTextContent(
      "Remix",
    );
  });
});
