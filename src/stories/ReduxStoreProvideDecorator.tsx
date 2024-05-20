import { Provider } from "react-redux"
import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from '../state/tasks-reducer'
import { todoListsReducer } from '../state/todolists-reducer'
import { v1 } from "uuid"
import { TodoListType } from "../App"
import { TaskType } from "../TodoList"


type InitialStateType = {
  todoLists: Array<TodoListType>;
  tasks: Record<string, Array<TaskType>>;
}

const todoListId1 = v1();
const todoListId2 = v1();
const todoListId3 = v1();

const initialGlobalState: InitialStateType = {
  todoLists: [
    {id: todoListId1, title: "Что купить", filter: "all"},
    {id: todoListId2, title: "Что изучить", filter: "completed"},
    {id: todoListId3, title: "Что посмотреть", filter: "active"},
  ],
  tasks: {
    [todoListId1]: [
      {id: v1(), title: "Молоко", isDone: false},
      {id: v1(), title: "Хлеб", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Redux", isDone: false},
    ],
    [todoListId3]: [
      {id: v1(), title: "Силиконовая долина (последний сезон)", isDone: true},
      {id: v1(), title: "Игра престолов (prequel)", isDone: false},
    ],
  }
}

const storybookStore = configureStore({
  reducer: {
    tasks: tasksReducer,
    todoLists: todoListsReducer
  },
  preloadedState: initialGlobalState,
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>
}