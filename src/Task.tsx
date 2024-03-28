import React from 'react';
import { TaskProps } from './TodoList';

export function Task(props: TaskProps) {
  return (
    <>
      {props.tasks.map(task => (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone} /><span>{task.title}</span>
          <button onClick={() => props.removeTask(task.id)}>x</button>
        </li>
      ))}
    </>
  );
}
