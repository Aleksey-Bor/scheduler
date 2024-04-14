import { TaskType } from "./../TodoList";
import { TaskStateType } from "../App";

enum ActionTypes {
  REMOVE_TASKS = "REMOVE-TASKS",
  REMOVE_TASK = "REMOVE-TASK",
  CHANGE_IS_DONE_TASK = "CHANGE-IS-DONE-TASK",
  CHANGE_TITLE_TASK = "CHANGE-TITLE-TASK",
  // другие типы действий...
}

type RemoveTasksActionType = {
  type: ActionTypes.REMOVE_TASKS;
  todoListId: string;
};

type RemoveTaskActionType = {
  type: ActionTypes.REMOVE_TASK;
  todoListId: string;
  taskId: string;
};

type ChangeIsDownTaskActionType = {
  type: ActionTypes.CHANGE_IS_DONE_TASK;
  todoListId: string;
  taskId: string;
};

type ChangeTitleTaskActionType = {
  type: ActionTypes.CHANGE_TITLE_TASK;
  todoListId: string;
  taskId: string;
  newTitle: string;
};

type ActionType =
  | RemoveTasksActionType
  | RemoveTaskActionType
  | ChangeIsDownTaskActionType
  | ChangeTitleTaskActionType;

export const RemoveTasksAC = (todoListId: string): ActionType => ({
  type: ActionTypes.REMOVE_TASKS,
  todoListId: todoListId,
});

export const RemoveTaskAC = (
  todoListId: string,
  taskId: string
): ActionType => ({
  type: ActionTypes.REMOVE_TASK,
  todoListId: todoListId,
  taskId: taskId,
});

export const ChangeIsDoneTaskAC = (
  todoListId: string,
  taskId: string
): ActionType => ({
  type: ActionTypes.CHANGE_IS_DONE_TASK,
  todoListId: todoListId,
  taskId: taskId,
});

export const ChangeTitleTaskAC = (
  todoListId: string,
  taskId: string,
  newTitle: string
): ActionType => ({
  type: ActionTypes.CHANGE_TITLE_TASK,
  todoListId: todoListId,
  taskId: taskId,
  newTitle: newTitle,
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
    case ActionTypes.REMOVE_TASK: {
      let newTasks = { ...state };
      if ("taskId" in action) {
        newTasks[action.todoListId] = state[action.todoListId].filter(
          (task) => task.id !== action.taskId
        );
      }
      return newTasks;
    }
    case ActionTypes.CHANGE_IS_DONE_TASK: {
      let newTask = JSON.parse(JSON.stringify(state));
      let task = newTask[action.todoListId].find(
        (task: TaskType) => task.id === action.taskId
      );
      if (task) {
        task.isDone = !task.isDone;
      }
      return { ...newTask };
    }
    case ActionTypes.CHANGE_TITLE_TASK: {
      let newTask = JSON.parse(JSON.stringify(state));
      let task = newTask[action.todoListId].find(
        (task: TaskType) => task.id === action.taskId
      );
      if (task) {
        task.title = action.newTitle;
      }
      return { ...newTask };
    }
    default:
      throw new Error("I do not understand this action type");
  }
};
