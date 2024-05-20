import { Action } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

enum ActionTypes {
  SET_TODOLISTS = "SET_TODOLISTS",
  REMOVE_TODOLIST = "REMOVE_TODOLIST",
  CHANGE_TITLE_TODOLIST = " CHANGE_TITLE_TODOLIST",
  CHANGE_FILTER_TODOLIST = " CHANGE_FILTER_TODOLIST",
  ADD_TODOLIST = " ADD_TODOLIST",
}

type SetActionType = {
  type: ActionTypes.SET_TODOLISTS;
  todoLists: Array<TodoListType>;
};

type RemoveActionType = {
  type: ActionTypes.REMOVE_TODOLIST;
  todoListId: string;
};

type ChangeTodoListTitleActionType = {
  type: ActionTypes.CHANGE_TITLE_TODOLIST;
  todoListId: string;
  newTitle: string;
};

type ChangeFilterTodoListActionType = {
  type: ActionTypes.CHANGE_FILTER_TODOLIST;
  todoListId: string;
  newFilter: FilterValuesType;
};

type AddActionType = {
  type: ActionTypes.ADD_TODOLIST;
  listTitle: string;
};

type ActionType =
  | SetActionType
  | RemoveActionType
  | ChangeTodoListTitleActionType
  | ChangeFilterTodoListActionType
  | AddActionType;

export const SetTodoListsAC = (
  todoLists: Array<TodoListType>
): SetActionType => ({
  type: ActionTypes.SET_TODOLISTS,
  todoLists: todoLists,
});

export const RemoveTodoListAC = (todoListId: string): RemoveActionType => ({
  type: ActionTypes.REMOVE_TODOLIST,
  todoListId: todoListId,
});

export const ChangeTitleTodoListAC = (
  todoListId: string,
  newTitle: string
): ChangeTodoListTitleActionType => ({
  type: ActionTypes.CHANGE_TITLE_TODOLIST,
  todoListId: todoListId,
  newTitle: newTitle,
});

export const ChangeFilterTodoListAC = (
  todoListId: string,
  newFilter: FilterValuesType
): ChangeFilterTodoListActionType => ({
  type: ActionTypes.CHANGE_FILTER_TODOLIST,
  todoListId: todoListId,
  newFilter: newFilter,
});

export const AddTodoListAC = (listTitle: string): AddActionType => ({
  type: ActionTypes.ADD_TODOLIST,
  listTitle: listTitle,
});

export const todoListsReducer = (
  state: Array<TodoListType> = [],
  action: Action
): Array<TodoListType> => {
  const typedAction = action as ActionType;
  switch (typedAction.type) {
    case ActionTypes.SET_TODOLISTS: {
      return typedAction.todoLists
    }
    case ActionTypes.REMOVE_TODOLIST: {
      return state.filter((todoList) => todoList.id !== typedAction.todoListId);
    }
    case ActionTypes.CHANGE_TITLE_TODOLIST: {
      const newState = state.map((todoList) => {
        if (todoList.id === typedAction.todoListId) {
          return { ...todoList, title: typedAction.newTitle };
        }
        return todoList;
      });
      return newState;
    }
    case ActionTypes.CHANGE_FILTER_TODOLIST: {
      const newState = state.map((todoList) => {
        if (todoList.id === typedAction.todoListId) {
          return { ...todoList, filter: typedAction.newFilter };
        }
        return todoList;
      });
      return newState;
    }
    case ActionTypes.ADD_TODOLIST: {
      return [
        { id: v1(), title: typedAction.listTitle, filter: "all" },
        ...state,
      ];
    }
    default:
      return state;
  }
};
