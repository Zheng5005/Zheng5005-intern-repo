import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Message from "../src/components/Message";
import '@testing-library/jest-dom/vitest';
import userEvent from "@testing-library/user-event";

describe("Message", () => {
  it("render the component", () => {
    render(<Message />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  it("increments the count when the button is clicked", async () => {
    const user = userEvent.setup()
    const button = screen.getByRole("button", { name: /increment/i });

    await user.click(button)

    expect(screen.getByText("Count: 1")).toBeInTheDocument()
  })
})
