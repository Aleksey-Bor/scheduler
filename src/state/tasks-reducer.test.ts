import { v1 } from "uuid";
import { TaskStateType, todoListId1, todoListId2 } from "../App";
import {
  AddTaskAC,
  ChangeIsDoneTaskAC,
  ChangeTitleTaskAC,
  RemoveTaskAC,
  RemoveTasksAC,
  tasksReducer,
} from "./tasks-reducer";

function getStartState(): TaskStateType {
  return {
    [todoListId1]: [
      { id: v1(), title: "Выучить уроки", isDone: true },
      { id: v1(), title: "Пропылесосить", isDone: true },
      { id: v1(), title: "Вымыть посуду", isDone: false },
      { id: v1(), title: "Выгулять собаку", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Печеньки", isDone: true },
      { id: v1(), title: "Молочко", isDone: false },
    ],
  };
}

describe("Tasks-reducer", () => {
  it("the correct tasks associated with the deleted to-do list need to be deleted", () => {
    const startState = getStartState();

    const action = RemoveTasksAC(todoListId2);
    const endState = tasksReducer(startState, action);

    expect(Object.keys(endState)).not.toContain(todoListId2);
    expect(Object.keys(startState).length - 1).toBe(
      Object.keys(endState).length
    );
  });

  it("should remove correct task from correct array", () => {
    const startState = getStartState();

    const action = RemoveTaskAC(todoListId2, startState[todoListId2][1].id);
    const endState = tasksReducer(startState, action);

    expect(endState[todoListId2].length).toBe(1);
    expect(endState[todoListId1].length).toBe(4);
    if ("taskId" in action) {
      expect(
        endState[todoListId2].find((task) => task.id === action.taskId)
      ).toBeFalsy();
    }
  });

  it("The boolean value of the isDone property of the correct task in the correct to-do list must be reversed.", () => {
    const startState = getStartState();

    const action = ChangeIsDoneTaskAC(
      todoListId2,
      startState[todoListId2][1].id,
      !startState[todoListId2][1].isDone
    );
    const endState = tasksReducer(startState, action);

    expect(endState[todoListId2][1].isDone).not.toBe(
      startState[todoListId2][1].isDone
    );

    endState[todoListId2].forEach((task, index) => {
      if ("taskId" in action && task.id !== action.taskId) {
        expect(task).toEqual(startState[todoListId2][index]);
      }
    });
  });

  it("The title of the correct task in the correct to-do list should change to the new title", () => {
    const startState = getStartState();

    const action = ChangeTitleTaskAC(
      todoListId2,
      startState[todoListId2][1].id,
      "New Title"
    );

    const endState = tasksReducer(startState, action);

    expect(endState[todoListId2][1].title).toBe("New Title");

    startState[todoListId2].forEach((task, index) => {
      if (index !== 1) {
        expect(task).toEqual(endState[todoListId2][index]);
      }
    });

    Object.keys(startState).forEach((todoListId) => {
      if (todoListId !== todoListId2) {
        expect(startState[todoListId]).toEqual(endState[todoListId]);
      }
    });
  });

  it("A new task with a title should be added to the beginning of the correct to-do list", () => {
    const startState = getStartState();

    const action = AddTaskAC(todoListId2, "1", "New Task", false);
    const endState = tasksReducer(startState, action);

    expect(endState[todoListId2].length).toBe(
      startState[todoListId2].length + 1
    );
    expect(endState[todoListId2][0].title).toBe("New Task");
    expect(endState[todoListId1].length).toBe(startState[todoListId1].length);
  });
});
