import React from 'react';
import { Task } from './Task';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsTitle = {
  title: string
  tasks: Array<TaskType>
}

export type TaskProps = {
  tasks: Array<TaskType>
}

export function TodoList(props: PropsTitle) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        <Task tasks={props.tasks} />
      </ul>
      <div>
        <button>Все</button>
        <button>Активные</button>
        <button>Завершенные</button>
      </div>
    </div>
  );
}


