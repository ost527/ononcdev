import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UnderlineDraw } from "./underline-draw";

describe("UnderlineDraw", () => {
  it("renders the text as real, readable content", () => {
    render(<UnderlineDraw>important</UnderlineDraw>);
    expect(screen.getByText("important")).toBeInTheDocument();
  });
});
