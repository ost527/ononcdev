import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { ComponentPlayground } from "./component-playground";
import { ControlField } from "./playground-controls";

const badgeMeta = {
  id: "badge",
  category: "ui",
  categoryLabel: "Components",
  name: "Badge",
  description: "Compact status label.",
  sourcePath: "components/ui/badge.tsx",
};

afterEach(() => {
  window.history.replaceState(null, "", "/");
});

describe("ComponentPlayground", () => {
  it("renders Preview/Code tabs, viewport buttons, Refresh, resize handle and Customize controls", () => {
    render(
      <ComponentPlayground
        meta={badgeMeta}
        code="export const x = 1;"
        fallbackPreview={<div />}
      />,
    );
    expect(screen.getByRole("tab", { name: "Preview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Code" })).toBeInTheDocument();
    for (const name of ["Mobile", "Tablet", "Desktop"]) {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    }
    expect(screen.getByText("Refresh Preview")).toBeInTheDocument();
    expect(
      screen.getByRole("separator", { name: /resize preview width/i }),
    ).toBeInTheDocument();
    // The Customize rail is always visible when controls exist.
    expect(screen.getByText("Variant")).toBeInTheDocument();
  });

  it("switches the active viewport via aria-pressed", () => {
    const { container } = render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    const desktop = screen.getByRole("button", { name: "Desktop" });
    const mobile = screen.getByRole("button", { name: "Mobile" });
    expect(desktop).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(mobile);
    expect(mobile).toHaveAttribute("aria-pressed", "true");
    expect(desktop).toHaveAttribute("aria-pressed", "false");
    expect(container.querySelector(".transition-\\[max-width\\]")).not.toBeNull();
  });

  it("always shows the Props reference alongside the stage", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    const props = screen.getByRole("region", { name: "Props" });
    expect(within(props).getByText("Prop")).toBeInTheDocument();
    // A documented prop name renders in the table.
    expect(within(props).getByText("tone")).toBeInTheDocument();
  });

  it("shows the source with its target path on the Code tab", () => {
    render(
      <ComponentPlayground
        meta={badgeMeta}
        code="const answer = 42;"
        fallbackPreview={<div />}
      />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Code" }));
    expect(
      screen.getAllByRole("button", { name: /copy code/i }).length,
    ).toBeGreaterThan(0);
    // The source block is captioned with where to save the file.
    expect(screen.getByText("src/components/ui/badge.tsx")).toBeInTheDocument();
    // Viewport controls are hidden in the Code view.
    expect(screen.queryByRole("button", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("falls back gracefully for a component with no Customize spec", () => {
    render(
      <ComponentPlayground
        meta={{ ...badgeMeta, id: "modal", name: "Modal" }}
        code="x"
        fallbackPreview={<div data-testid="fallback" />}
      />,
    );
    // Fallback preview is shown in the stage.
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
    // The panel explains there are no live options and hides the toolbox.
    expect(screen.getByText(/no live options to customize/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /randomize options/i }),
    ).not.toBeInTheDocument();
    // Without a spec there is no generated Usage block on the Code tab either.
    fireEvent.click(screen.getByRole("tab", { name: "Code" }));
    expect(screen.queryByText("Usage")).not.toBeInTheDocument();
  });
});

describe("ComponentPlayground — grouped controls", () => {
  const chromaMeta = {
    id: "chroma-card",
    category: "ui",
    categoryLabel: "Components",
    name: "Chroma Card",
    description: "Holographic tilt card.",
    sourcePath: "components/ui/chroma-card.tsx",
  };

  it("renders titled sections for controls that declare a group", () => {
    render(
      <ComponentPlayground meta={chromaMeta} code="x" fallbackPreview={<div />} />,
    );
    const customize = screen.getByRole("region", { name: "Customize" });
    for (const title of ["Effect", "Interaction", "Card"]) {
      expect(
        within(customize).getByRole("heading", { name: title }),
      ).toBeInTheDocument();
    }
    // A control renders inside its titled section.
    const effect = within(customize).getByRole("region", { name: "Effect" });
    expect(within(effect).getByText("Sheen strength")).toBeInTheDocument();
  });

  it("keeps ungrouped specs as a single untitled grid", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    const customize = screen.getByRole("region", { name: "Customize" });
    expect(within(customize).queryAllByRole("heading", { level: 3 })).toHaveLength(0);
  });
});

describe("ComponentPlayground — customize toolbox", () => {
  it("renders a live Usage snippet on the Code tab that mirrors the current values", () => {
    const { container } = render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Code" }));
    expect(screen.getByText("Usage")).toBeInTheDocument();
    expect(container.textContent).toContain(
      'import { Badge } from "@/components/ui/badge";',
    );

    // The Customize panel stays visible below the stage, so edits update live.
    fireEvent.change(screen.getByRole("textbox", { name: "Label" }), {
      target: { value: "Shipped" },
    });
    expect(container.textContent).toContain("Shipped");
  });

  it("supports per-control reset and a counting Reset-all", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    expect(screen.getByRole("button", { name: "Reset" })).toBeDisabled();

    const input = screen.getByRole("textbox", { name: "Label" });
    fireEvent.change(input, { target: { value: "Changed" } });
    expect(screen.getByRole("button", { name: "Reset (1)" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Reset Label" }));
    expect(screen.getByRole("textbox", { name: "Label" })).toHaveValue("Badge");
    expect(screen.getByRole("button", { name: "Reset" })).toBeDisabled();
  });

  it("randomizes values without crashing and keeps the text control", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /randomize options/i }));
    expect(screen.getByRole("textbox", { name: "Label" })).toHaveValue("Badge");
  });

  it("copies a shareable URL that encodes the modified state", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Label" }), {
      target: { value: "Shared" },
    });
    fireEvent.click(screen.getByRole("button", { name: /copy shareable link/i }));
    await waitFor(() => expect(writeText).toHaveBeenCalled());
    expect(String(writeText.mock.calls[0][0])).toContain("p=");
    expect(window.location.search).toContain("p=");
  });

  it("hydrates control values from a shared ?p= param", async () => {
    const encoded = encodeURIComponent(JSON.stringify({ text: "From URL" }));
    window.history.replaceState(null, "", `/?p=${encoded}`);
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: "Label" })).toHaveValue(
        "From URL",
      ),
    );
  });
});

describe("ComponentPlayground — stage tools", () => {
  it("cycles the preview theme and backdrop", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    const theme = screen.getByRole("button", { name: /preview theme/i });
    expect(theme).toHaveAccessibleName("Preview theme: Site theme");
    fireEvent.click(theme);
    expect(
      screen.getByRole("button", { name: "Preview theme: Light" }),
    ).toBeInTheDocument();

    const backdrop = screen.getByRole("button", { name: /preview backdrop/i });
    fireEvent.click(backdrop);
    expect(
      screen.getByRole("button", { name: "Preview backdrop: Dots" }),
    ).toBeInTheDocument();
  });

  it("zooms in preset steps and resets to 100%", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    expect(screen.getByText("100%")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByText("125%")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset zoom" }));
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("hides theme/backdrop/zoom tools for full-bleed backgrounds", () => {
    render(
      <ComponentPlayground
        meta={{ ...badgeMeta, id: "waves", name: "Waves", bleed: true }}
        code="x"
        fallbackPreview={<div />}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /preview theme/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /zoom in/i }),
    ).not.toBeInTheDocument();
    // Viewport + refresh remain available.
    expect(screen.getByRole("button", { name: "Mobile" })).toBeInTheDocument();
  });
});

describe("ControlField", () => {
  it("gives the text control an accessible name", () => {
    render(
      <ControlField
        control={{ type: "text", key: "t", label: "My Field", default: "hi" }}
        value="hi"
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole("textbox", { name: "My Field" })).toBeInTheDocument();
  });

  it("reports text edits through onChange", () => {
    const onChange = vi.fn();
    render(
      <ControlField
        control={{ type: "text", key: "t", label: "Label", default: "" }}
        value=""
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Label" }), {
      target: { value: "hello" },
    });
    expect(onChange).toHaveBeenCalledWith("hello");
  });

  it("toggles a boolean control", () => {
    const onChange = vi.fn();
    render(
      <ControlField
        control={{ type: "boolean", key: "b", label: "Enabled", default: false }}
        value={false}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("switch", { name: "Enabled" }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("offers a reset affordance only when the value is modified", () => {
    const onReset = vi.fn();
    const { rerender } = render(
      <ControlField
        control={{ type: "text", key: "t", label: "Label", default: "hi" }}
        value="hi"
        onChange={() => {}}
        onReset={onReset}
      />,
    );
    expect(
      screen.queryByRole("button", { name: "Reset Label" }),
    ).not.toBeInTheDocument();

    rerender(
      <ControlField
        control={{ type: "text", key: "t", label: "Label", default: "hi" }}
        value="changed"
        onChange={() => {}}
        onReset={onReset}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Reset Label" }));
    expect(onReset).toHaveBeenCalled();
  });
});

describe("ComponentPlayground — viewport order + a11y", () => {
  it("orders the viewport buttons Desktop, Tablet, Mobile", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    const group = screen.getByRole("group", { name: "Viewport size" });
    const labels = within(group)
      .getAllByRole("button")
      .map((b) => b.getAttribute("aria-label"));
    expect(labels).toEqual(["Desktop", "Tablet", "Mobile"]);
  });

  it("gives the SegmentedControl Customize control an accessible name", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    expect(
      screen.getByRole("radiogroup", { name: "Variant" }),
    ).toBeInTheDocument();
  });

  it("uses roving tabindex on the view tablist", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    expect(screen.getByRole("tab", { name: "Preview" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "Code" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });
});
