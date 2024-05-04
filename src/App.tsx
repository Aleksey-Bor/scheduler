import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { Box, Grid, Paper } from '@mui/material';
import { AddTodoListAC, ChangeFilterTodoListAC, ChangeTitleTodoListAC, RemoveTodoListAC, todoListsReducer } from './state/totolists-reducer';
import { AddTaskAC, ChangeIsDoneTaskAC, ChangeTitleTaskAC, RemoveTaskAC, RemoveTasksAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = { id: string, title: string, filter: FilterValuesType }
export type TaskStateType = { [key: string]: Array<TaskType> }
interface RootState {
  tasks: TaskStateType;
  todoLists: Array<TodoListType>;
}

export const todoListId1 = v1()
export const todoListId2 = v1()

function App() {
  const allTasks = useSelector((state: RootState) => state.tasks)
  const todoLists = useSelector((state: RootState) => state.todoLists)
  const dispatch: Dispatch<UnknownAction> = useDispatch()

  const removeTask = (id: string, todoListId: string) => {
    dispatch(RemoveTaskAC(todoListId, id))
  }

  const changeIsDown = (id: string, todoListId: string) => {
    dispatch(ChangeIsDoneTaskAC(todoListId, id))
  }

  const changeTask = (taskId: string, todoListId: string, newTitle: string) => {
    dispatch(ChangeTitleTaskAC(todoListId, taskId, newTitle))
  }

  const addTask = (taskTitle: string, todoListId: string) => {
    dispatch(AddTaskAC(todoListId, taskTitle))
  };

  const removeTodoList = (elemId: string) => {
    dispatch(RemoveTodoListAC(elemId))
    dispatch(RemoveTasksAC(elemId))
  }

  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    dispatch(ChangeTitleTodoListAC(todoListId, newTitle))
  }

  const changeFilter = (filter: FilterValuesType, todoListId: string) => {
    dispatch(ChangeFilterTodoListAC(todoListId, filter))
  }

  const addTodoList = (listTitle: string) => {
    dispatch(AddTodoListAC(listTitle))
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
