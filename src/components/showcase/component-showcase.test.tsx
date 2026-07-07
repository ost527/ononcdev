import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { useState } from "react";
import { ComponentShowcase } from "./component-showcase";

async function waitForPreviewFrame() {
  const iframe = screen.getByTitle("Component preview") as HTMLIFrameElement;
  await waitFor(() =>
    expect(iframe.contentDocument?.body.firstElementChild).not.toBeNull(),
  );
  return iframe;
}

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

describe("ComponentShowcase — heading level", () => {
  const base = {
    name: "Badge",
    description: "Compact status label.",
    code: "export const x = 1;",
    preview: <div data-testid="preview" />,
  };

  it("renders the card title as an h3 by default", () => {
    render(<ComponentShowcase {...base} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Badge" }),
    ).toBeInTheDocument();
  });

  it("renders the card title as an h2 when headingLevel='h2' (under a page h1)", () => {
    render(<ComponentShowcase {...base} headingLevel="h2" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Badge" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 3, name: "Badge" }),
    ).not.toBeInTheDocument();
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

  it("shows Preview/Code tabs + an inline viewport switch and no detail link in the block layout", async () => {
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
    await waitForPreviewFrame();
    // Blocks have no detail page, so the title/summary are not links.
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies previewClassName to reserve dropdown space in the block layout", async () => {
    const { container } = render(
      <ComponentShowcase {...base} layout="block" previewClassName="min-h-[22rem]" />,
    );
    await waitForPreviewFrame();
    expect(container.querySelector(".min-h-\\[22rem\\]")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Mobile" }));
    expect(container.querySelector(".min-h-\\[22rem\\]")).toBeNull();
  });

  it("renders block previews frameless and flush by default", async () => {
    const { container } = render(
      <ComponentShowcase {...base} layout="block" />,
    );
    await waitForPreviewFrame();
    expect(
      container.querySelector('div[style*="padding: 0px"]'),
    ).not.toBeNull();
    expect(container.querySelector(".rounded-xl.border")).toBeNull();
  });

  it("can opt into the old rounded border preview frame", async () => {
    const { container } = render(
      <ComponentShowcase {...base} layout="block" previewBorder previewPadding={12} />,
    );
    await waitForPreviewFrame();
    expect(container.querySelector(".rounded-xl.border")).not.toBeNull();
    expect(
      container.querySelector('div[style*="padding: 12px"]'),
    ).not.toBeNull();
  });

  it("renders duplicate tag labels without React key warnings", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      render(<ComponentShowcase {...base} tags={["Motion", "Motion"]} />);
      expect(
        consoleError.mock.calls.some(([message]) =>
          String(message).includes('unique "key" prop'),
        ),
      ).toBe(false);
    } finally {
      consoleError.mockRestore();
    }
  });
});

describe("ComponentShowcase — block preview refresh", () => {
  const base = {
    name: "Counter",
    description: "Preview state should reset on refresh.",
    code: "export const x = 1;",
    preview: <div data-testid="preview" />,
  };

  function StatefulPreview() {
    const [count, setCount] = useState(0);
    return (
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Count {count}
      </button>
    );
  }

  it("shows block controls on a separate row and refreshes only the preview", async () => {
    render(
      <ComponentShowcase
        {...base}
        layout="block"
        preview={<StatefulPreview />}
      />,
    );

    expect(screen.getByRole("tab", { name: "Preview" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Viewport size" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();

    await waitForPreviewFrame();
    const getPreviewBody = () =>
      (screen.getByTitle("Component preview") as HTMLIFrameElement).contentDocument!
        .body;

    await waitFor(() =>
      expect(
        within(getPreviewBody()).getByRole("button", { name: "Count 0" }),
      ).toBeInTheDocument(),
    );

    fireEvent.click(within(getPreviewBody()).getByRole("button", { name: "Count 0" }));
    expect(
      within(getPreviewBody()).getByRole("button", { name: "Count 1" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    await waitFor(() =>
      expect(
        within(getPreviewBody()).getByRole("button", { name: "Count 0" }),
      ).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByRole("tab", { name: "Code" }));
    expect(screen.getByRole("tab", { name: "Code" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.queryByRole("group", { name: "Viewport size" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Refresh" })).not.toBeInTheDocument();
  });
});
