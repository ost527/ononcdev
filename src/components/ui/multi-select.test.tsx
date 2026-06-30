import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MultiSelect } from "./multi-select";

const options = ["React", "Vue", "Svelte"];

describe("MultiSelect", () => {
  it("renders chips for defaultValue and removes one on ×", () => {
    render(<MultiSelect aria-label="Tech" defaultValue={["React"]} options={options} />);
    const remove = screen.getByLabelText("Remove React");
    fireEvent.click(remove);
    expect(screen.queryByText("React")).toBeNull();
  });

  it("adds a selection from the listbox", () => {
    render(<MultiSelect aria-label="Tech" options={options} />);
    fireEvent.focus(screen.getByRole("combobox", { name: "Tech" }));
    fireEvent.mouseDown(screen.getByRole("option", { name: "Vue" }));
    expect(screen.getByLabelText("Remove Vue")).toBeInTheDocument();
  });
});
