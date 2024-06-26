import { render, screen } from "@testing-library/react";
import App, { FilterValuesType } from "./App";
import { TodoList } from "./TodoList";
import { Provider } from "react-redux";
import store from "./state/store";

describe("App component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/Добавьте новый список дел/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("checking props transfer to TodoList", () => {
    const props = {
      title: "Test Title",
      todoListId: "1",
      tasks: [],
      filter: "all" as FilterValuesType,
      changeTask: jest.fn(),
      removeTask: jest.fn(),
      removeTodoList: jest.fn(),
      changeFilter: jest.fn(),
      addTask: jest.fn(),
      changeIsDone: jest.fn(),
      changeTodoListTitle: jest.fn(),
    };

    render(<TodoList {...props} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});
