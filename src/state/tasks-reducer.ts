import { TaskStateType } from "../App";

type RemoveTasksActionType = {
  type: "REMOVE-TASKS";
  todoListId: string;
};

type ActionType = RemoveTasksActionType;

export const RemoveTaskAC = (todolistId: string): ActionType => ({
  type: "REMOVE-TASKS",
  todoListId: todolistId,
});

export const tasksReducer = (
  state: TaskStateType,
  action: ActionType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASKS": {
      let newTasks = {...state}
      delete newTasks[action.todoListId]
      return newTasks
    }
    default:
      throw new Error("I do not understand this action type");
  }
};
