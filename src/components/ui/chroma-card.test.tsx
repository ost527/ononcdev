import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChromaCard } from "./chroma-card";

function card(container: HTMLElement) {
  return container.querySelector<HTMLDivElement>(".group")!;
}

describe("ChromaCard", () => {
  it("renders its content and keeps all effect layers decorative", () => {
    const { container } = render(
      <ChromaCard>
        <h3>Aurora Nine</h3>
      </ChromaCard>,
    );
    expect(screen.getByText("Aurora Nine")).toBeInTheDocument();
    // Glow + two fringes + sheen + glare are all hidden from assistive tech.
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(5);
  });

  it("scales up on pointer enter and settles back on leave", () => {
    const { container } = render(
      <ChromaCard scale={1.05}>content</ChromaCard>,
    );
    const el = card(container);
    fireEvent.pointerEnter(el);
    expect(el.style.getPropertyValue("--s")).toBe("1.05");
    fireEvent.pointerLeave(el);
    expect(el.style.getPropertyValue("--s")).toBe("1");
    expect(el.style.getPropertyValue("--mx")).toBe("50%");
  });

  it("omits optional layers when disabled", () => {
    const { container } = render(
      <ChromaCard glare={false} glow={false}>
        content
      </ChromaCard>,
    );
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(3);
  });
});
