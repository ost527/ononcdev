import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./breadcrumbs";

describe("Breadcrumbs", () => {
  it("marks the last item as the current page", () => {
    render(
      <Breadcrumbs
        items={[{ label: "Home" }, { label: "Docs" }, { label: "Here" }]}
      />,
    );
    expect(screen.getByText("Here")).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
  });
});
