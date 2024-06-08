import { render, fireEvent } from "@testing-library/react";
import { AddItemForm } from "./AddItemForm";

describe("AddItemForm component", () => {
  it("should show helper text when the title is too long", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(
      <AddItemForm addItem={mockFn} maxLength={4} />
    );
    const inputElement = getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "TestingTesting" } });
    expect(inputElement).toHaveAttribute(
      "aria-describedby", //атрибут из Material UI
      expect.stringContaining("-helper-text") //подстрока из Material UI
    );
  });

  it("should not display supporting text if the heading is of acceptable length", () => {
    const mockFn = jest.fn();
    const maxLength = 4;
    const { getByRole, queryByText } = render(
      <AddItemForm addItem={mockFn} maxLength={maxLength} />
    );
    const inputElement = getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Test" } });
    const helperTextElement = queryByText(
      `Заголовок не должен превышать ${maxLength} символов.`
    );
    expect(helperTextElement).not.toBeInTheDocument();
  });

  it("supporting text should be displayed if the title is an empty string", () => {
    const mockFn = jest.fn();
    const { getByRole, getByText } = render(
      <AddItemForm addItem={mockFn} maxLength={4} />
    );
    const inputElement = getByRole("textbox");
    const buttonElement = getByRole("button");
    fireEvent.change(inputElement, { target: { value: "" } });
    fireEvent.click(buttonElement);

    const helperTextElement = getByText("Поле обязательно!");
    expect(helperTextElement).toBeInTheDocument();
  });

  it("should call addItem when the button is clicked and the input is valid", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(
      <AddItemForm addItem={mockFn} maxLength={4} />
    );
    const inputElement = getByRole("textbox");
    const buttonElement = getByRole("button");
    fireEvent.change(inputElement, { target: { value: "Test" } });
    fireEvent.click(buttonElement);
    expect(mockFn).toHaveBeenCalledWith("Test");
  });

  it("should call addItem when Enter is pressed and the input is valid", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(
      <AddItemForm addItem={mockFn} maxLength={4} />
    );
    const inputElement = getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Test" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(mockFn).toHaveBeenCalledWith("Test");
  });

  it("should clear the input field after an item is added", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(
      <AddItemForm addItem={mockFn} maxLength={4} />
    );
    const inputElement = getByRole("textbox") as HTMLInputElement; // приведение типа к HTMLInputElement
    const buttonElement = getByRole("button");
    fireEvent.change(inputElement, { target: { value: "Test" } });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });
});
