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
  removeTask: Function
  changeFilter: Function
}

export type TaskProps = {
  tasks: Array<TaskType>
  removeTask: Function;
}

export type FilterValuesType = "all | active | completed"

export function TodoList(props: PropsTitle) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        <Task tasks={props.tasks} removeTask={props.removeTask} />
      </ul>
      <div>
        <button onClick={() => props.changeFilter("all")}>Все</button>
        <button onClick={() => props.changeFilter("active")}>Активные</button>
        <button onClick={() => props.changeFilter("completed")}>Завершенные</button>
      </div>
    </div>
  );
}


