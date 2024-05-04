import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

enum ActionTypes {
  REMOVE_TODOLIST = "REMOVE_TODOLIST",
  CHANGE_TITLE_TODOLIST = " CHANGE_TITLE_TODOLIST",
  CHANGE_FILTER_TODOLIST = " CHANGE_FILTER_TODOLIST",
  ADD_TODOLIST = " ADD_TODOLIST",
}

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
  | RemoveActionType
  | ChangeTodoListTitleActionType
  | ChangeFilterTodoListActionType
  | AddActionType;

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
  state: Array<TodoListType>,
  action: ActionType
): Array<TodoListType> => {
  switch (action.type) {
    case ActionTypes.REMOVE_TODOLIST: {
      return state.filter((todoList) => todoList.id !== action.todoListId);
    }
    case ActionTypes.CHANGE_TITLE_TODOLIST: {
      const newState = state.map((todoList) => {
        if (todoList.id === action.todoListId) {
          return { ...todoList, title: action.newTitle };
        }
        return todoList;
      });
      return newState;
    }
    case ActionTypes.CHANGE_FILTER_TODOLIST: {
      const newState = state.map((todoList) => {
        if (todoList.id === action.todoListId) {
          return { ...todoList, filter: action.newFilter };
        }
        return todoList;
      });
      return newState;
    }
    case ActionTypes.ADD_TODOLIST: {
      return [{ id: v1(), title: action.listTitle, filter: "all" }, ...state];
    }
    default:
      return state;
  }
};
