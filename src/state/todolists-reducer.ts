import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValuesType, TodoListType } from "../App";

const todoListsSlice = createSlice({
  name: "todoLists",
  initialState: [] as Array<TodoListType>,
  reducers: {
    setTodoLists: (state, action: PayloadAction<Array<TodoListType>>) => {
      return action.payload;
    },
    removeTodoList: (state, action: PayloadAction<string>) => {
      return state.filter((todoList) => todoList.id !== action.payload);
    },
    changeTitleTodoList: (
      state,
      action: PayloadAction<{ todoListId: string; newTitle: string }>
    ) => {
      const { todoListId, newTitle } = action.payload;
      const todoList = state.find((todoList) => todoList.id === todoListId);
      if (todoList) {
        todoList.title = newTitle;
      }
    },
    changeFilterTodoList: (
      state,
      action: PayloadAction<{ todoListId: string; newFilter: FilterValuesType }>
    ) => {
      const { todoListId, newFilter } = action.payload;
      const todoList = state.find((todoList) => todoList.id === todoListId);
      if (todoList) {
        todoList.filter = newFilter;
      }
    },
    addTodoList: (state, action: PayloadAction<TodoListType>) => {
      state.unshift(action.payload);
    },
  },
});

export const {
  setTodoLists: SetTodoListsAC,
  removeTodoList: RemoveTodoListAC,
  changeTitleTodoList: ChangeTitleTodoListAC,
  changeFilterTodoList: ChangeFilterTodoListAC,
  addTodoList: AddTodoListAC,
} = todoListsSlice.actions;

export const todoListsReducer = todoListsSlice.reducer;
