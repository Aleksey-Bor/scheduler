import { TaskStateType } from "../App";

enum ActionTypes {
  REMOVE_TASKS = "REMOVE-TASKS",
  // другие типы действий...
}

type RemoveTasksActionType = {
  type: ActionTypes.REMOVE_TASKS;
  todoListId: string;
};

type ActionType = RemoveTasksActionType;

export const RemoveTaskAC = (todoListId: string): ActionType => ({
  type: ActionTypes.REMOVE_TASKS,
  todoListId: todoListId,
});

export const tasksReducer = (
  state: TaskStateType,
  action: ActionType
): TaskStateType => {
  switch (action.type) {
    case ActionTypes.REMOVE_TASKS: {
      let newTasks = { ...state };
      delete newTasks[action.todoListId];
      return newTasks;
    }
    default:
      throw new Error("I do not understand this action type");
  }
};
