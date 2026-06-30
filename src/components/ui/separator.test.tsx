import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator } from "./separator";

describe("Separator", () => {
  it("renders a separator role by default", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders the label variant", () => {
    render(<Separator label="or" />);
    expect(screen.getByText("or")).toBeInTheDocument();
  });
});
