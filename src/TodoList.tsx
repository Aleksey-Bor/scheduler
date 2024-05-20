import React, { useCallback } from "react";
import { Task } from "./Task";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType } from "./App";
import { EditableSpan } from "./EditableSpan";
import { RemoveButton } from "./RemoveButton";
import { Button, Paper } from "@mui/material";
import _ from "lodash";

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
  removeTodoList: (elemId: string) => void;
  changeFilter: (filter: FilterValuesType, todoListId: string) => void;
  addTask: (taskTitle: string, todoListId: string) => void;
  changeIsDown: (id: string, todoListId: string, isDone: boolean) => void;
  changeTodoListTitle: (todoListId: string, newTitle: string) => void;
};

export const TodoList = React.memo(
  (props: PropsTitle) => {
    const onAllFilterClickHandler = () => {
      props.changeFilter("all", props.todoListId);
    };

    const onActiveFilterClickHandler = () => {
      props.changeFilter("active", props.todoListId);
    };

    const onCompletedFilterClickHandler = () => {
      props.changeFilter("completed", props.todoListId);
    };

    const addTask = useCallback(
      (taskTitle: string) => {
        props.addTask(taskTitle, props.todoListId);
      },
      [props.addTask, props.todoListId]
    );

    const onChangeTitle = useCallback(
      (newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle);
      },
      [props.changeTodoListTitle, props.todoListId]
    );

    const remover = useCallback(
      (elemId: string) => {
        props.removeTodoList(elemId);
      },
      [props.removeTodoList]
    );

    return (
      <Paper elevation={3} style={{ padding: 8 }} sx={{ bgcolor: "#fff9c4" }}>
        <div>
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
            <Button
              variant={props.filter === "all" ? "contained" : "text"}
              onClick={onAllFilterClickHandler}
            >
              Все
            </Button>
            <Button
              variant={props.filter === "active" ? "contained" : "text"}
              onClick={onActiveFilterClickHandler}
            >
              Активные
            </Button>
            <Button
              variant={props.filter === "completed" ? "contained" : "text"}
              onClick={onCompletedFilterClickHandler}
            >
              Завершенные
            </Button>
          </div>
        </div>
      </Paper>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.filter === nextProps.filter &&
      prevProps.title === nextProps.title &&
      _.isEqual(prevProps.tasks, nextProps.tasks)
    );
  }
);
