import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders the title and action", () => {
    render(
      <EmptyState
        title="No items"
        description="Nothing to show yet."
        action={<button type="button">Add item</button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "No items" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  });
});
