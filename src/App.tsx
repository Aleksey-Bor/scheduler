import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { Box, Grid } from "@mui/material";
import {
  AddTodoListAC,
  ChangeFilterTodoListAC,
  ChangeTitleTodoListAC,
  RemoveTodoListAC,
  SetTodoListsAC,
} from "./state/todolists-reducer";
import {
  AddTaskAC,
  ChangeIsDoneTaskAC,
  ChangeTitleTaskAC,
  RemoveTaskAC,
  RemoveTasksAC,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import React, { useCallback, useEffect } from "react";
import { todoListsAPI } from "./api/todoListsAPI";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TaskStateType = { [key: string]: Array<TaskType> };
interface RootState {
  tasks: TaskStateType;
  todoLists: Array<TodoListType>;
}

export const todoListId1 = v1();
export const todoListId2 = v1();

function App() {
  const allTasks = useSelector((state: RootState) => state.tasks);
  const todoLists = useSelector((state: RootState) => state.todoLists);
  const dispatch: Dispatch<UnknownAction> = useDispatch();

  const removeTask = useCallback(
    (id: string, todoListId: string) => {
      dispatch(RemoveTaskAC(todoListId, id));
    },
    [dispatch]
  );

  const changeIsDown = useCallback(
    (id: string, todoListId: string, isDone: boolean) => {
      dispatch(ChangeIsDoneTaskAC(todoListId, id, isDone));
    },
    [dispatch]
  );

  const changeTask = useCallback(
    (taskId: string, todoListId: string, newTitle: string) => {
      dispatch(ChangeTitleTaskAC(todoListId, taskId, newTitle));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (taskTitle: string, todoListId: string) => {
      dispatch(AddTaskAC(todoListId, taskTitle));
    },
    [dispatch]
  );

  const removeTodoList = useCallback(
    (elemId: string) => {
      todoListsAPI.deleteTodoList(elemId).then(
        res => {
          console.log(res)
          dispatch(RemoveTodoListAC(res.data.data.id));
          dispatch(RemoveTasksAC(res.data.data.id));
        }
      )
    },
    [dispatch]
  );

  const changeTodoListTitle = useCallback(
    (todoListId: string, newTitle: string) => {
      todoListsAPI.updateTodoList(todoListId, newTitle).then((res) => {
        dispatch(ChangeTitleTodoListAC(res.data.data.id, res.data.data.title));
      });
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (filter: FilterValuesType, todoListId: string) => {
      dispatch(ChangeFilterTodoListAC(todoListId, filter));
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (listTitle: string) => {
      todoListsAPI
        .addTodoList(listTitle)
        .then((res) => dispatch(AddTodoListAC(res.data.data)));
    },
    [dispatch]
  );

  useEffect(() => {
    todoListsAPI
      .getTodoLists()
      .then((res) => dispatch(SetTodoListsAC(res.data)));
  }, [dispatch]);

  return (
    <div>
      <Box display="flex" flexDirection={"column"} alignItems="center">
        <h1>Добавьте новый список дел</h1>
        <AddItemForm addItem={addTodoList} />
      </Box>
      <div style={{ padding: 24 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
          {todoLists.map((todoList) => {
            let tasksForTodoList = allTasks[todoList.id];
            if (tasksForTodoList) {
              if (todoList.filter === "completed") {
                tasksForTodoList = tasksForTodoList.filter(
                  (task) => task.isDone === true
                );
              }
              if (todoList.filter === "active") {
                tasksForTodoList = tasksForTodoList.filter(
                  (task) => task.isDone === false
                );
              }
            } else {
              tasksForTodoList = [];
            }

            return (
              <Grid
                item
                key={todoList.id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                style={{ padding: 8 }}
              >
                <TodoList
                  title={todoList.title}
                  todoListId={todoList.id}
                  tasks={tasksForTodoList}
                  filter={todoList.filter}
                  changeTask={changeTask}
                  removeTask={removeTask}
                  removeTodoList={removeTodoList}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeIsDown={changeIsDown}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default React.memo(App);
