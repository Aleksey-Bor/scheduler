import { TaskType } from "./../TodoList";
import { TaskStateType } from "../App";
import { v1 } from "uuid";

enum ActionTypes {
  REMOVE_TASKS = "REMOVE_TASKS",
  REMOVE_TASK = "REMOVE_TASK",
  CHANGE_IS_DONE_TASK = "CHANGE_IS_DONE_TASK",
  CHANGE_TITLE_TASK = "CHANGE_TITLE_TASK",
  ADD_TASK = "ADD_TASK",
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

type AddTaskActionType = {
  type: ActionTypes.ADD_TASK;
  todoListId: string;
  taskTitle: string;
};

type ActionType =
  | RemoveTasksActionType
  | RemoveTaskActionType
  | ChangeIsDownTaskActionType
  | ChangeTitleTaskActionType
  | AddTaskActionType;

export const RemoveTasksAC = (todoListId: string): RemoveTasksActionType => ({
  type: ActionTypes.REMOVE_TASKS,
  todoListId: todoListId,
});

export const RemoveTaskAC = (
  todoListId: string,
  taskId: string
): RemoveTaskActionType => ({
  type: ActionTypes.REMOVE_TASK,
  todoListId: todoListId,
  taskId: taskId,
});

export const ChangeIsDoneTaskAC = (
  todoListId: string,
  taskId: string
): ChangeIsDownTaskActionType => ({
  type: ActionTypes.CHANGE_IS_DONE_TASK,
  todoListId: todoListId,
  taskId: taskId,
});

export const ChangeTitleTaskAC = (
  todoListId: string,
  taskId: string,
  newTitle: string
): ChangeTitleTaskActionType => ({
  type: ActionTypes.CHANGE_TITLE_TASK,
  todoListId: todoListId,
  taskId: taskId,
  newTitle: newTitle,
});

export const AddTaskAC = (
  todoListId: string,
  taskTitle: string
): AddTaskActionType => ({
  type: ActionTypes.ADD_TASK,
  todoListId: todoListId,
  taskTitle: taskTitle,
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
    case ActionTypes.ADD_TASK: {
      let newTask = { id: v1(), title: action.taskTitle, isDone: false };
      let tasksForTodoList = state[action.todoListId]
        ? [newTask, ...state[action.todoListId]]
        : [newTask];
      return { ...state, [action.todoListId]: tasksForTodoList };
    }
    default:
      return state;
  }
};
