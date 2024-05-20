import { TodoListType, todoListId1, todoListId2 } from "../App";
import {
  AddTodoListAC,
  ChangeFilterTodoListAC,
  ChangeTitleTodoListAC,
  RemoveTodoListAC,
  SetTodoListsAC,
  todoListsReducer,
} from "./todolists-reducer";
import { todoListsAPI } from "../api/todoListsAPI";

function getStartState(): Array<TodoListType> {
  return [
    { id: todoListId1, title: "Что сделать", filter: "all" },
    { id: todoListId2, title: "Что купить", filter: "all" },
  ];
}

describe("TodoList-reducer", () => {
  it("The state should be filled with to-do list data if there is data on the server", async () => {
    const startState: Array<TodoListType> = [];
  
    // Мокаем функцию getTodoLists
    const mockGetTodoLists = jest.fn();
    todoListsAPI.getTodoLists = mockGetTodoLists;
  
    // Мокаем данные, которые должны вернуться
    const mockData = [
      { id: todoListId1, title: "Что сделать", filter: "all" },
      { id: todoListId2, title: "Что купить", filter: "all" },
    ];
    mockGetTodoLists.mockResolvedValue({ data: mockData });
  
    const responseData = await todoListsAPI.getTodoLists().then((res) => res.data);
  
    const action = SetTodoListsAC(responseData);
    const endState = todoListsReducer(startState, action);
  
    // Проверяем, что endState содержит все элементы из mockData
    mockData.forEach((item, index) => {
      expect(endState[index].id).toBe(item.id);
      expect(endState[index].title).toBe(item.title);
      expect(endState[index].filter).toBe(item.filter);
    });
  });

  it("should remove correct todolist", () => {
    const startState = getStartState();

    const action = RemoveTodoListAC(todoListId2);
    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState.find((tl) => tl.id === todoListId2)).toBeUndefined();
  });

  it("The title of the desired to-do list should change to the new title", () => {
    const startState = getStartState();

    const action = ChangeTitleTodoListAC(todoListId2, "New To-do List");
    const endState = todoListsReducer(startState, action);

    expect(endState[1].title).toBe("New To-do List");
    expect(endState[0].title).toBe(startState[0].title);
  });

  it("The value of the filter property should change to 'completed' for the correct to-do list", () => {
    const startState = getStartState();

    const action = ChangeFilterTodoListAC(todoListId2, "completed");
    const endState = todoListsReducer(startState, action);

    expect(endState[1].filter).toBe("completed");
    expect(endState[0].filter).toBe("all");
  });

  it("The value of the filter property should change to 'active' for the correct to-do list.", () => {
    const startState = getStartState();

    const action = ChangeFilterTodoListAC(todoListId2, "active");
    const endState = todoListsReducer(startState, action);

    expect(endState[1].filter).toBe("active");
    expect(endState[0].filter).toBe("all");
  });

  it("The value of the filter property should change to 'all' for the correct to-do list.", () => {
    let startState = getStartState();

    let action = ChangeFilterTodoListAC(todoListId2, "completed");
    startState = todoListsReducer(startState, action);

    action = ChangeFilterTodoListAC(todoListId2, "all");
    const endState = todoListsReducer(startState, action);

    expect(endState[1].filter).toBe("all");
    expect(endState[0].filter).toBe("all");
  });

  it("The new to-do list should be added to the beginning of the to-do list array.", () => {
    let startState = getStartState();

    const action = AddTodoListAC("New To-do list");
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("New To-do list");
    expect(endState[0].id).toBeTruthy();
    expect(endState[1].id).toBeTruthy();
    expect(endState[2].id).toBeTruthy();
    expect(endState[0].filter).toBe("all");
    expect(endState.length).toBe(startState.length + 1);
  });
});
