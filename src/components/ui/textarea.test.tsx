import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("derives the counter from a controlled value", () => {
    render(
      <Textarea value="hello" maxLength={10} showCount onChange={() => {}} />,
    );
    expect(screen.getByText("5/10")).toBeInTheDocument();
  });

  it("updates the counter on input when uncontrolled", () => {
    render(<Textarea defaultValue="" maxLength={10} showCount />);
    expect(screen.getByText("0/10")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "abc" },
    });
    expect(screen.getByText("3/10")).toBeInTheDocument();
  });
});
