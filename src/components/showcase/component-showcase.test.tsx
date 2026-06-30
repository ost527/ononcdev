import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ComponentShowcase } from "./component-showcase";

describe("ComponentShowcase — Dark only badge", () => {
  const baseProps = {
    name: "Particle Field",
    description: "Drifting particles linking to neighbors and cursor.",
    code: "export const x = 1;",
    preview: <div data-testid="preview" />,
  };

  it("shows the 'Dark only' badge for full-bleed (dark-only) components", () => {
    render(<ComponentShowcase {...baseProps} bleed />);
    expect(screen.getByText("Dark only")).toBeInTheDocument();
  });

  it("omits the badge for theme-adaptive (non-bleed) components", () => {
    render(<ComponentShowcase {...baseProps} />);
    expect(screen.queryByText("Dark only")).not.toBeInTheDocument();
  });
});

describe("ComponentShowcase — card links + no inline tabs", () => {
  const base = {
    name: "Badge",
    description: "Compact status label.",
    code: "export const x = 1;",
    preview: <div data-testid="preview" />,
  };

  it("links both the title and the summary to the detail page", () => {
    render(<ComponentShowcase {...base} href="/ui/badge" />);
    expect(screen.getByRole("link", { name: "Badge" })).toHaveAttribute(
      "href",
      "/ui/badge",
    );
    expect(
      screen.getByRole("link", { name: "Compact status label." }),
    ).toHaveAttribute("href", "/ui/badge");
  });

  it("renders no Preview/Code tabs and no Customize button on a card", () => {
    render(<ComponentShowcase {...base} href="/ui/badge" />);
    expect(screen.queryByRole("tab", { name: "Preview" })).not.toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: "Code" })).not.toBeInTheDocument();
    expect(screen.queryByText("Customize")).not.toBeInTheDocument();
  });

  it("shows Preview/Code tabs + an inline viewport switch and no detail link in the block layout", () => {
    render(<ComponentShowcase {...base} layout="block" />);
    // Roving tabindex on the Preview/Code tabs.
    expect(screen.getByRole("tab", { name: "Preview" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "Code" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
    // The Desktop/Tablet/Mobile viewport switch is shown inline in the list.
    const group = screen.getByRole("group", { name: "Viewport size" });
    expect(
      within(group)
        .getAllByRole("button")
        .map((b) => b.getAttribute("aria-label")),
    ).toEqual(["Desktop", "Tablet", "Mobile"]);
    // Blocks have no detail page, so the title/summary are not links.
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies previewClassName to reserve dropdown space in the block layout", () => {
    const { container } = render(
      <ComponentShowcase {...base} layout="block" previewClassName="min-h-[22rem]" />,
    );
    expect(container.querySelector(".min-h-\\[22rem\\]")).not.toBeNull();
  });
});
