import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContextMenu } from "./context-menu";

describe("ContextMenu", () => {
  it("opens at the pointer and restores focus on Escape", () => {
    render(
      <>
        <button>before</button>
        <ContextMenu items={[{ label: "Copy" }, { label: "Paste" }]}>
          <div>target</div>
        </ContextMenu>
      </>,
    );
    const before = screen.getByRole("button", { name: "before" });
    before.focus();
    expect(document.activeElement).toBe(before);

    fireEvent.contextMenu(screen.getByText("target"));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.keyDown(document.body, { key: "Escape" });
    expect(document.activeElement).toBe(before);
  });

  it("restores focus after selecting an item", () => {
    const onSelect = vi.fn();
    render(
      <>
        <button>before</button>
        <ContextMenu items={[{ label: "Copy", onSelect }]}>
          <div>target</div>
        </ContextMenu>
      </>,
    );
    const before = screen.getByRole("button", { name: "before" });
    before.focus();
    fireEvent.contextMenu(screen.getByText("target"));
    fireEvent.click(screen.getByRole("menuitem", { name: "Copy" }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(document.activeElement).toBe(before);
  });
});
