import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { Box, Grid, Paper } from '@mui/material';
import { RemoveTodolistAC, todolistsReducer } from './state/totolists-reducer';
import { RemoveTaskAC, tasksReducer } from './state/tasks-reducer';

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = { id: string, title: string, filter: FilterValuesType }
export type TaskStateType = { [key: string]: Array<TaskType> }

export const todoListId1 = v1()
export const todoListId2 = v1()

function App() {

  let [allTasks, setAllTasks] = useState<TaskStateType>({
    [todoListId1]: [
      { id: v1(), title: "Выучить уроки", isDone: true },
      { id: v1(), title: "Пропылесосить", isDone: true },
      { id: v1(), title: "Вымыть посуду", isDone: false },
      { id: v1(), title: "Выгулять собаку", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Печеньки", isDone: true },
      { id: v1(), title: "Молочко", isDone: false },
    ]
  })

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "Что сделать", filter: "all" },
    { id: todoListId2, title: "Что купить", filter: "all" },
  ])

  const removeTask = (id: string, todoListId: string) => {
    let newTasks = allTasks[todoListId].filter(task => task.id !== id)
    setAllTasks({ ...allTasks, [todoListId]: newTasks })
  }

  const removeTodoList = (elemId: string) => {
    let action = RemoveTodolistAC(elemId)
    setTodoLists(todolistsReducer(todoLists, action))

    let action2 = RemoveTaskAC(elemId)
    setAllTasks(tasksReducer(allTasks, action2))
  }

  const changeIsDown = (id: string, todoListId: string) => {
    let task = allTasks[todoListId].find(task => task.id === id)
    if (task) {
      task.isDone = !task.isDone
      setAllTasks({ ...allTasks })
    }
  }

  const changeTask = (taskId: string, todoListId: string, newTitle: string) => {
    let task = allTasks[todoListId].find(task => task.id === taskId)
    if (task) {
      task.title = newTitle
      setAllTasks({ ...allTasks })
    }
  }

  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    let todoList = todoLists.find(todoList => todoList.id === todoListId)
    if (todoList) {
      todoList.title = newTitle
      setTodoLists([...todoLists])
    }
  }

  const changeFilter = (filter: FilterValuesType, todoListId: string) => {
    let todoList = todoLists.find(todoList => todoList.id === todoListId)
    if (todoList) {
      todoList.filter = filter
      setTodoLists([...todoLists])
    }
  }

  const addTask = (taskTitle: string, todoListId: string) => {
    setAllTasks(prevAllTasks => {
      let newTask = { id: v1(), title: taskTitle, isDone: false };
      let tasksForTodoList = prevAllTasks[todoListId]
        ? [newTask, ...prevAllTasks[todoListId]]
        : [newTask];
      return { ...prevAllTasks, [todoListId]: tasksForTodoList };
    });
  };

  const addTodoList = (listTitle: string) => {
    setTodoLists([{ id: v1(), title: listTitle, filter: "all" }, ...todoLists])
  }

  return (
    <div>
      <Box display="flex"
        flexDirection={"column"}
        alignItems="center">
        <h1>Добавьте новый список дел</h1>
        <AddItemForm addItem={addTodoList} />
      </Box>
      <div style={{ padding: 24 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} >
          {todoLists.map((todoList) => {
            let tasksForTodoList = allTasks[todoList.id];
            if (tasksForTodoList) {
              if (todoList.filter === "completed") {
                tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true)
              }
              if (todoList.filter === "active") {
                tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false)
              }
            } else {
              tasksForTodoList = []
            }

            return <Grid item key={todoList.id} sm={12} md={6} lg={4} xl={3} style={{ padding: 8 }}>
              <Paper elevation={3} style={{ padding: 8 }} sx={{ bgcolor: '#fff9c4' }}>
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
                  changeTodoListTitle={changeTodoListTitle} />
              </Paper>
            </Grid>
          }
          )}
        </Grid>
      </div>
    </ div>
  );
}

export default App;
