import React from "react";
import { Task } from "./Task";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType } from "./App";
import { EditableSpan } from "./EditableSpan";
import { RemoveButton } from "./RemoveButton";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsTitle = {
  title: string;
  tasks: Array<TaskType>;
  todoListId: string;
  filter: FilterValuesType;
  changeTask: (taskId: string, todoListId: string, newTitle: string) => void;
  removeTask: (id: string, todoListId: string) => void;
  removeTodoList: (elemId: string) => void
  changeFilter: (filter: FilterValuesType, todoListId: string) => void;
  addTask: (taskTitle: string, todoListId: string) => void;
  changeIsDown: (id: string, todoListId: string) => void;
  changeTodoListTitle: (todoListId: string, newTitle: string) => void;
};

export function TodoList(props: PropsTitle) {
  const onAllFilterClickHandler = () => {
    props.changeFilter("all", props.todoListId);
  };

  const onActiveFilterClickHandler = () => {
    props.changeFilter("active", props.todoListId);
  };

  const onCompletedFilterClickHandler = () => {
    props.changeFilter("completed", props.todoListId);
  };

  const addTask = (taskTitle: string) => {
    props.addTask(taskTitle, props.todoListId);
  };

  const onChangeTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.todoListId, newTitle);
  };

  const remover = (elemId: string) => {
    props.removeTodoList(elemId)
  };

  return (
    <div className="list">
      <h2>
        <EditableSpan title={props.title} onChangeTitle={onChangeTitle} />
        <RemoveButton remover={remover} elemId={props.todoListId} />
      </h2>
      <AddItemForm addItem={addTask} />
      <ul>
        <Task
          tasks={props.tasks}
          todoListId={props.todoListId}
          removeTask={props.removeTask}
          changeIsDown={props.changeIsDown}
          changeTask={props.changeTask}
        />
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllFilterClickHandler}
        >
          Все
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveFilterClickHandler}
        >
          Активные
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedFilterClickHandler}
        >
          Завершенные
        </button>
      </div>
    </div>
  );
}
