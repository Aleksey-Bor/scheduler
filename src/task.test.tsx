import React from 'react';
import { render } from '@testing-library/react';
import { Task, TaskProps } from './Task';

describe('Task component', () => {
  const mockRemoveTask = jest.fn();
  const mockChangeIsDown = jest.fn();
  const mockChangeTask = jest.fn();

  const props: TaskProps = {
    tasks: [
      { id: '1', title: 'Test Task', isDone: false },
    ],
    todoListId: 'todo1',
    removeTask: mockRemoveTask,
    changeIsDown: mockChangeIsDown,
    changeTask: mockChangeTask,
  };

  it('renders task', () => {
    const { getByText } = render(<Task {...props} />);
    expect(getByText('Test Task')).toBeInTheDocument();
  });

  it('renders checkbox', () => {
    const { getByRole } = render(<Task {...props} />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders remove button', () => {
    const { getByRole } = render(<Task {...props} />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
