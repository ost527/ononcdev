import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Alert } from "./alert";

describe("Alert", () => {
  it("announces assertively for danger (role=alert) and politely otherwise (role=status)", () => {
    const { rerender } = render(
      <Alert variant="danger" title="Error">
        Boom
      </Alert>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(
      <Alert variant="success" title="Saved">
        Done
      </Alert>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("calls onDismiss when the close button is clicked", () => {
    const onDismiss = vi.fn();
    render(
      <Alert variant="info" title="Heads up" dismissible onDismiss={onDismiss}>
        Note
      </Alert>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
