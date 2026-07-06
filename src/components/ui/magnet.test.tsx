import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Magnet } from "./magnet";

describe("Magnet", () => {
  it("renders its children", () => {
    render(
      <Magnet>
        <button type="button">Magnet me</button>
      </Magnet>,
    );
    expect(screen.getByText("Magnet me")).toBeInTheDocument();
  });

  it("does not crash on a window pointermove", () => {
    render(
      <Magnet>
        <button type="button">Magnet me</button>
      </Magnet>,
    );
    fireEvent(
      window,
      new PointerEvent("pointermove", { clientX: 10, clientY: 10 }),
    );
    expect(screen.getByText("Magnet me")).toBeInTheDocument();
  });

  it("renders children fine when disabled", () => {
    render(
      <Magnet disabled>
        <button type="button">Magnet me</button>
      </Magnet>,
    );
    expect(screen.getByText("Magnet me")).toBeInTheDocument();
  });
});
