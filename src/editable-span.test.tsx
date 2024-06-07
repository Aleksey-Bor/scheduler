//Ideal test :))
// Импорт необходимых библиотек и компонентов
import { render, fireEvent } from "@testing-library/react";
import { EditableSpan } from "./EditableSpan";

// Начало блока тестов для компонента EditableSpan
describe("EditableSpan component", () => {
  // Тест на проверку отображения заголовка и активации режима редактирования при двойном клике
  it("should display the title and activate edit mode on double click", () => {
    const mockFn = jest.fn();
    const { getByText, getByRole } = render(
      <EditableSpan title="Test" maxLength={10} onChangeTitle={mockFn} />
    );
    const spanElement = getByText("Test");
    fireEvent.doubleClick(spanElement);
    const inputElement = getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  // Тест на проверку изменения заголовка
  it("should change the title", () => {
    const mockFn = jest.fn();
    const { getByText, getByRole } = render(
      <EditableSpan title="Test" maxLength={10} onChangeTitle={mockFn} />
    );
    const spanElement = getByText("Test");
    fireEvent.doubleClick(spanElement);
    const inputElement = getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "New Test" } });
    fireEvent.blur(inputElement);
    expect(mockFn).toHaveBeenCalledWith("New Test");
  });

  // Тест на проверку валидации длины заголовка
  it("should validate the length of the title", () => {
    const mockFn = jest.fn();
    const { getByText, getByRole } = render(
      <EditableSpan title="Test" maxLength={7} onChangeTitle={mockFn} />
    );
    const spanElement = getByText("Test");
    fireEvent.doubleClick(spanElement);
    const inputElement = getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "TestingTesting" } });
    fireEvent.blur(inputElement);
    expect(inputElement).toHaveAttribute("aria-invalid", "true");
    expect(inputElement).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("-helper-text")
    );
  });
});
