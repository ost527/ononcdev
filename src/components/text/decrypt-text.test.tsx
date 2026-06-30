import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DecryptText } from "./decrypt-text";

describe("DecryptText", () => {
  it("exposes the final text via aria-label", () => {
    render(<DecryptText text="SECRET MESSAGE" />);
    expect(screen.getByLabelText("SECRET MESSAGE")).toBeInTheDocument();
  });
});
