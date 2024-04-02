import React, { useState } from 'react';
import { TaskProps } from './TodoList';

export function Task(props: TaskProps) {
  const onSetIsDownHandler = (taskId: string) => {
    props.changeIsDown(taskId)
  }

  const onRemoveTaskHandler = (taskId: string) => {
    props.removeTask(taskId)
  }

  return (
    <>
      {props.tasks.map(task => (
        <li className={task.isDone ? "completed" : ""} key={task.id}>
          <input onChange={() => onSetIsDownHandler(task.id)}
            type="checkbox"
            checked={task.isDone} /><span>{task.title}</span>
          <button onClick={() => onRemoveTaskHandler(task.id)}>x</button>
        </li>
      ))}
    </>
  );
}
  