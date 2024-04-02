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
  filter: FilterValuesType
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
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    } else {
      setError("Поле обязательно!")
      setNewTaskTitle("")
    }
  }

  const onNewTaskChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
    setError(null)
  }

  const onAddTaskKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTaskHandler()
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
        <input className={error ? "error" : ""}
          onChange={onNewTaskChangeHandler}
          onKeyDown={onAddTaskKeyDownHandler}
          value={newTaskTitle} />
        <button onClick={addTaskHandler}>+</button>
        <div className={error ? "error-message" : ""}>{error}</div>
      </div>
      <ul>
        <Task tasks={props.tasks}
          removeTask={props.removeTask}
          changeIsDown={props.changeIsDown} />
      </ul>
      <div>
        <button className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllFilterClickHandler}>Все</button>
        <button className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveFilterClickHandler}>Активные</button>
        <button className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedFilterClickHandler}>Завершенные</button>
      </div>
    </div>
  );
}


