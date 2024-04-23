import { render, screen } from '@testing-library/react';
import App, { FilterValuesType } from './App';
import { TodoList } from './TodoList';


describe("addTask function", () => {
  test('renders without crashing', () => {
    render(<App />);
    const linkElement = screen.getByText(/Добавьте новый список дел/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('checking props transfer to TodoList', () => {
    const props = {
      title: 'Test Title',
      todoListId: '1',
      tasks: [],
      filter: 'all' as FilterValuesType,
      changeTask: jest.fn(),
      removeTask: jest.fn(),
      removeTodoList: jest.fn(),
      changeFilter: jest.fn(),
      addTask: jest.fn(),
      changeIsDown: jest.fn(),
      changeTodoListTitle: jest.fn()
    };

    render(<TodoList {...props} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
})
