import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";

describe("Card", () => {
  it("renders a titled card", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Pro tier</CardDescription>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Plan" })).toBeInTheDocument();
    expect(screen.getByText("Pro tier")).toBeInTheDocument();
  });
});
