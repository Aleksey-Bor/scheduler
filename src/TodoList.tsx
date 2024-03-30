import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Task } from './Task';

export type FilterValuesType = "all" | "active" | "completed"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsTitle = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (taskTitle: string) => void
  changeIsDown: (id: string) => void
}

export type TaskProps = {
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeIsDown: (id: string) => void
}


export function TodoList(props: PropsTitle) {
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const onNewTaskChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }

  const onAddTaskClickHandler = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle("")
  }

  const onAddTaskKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }

  const onAllFilterClickHandler = () => {
    props.changeFilter("all")
  }

  const onActiveFilterClickHandler = () => {
    props.changeFilter("active")
  }

  const onCompletedFilterClickHandler = () => {
    props.changeFilter("completed")
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input onChange={onNewTaskChangeHandler} onKeyDown={onAddTaskKeyDownHandler} value={newTaskTitle} />
        <button onClick={onAddTaskClickHandler}>+</button>
      </div>
      <ul>
        <Task tasks={props.tasks} removeTask={props.removeTask} changeIsDown={props.changeIsDown} />
      </ul>
      <div>
        <button onClick={onAllFilterClickHandler}>Все</button>
        <button onClick={onActiveFilterClickHandler}>Активные</button>
        <button onClick={onCompletedFilterClickHandler}>Завершенные</button>
      </div>
    </div>
  );
}


