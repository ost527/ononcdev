import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { ComponentPlayground } from "./component-playground";
import { ControlField } from "./playground-controls";

const badgeMeta = {
  id: "badge",
  category: "ui",
  categoryLabel: "Components",
  name: "Badge",
  description: "Compact status label.",
};

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
    // Customize is the default tab when controls exist.
    expect(screen.getByText("Variant")).toBeInTheDocument();
  });

  it("switches the active viewport via aria-pressed", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    const desktop = screen.getByRole("button", { name: "Desktop" });
    const mobile = screen.getByRole("button", { name: "Mobile" });
    expect(desktop).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(mobile);
    expect(mobile).toHaveAttribute("aria-pressed", "true");
    expect(desktop).toHaveAttribute("aria-pressed", "false");
  });

  it("shows the Props table on the Props tab", () => {
    render(
      <ComponentPlayground meta={badgeMeta} code="x" fallbackPreview={<div />} />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Props" }));
    expect(screen.getByText("Prop")).toBeInTheDocument();
    // A documented prop name renders in the table.
    expect(screen.getByText("tone")).toBeInTheDocument();
  });

  it("shows the source on the Code tab", () => {
    render(
      <ComponentPlayground
        meta={badgeMeta}
        code="const answer = 42;"
        fallbackPreview={<div />}
      />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Code" }));
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
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
    // Customize tab explains there are no live options.
    fireEvent.click(screen.getByRole("tab", { name: "Customize" }));
    expect(
      screen.getByText(/no live options to customize/i),
    ).toBeInTheDocument();
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
