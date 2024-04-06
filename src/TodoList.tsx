import React from 'react';
import { Task } from './Task';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType } from './App';

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
  changeIsDown: (id: string, todoListId: string) => void
}



export function TodoList(props: PropsTitle) {
  const onAllFilterClickHandler = () => {
    props.changeFilter("all", props.todoListId)
  }

  const onActiveFilterClickHandler = () => {
    props.changeFilter("active", props.todoListId)
  }

  const onCompletedFilterClickHandler = () => {
    props.changeFilter("completed", props.todoListId)
  }

  const addTask = (taskTitle: string) => {
    props.addTask(taskTitle, props.todoListId)
  }

  return (
    <div className='list'>
      <h3>{props.title}</h3>
      <AddItemForm addItem={addTask} />
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


