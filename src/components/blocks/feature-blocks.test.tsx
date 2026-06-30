import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FeatureAccordion } from "./feature-accordion";
import { FeaturePanels } from "./feature-panels";
import { FeatureChecklist } from "./feature-checklist";

describe("FeatureAccordion", () => {
  it("renders with the first item open and keeps a single panel open", () => {
    render(<FeatureAccordion />);
    const headers = screen.getAllByRole("button");
    expect(headers.length).toBeGreaterThanOrEqual(2);
    // defaultIndex = 0
    expect(headers[0]).toHaveAttribute("aria-expanded", "true");
    expect(headers[1]).toHaveAttribute("aria-expanded", "false");
    // opening another closes the first (single-open)
    fireEvent.click(headers[1]);
    expect(headers[1]).toHaveAttribute("aria-expanded", "true");
    expect(headers[0]).toHaveAttribute("aria-expanded", "false");
    // clicking the open header collapses it
    fireEvent.click(headers[1]);
    expect(headers[1]).toHaveAttribute("aria-expanded", "false");
  });
});

describe("FeaturePanels", () => {
  it("renders panels and activates one on click", () => {
    render(<FeaturePanels />);
    const panels = screen.getAllByRole("button");
    expect(panels.length).toBeGreaterThan(1);
    expect(panels[0]).toHaveAttribute("aria-expanded", "true"); // defaultIndex 0
    fireEvent.click(panels[2]);
    expect(panels[2]).toHaveAttribute("aria-expanded", "true");
    expect(panels[0]).toHaveAttribute("aria-expanded", "false");
  });
});

describe("FeatureChecklist", () => {
  it("renders grouped headings and checklist items", () => {
    render(<FeatureChecklist />);
    expect(
      screen.getByRole("heading", { name: "Everything in the box" }),
    ).toBeTruthy();
    expect(screen.getByText("Build")).toBeTruthy();
    expect(screen.getByText("TypeScript-first APIs")).toBeTruthy();
  });
});
