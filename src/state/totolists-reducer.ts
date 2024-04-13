import { TodoListType } from "../App";

type RemoveActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

type ActionType = RemoveActionType;

export const RemoveTodolistAC = (todoListId: string): RemoveActionType => ({
  type: "REMOVE-TODOLIST",
  id: todoListId,
});

export const todolistsReducer = (
  state: Array<TodoListType>,
  action: ActionType
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(todoList => todoList.id !== action.id);
    }
    default:
      throw new Error("I do not understand this action type");
  }
};
