import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrackingIn } from "./tracking-in";

describe("TrackingIn", () => {
  it("renders the text as real, readable content", () => {
    render(<TrackingIn>Spread out</TrackingIn>);
    expect(screen.getByText("Spread out")).toBeInTheDocument();
  });
});
