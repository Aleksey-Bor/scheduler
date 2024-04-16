import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EditableSpan } from './EditableSpan'; 

describe('EditableSpan', () => {
  it('renders correctly and switches between view and edit modes', () => {
    const onChangeTitle = jest.fn();
    const { getByText, getByDisplayValue } = render(<EditableSpan title="Test title" onChangeTitle={onChangeTitle} />);

    // Проверяем, что спан с начальным заголовком отображается
    const span = getByText('Test title');
    expect(span).toBeInTheDocument();

    // Симулируем двойной клик по спану, чтобы перейти в режим редактирования
    fireEvent.doubleClick(span);

    // Проверяем, что поле ввода с начальным значением отображается
    const input = getByDisplayValue('Test title');
    expect(input).toBeInTheDocument();

    // Изменяем значение поля ввода
    fireEvent.change(input, { target: { value: 'New title' } });

    // Симулируем событие onBlur, чтобы перейти обратно в режим просмотра
    fireEvent.blur(input);

    // Проверяем, что функция onChangeTitle вызывается с новым значением
    expect(onChangeTitle).toHaveBeenCalledWith('New title');
  });
});
