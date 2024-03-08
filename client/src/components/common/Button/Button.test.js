import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Button from "./Button";

describe("Component Button", () => {
  const props = [
    { content: "Test", color: "warm-cool", class: "button--warmCool" },
    { content: "Test", color: "cool-main", class: "button--coolMain" },
    { content: "Test", color: "warm-main", class: "button--warmMain" },
  ];

  for (const prop of props) {
    it("should render without crashing with proper props", () => {
      render(<Button content={prop.content} color={prop.color} />);
    });

    it("should render button with correct class based on color prop", () => {
      render(<Button content={prop.content} color={prop.color} />);
      const button = screen.getByText("Test");
      expect(button.classList.contains(prop.class)).toBe(true);
    });

    cleanup();
  }

  it("should not render when required props are missing", () => {
    render(<Button />);
    const button = screen.queryByText("Test");
    expect(button).not.toBeInTheDocument();
  });

  it("should render with default color class when color prop is invalid", () => {
    render(<Button content="Test" color="invalid-color" />);
    const button = screen.getByText("Test");
    expect(button.classList.contains("button")).toBe(true);
  });

  it("should call onClick function when button is clicked", () => {
    const onClick = jest.fn();
    render(<Button content="Test" color="cool-main" onClick={onClick} />);
    const button = screen.getByText("Test");
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
