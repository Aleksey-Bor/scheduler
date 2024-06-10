// Старый синтаксис редюсера оставлен намеренно, чтобы "помнить"  оба варианта, так как это учебный проект.
// The old reducer syntax is left on purpose to "remember" both options, since this is a learning project.

import { TaskType } from "./../TodoList";
import { TaskStateType } from "../App";
import { Action } from "@reduxjs/toolkit";

enum ActionTypes {
  SET_TASKS = "SET_TASKS",
  REMOVE_TASKS = "REMOVE_TASKS",
  REMOVE_TASK = "REMOVE_TASK",
  CHANGE_IS_DONE_TASK = "CHANGE_IS_DONE_TASK",
  CHANGE_TITLE_TASK = "CHANGE_TITLE_TASK",
  ADD_TASK = "ADD_TASK",
  // другие типы действий...
}

type SetTasksActionType = {
  type: ActionTypes.SET_TASKS;
  todoListId: string;
  tasks: Array<TaskType>;
};

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
  isDone: boolean;
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
  taskId: string;
  taskTitle: string;
  isDown: boolean;
};

type ActionType =
  | SetTasksActionType
  | RemoveTasksActionType
  | RemoveTaskActionType
  | ChangeIsDownTaskActionType
  | ChangeTitleTaskActionType
  | AddTaskActionType;

export const SetTasksAC = (
  todoListId: string,
  tasks: Array<TaskType>
): SetTasksActionType => ({
  type: ActionTypes.SET_TASKS,
  todoListId: todoListId,
  tasks: tasks,
});

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
  taskId: string,
  isDone: boolean
): ChangeIsDownTaskActionType => ({
  type: ActionTypes.CHANGE_IS_DONE_TASK,
  todoListId: todoListId,
  taskId: taskId,
  isDone: isDone,
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
  taskId: string,
  taskTitle: string,
  isDown: boolean
): AddTaskActionType => ({
  type: ActionTypes.ADD_TASK,
  todoListId: todoListId,
  taskId: taskId,
  taskTitle: taskTitle,
  isDown: isDown,
});

export const tasksReducer = (
  state: TaskStateType = {},
  action: Action
): TaskStateType => {
  const typedAction = action as ActionType;
  switch (typedAction.type) {
    case ActionTypes.SET_TASKS: {
      return { ...state, [typedAction.todoListId]: typedAction.tasks };
    }
    case ActionTypes.REMOVE_TASKS: {
      let newTasks = { ...state };
      delete newTasks[typedAction.todoListId];
      return newTasks;
    }
    case ActionTypes.REMOVE_TASK: {
      let newTasks = { ...state };
      if ("taskId" in typedAction) {
        newTasks[typedAction.todoListId] = state[typedAction.todoListId].filter(
          (task) => task.id !== typedAction.taskId
        );
      }
      return newTasks;
    }
    case ActionTypes.CHANGE_IS_DONE_TASK: {
      let newTask = JSON.parse(JSON.stringify(state));
      let task = newTask[typedAction.todoListId].find(
        (task: TaskType) => task.id === typedAction.taskId
      );
      if (task) {
        task.isDone = typedAction.isDone;
      }
      return { ...newTask };
    }
    case ActionTypes.CHANGE_TITLE_TASK: {
      let newTasks = JSON.parse(JSON.stringify(state));
      let task = newTasks[typedAction.todoListId].find(
        (task: TaskType) => task.id === typedAction.taskId
      );
      if (task) {
        task.title = typedAction.newTitle;
      }
      return { ...newTasks };
    }
    case ActionTypes.ADD_TASK: {
      let newTask = {
        id: typedAction.taskId,
        title: typedAction.taskTitle,
        isDone: typedAction.isDown,
      };
      let tasksForTodoList = state[typedAction.todoListId]
        ? [newTask, ...state[typedAction.todoListId]]
        : [newTask];
      return { ...state, [typedAction.todoListId]: tasksForTodoList };
    }
    default:
      return state;
  }
};
