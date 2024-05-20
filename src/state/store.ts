import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from './tasks-reducer'
import { todoListsReducer } from './todolists-reducer'


export default configureStore({
  reducer: {
    tasks: tasksReducer,
    todoLists: todoListsReducer
  },
})