import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProfileCard } from "./profile-card";

describe("ProfileCard", () => {
  it("renders the name, title and handle", () => {
    render(<ProfileCard name="Jane Doe" title="Engineer" handle="jane" />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
    expect(screen.getByText("@jane")).toBeInTheDocument();
  });

  it("renders the contact button and calls onContact when clicked", () => {
    const onContact = vi.fn();
    render(
      <ProfileCard name="Jane Doe" contactLabel="Message" onContact={onContact} />,
    );
    const button = screen.getByRole("button", { name: "Message — Jane Doe" });
    fireEvent.click(button);
    expect(onContact).toHaveBeenCalledTimes(1);
  });

  it("renders initials when no avatarUrl is provided", () => {
    render(<ProfileCard name="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("handles pointer move/leave on the card without crashing", () => {
    render(<ProfileCard name="Jane Doe" title="Engineer" />);
    const card = screen.getByRole("article", { name: "Jane Doe — Engineer" });
    fireEvent.pointerMove(card, { clientX: 20, clientY: 20 });
    fireEvent.pointerLeave(card);
    expect(card).toBeInTheDocument();
  });
});
