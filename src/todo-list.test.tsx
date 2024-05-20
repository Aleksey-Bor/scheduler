import { render, fireEvent } from "@testing-library/react";
import { TodoList } from "./TodoList";
import { FilterValuesType } from "./App";

describe("TodoList component", () => {
  it("renders without crashing and calls changeFilter on filter button click", () => {
    const mockChangeFilter = jest.fn();
    const props = {
      title: "Test TodoList",
      tasks: [],
      todoListId: "1",
      filter: "all" as FilterValuesType,
      changeTask: jest.fn(),
      removeTask: jest.fn(),
      removeTodoList: jest.fn(),
      changeFilter: mockChangeFilter,
      addTask: jest.fn(),
      changeIsDown: jest.fn(),
      changeTodoListTitle: jest.fn(),
    };

    const { getByText } = render(<TodoList {...props} />);

    expect(getByText("Test TodoList")).toBeInTheDocument();

    fireEvent.click(getByText("Все"));
    expect(mockChangeFilter).toHaveBeenCalledWith("all", "1");

    fireEvent.click(getByText("Активные"));
    expect(mockChangeFilter).toHaveBeenCalledWith("active", "1");

    fireEvent.click(getByText("Завершенные"));
    expect(mockChangeFilter).toHaveBeenCalledWith("completed", "1");
  });
});
