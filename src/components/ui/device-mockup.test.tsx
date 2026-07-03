import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeviceMockup } from "./device-mockup";

describe("DeviceMockup", () => {
  it("renders a labelled phone frame with a placeholder screen", () => {
    render(<DeviceMockup />);
    expect(
      screen.getByRole("figure", { name: "Phone mockup" }),
    ).toBeInTheDocument();
  });

  it("renders the browser frame with its address bar text", () => {
    render(<DeviceMockup variant="browser" url="example.com" />);
    expect(
      screen.getByRole("figure", { name: "Browser window mockup" }),
    ).toBeInTheDocument();
    expect(screen.getByText("example.com")).toBeInTheDocument();
  });

  it("shows custom screen content instead of the placeholder", () => {
    render(
      <DeviceMockup variant="tablet">
        <p>My app</p>
      </DeviceMockup>,
    );
    expect(
      screen.getByRole("figure", { name: "Tablet mockup" }),
    ).toBeInTheDocument();
    expect(screen.getByText("My app")).toBeInTheDocument();
  });

  it("omits the camera cutout when notch is none", () => {
    const { container } = render(<DeviceMockup notch="none" />);
    expect(container.querySelector(".rounded-b-2xl")).toBeNull();
    expect(container.querySelector(".rounded-full.bg-black")).toBeNull();
  });
});
