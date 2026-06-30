import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Menubar } from "./menubar";

const menus = [
  { label: "File", items: [{ label: "New" }, { label: "Open" }] },
  { label: "Edit", items: [{ label: "Undo" }] },
];

describe("Menubar", () => {
  it("opens a top-level menu on click and reveals its items", () => {
    render(<Menubar aria-label="Main" menus={menus} />);
    const file = screen.getByRole("menuitem", { name: "File" });
    expect(file).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(file);

    expect(file).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu", { name: "File" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "New" })).toBeInTheDocument();
  });
});
