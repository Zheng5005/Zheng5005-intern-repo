import { beforeEach, describe, expect, it, vi } from "vitest";
import '@testing-library/jest-dom/vitest';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import MockAPIComponent from "../src/components/MockAPIComponent";

describe("MockAPIComponent", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("fetches data and displays it after clicking the button", async () => {
    // Mocking API response
    const mockResponse = {
      id: 1, 
      title: "Mocked todo",
      completed: false,
    }

    vi.spyOn(global, "fetch").mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    })

    // Rendering component
    render(<MockAPIComponent />)

    // Clicking the button that fire the fetch action
    const button = screen.getByRole("button", { name: /fetch data/i })
    await userEvent.click(button)

    // Assert UI updates
    expect(await screen.findByText("ID: 1")).toBeInTheDocument()
    expect(screen.getByText("Title: Mocked todo")).toBeInTheDocument()
    expect(screen.getByText("Completed: false")).toBeInTheDocument()

    // Assert fetch was called
    expect(global.fetch).toHaveBeenCalledOnce()
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/1",
      expect.any(Object)
    )
  })
})
