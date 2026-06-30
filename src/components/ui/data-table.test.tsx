import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DataTable } from "./data-table";

const columns = [
  { key: "name" as const, header: "Name", sortable: true },
  { key: "score" as const, header: "Score", sortable: true, align: "right" as const },
];
const rows = [
  { name: "Bravo", score: 2 },
  { name: "Alpha", score: 9 },
];

function setup() {
  return render(
    <DataTable columns={columns} rows={rows} rowKey="name" selectable caption="Scores" />,
  );
}

describe("DataTable", () => {
  it("toggles aria-sort ascending then descending on the header", () => {
    setup();
    const header = screen.getByRole("columnheader", { name: "Name" });
    expect(header).toHaveAttribute("aria-sort", "none");
    fireEvent.click(screen.getByRole("button", { name: "Name" }));
    expect(header).toHaveAttribute("aria-sort", "ascending");
    fireEvent.click(screen.getByRole("button", { name: "Name" }));
    expect(header).toHaveAttribute("aria-sort", "descending");
  });

  it("selects every row via the header checkbox", () => {
    setup();
    fireEvent.click(screen.getByLabelText("Select all rows"));
    expect(screen.getByLabelText("Select row Alpha")).toBeChecked();
    expect(screen.getByLabelText("Select row Bravo")).toBeChecked();
  });
});
