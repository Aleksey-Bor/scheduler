import { v1 } from "uuid";
import { TaskStateType, todoListId1, todoListId2 } from "../App";
import { RemoveTaskAC, tasksReducer } from "./tasks-reducer";

test("should remove correct task", () => {
  const startState: TaskStateType = {
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

  const action = RemoveTaskAC(todoListId2);

  const endState = tasksReducer(startState, action);

  expect(Object.keys(endState)).not.toContain(todoListId2);
  expect(Object.keys(startState).length - 1).toBe(Object.keys(endState).length);
});
