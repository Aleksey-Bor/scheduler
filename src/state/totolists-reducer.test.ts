import { v1 } from "uuid";
import { TodoListType } from "../App";
import { RemoveTodolistAC, todolistsReducer } from "./totolists-reducer";

test("should remove correct todolist", () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: "Что сделать", filter: "all" },
    { id: todoListId2, title: "Что купить", filter: "all" },
  ];

  const action = RemoveTodolistAC(todoListId2);

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState.find((tl) => tl.id === todoListId2)).toBeUndefined();
});
