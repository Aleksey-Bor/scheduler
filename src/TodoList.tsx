import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Task } from './Task';

export type FilterValuesType = "all" | "active" | "completed"

export type todoListType = { id: string, title: string, filter: FilterValuesType }

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsTitle = {
  title: string
  tasks: Array<TaskType>
  todoListId: string
  filter: FilterValuesType
  removeTask: (id: string, todoListId: string) => void
  changeFilter: (filter: FilterValuesType, todoListId: string) => void
  addTask: (taskTitle: string, todoListId: string) => void
  changeIsDown: (id: string,  todoListId: string) => void
}

export type TaskProps = {
  tasks: Array<TaskType>
  todoListId: string
  removeTask: (id: string, todoListId: string) => void
  changeIsDown: (id: string,  todoListId: string) => void
}


export function TodoList(props: PropsTitle) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle, props.todoListId)
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
    props.changeFilter("all", props.todoListId)
  }

  const onActiveFilterClickHandler = () => {
    props.changeFilter("active", props.todoListId)
  }

  const onCompletedFilterClickHandler = () => {
    props.changeFilter("completed", props.todoListId)
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
          todoListId={props.todoListId}
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


