import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoList, FilterValuesType, todoListType } from './TodoList';
import { log } from 'console';
import { v1 } from 'uuid';

function App() {
  const todoListId1 = v1()
  const todoListId2 = v1()

  let [allTasks, setAllTasks] = useState({
    [todoListId1]: [
      { id: v1(), title: "Выучить уроки", isDone: true },
      { id: v1(), title: "Пропылесосить", isDone: true },
      { id: v1(), title: "Вымыть посуду", isDone: false },
      { id: v1(), title: "Выгулять собаку", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Печеньки", isDone: true },
      { id: v1(), title: "Молочко", isDone: false },
    ]
  })

  let [todoLists, setTodoLists] = useState<Array<todoListType>>([
    { id: todoListId1, title: "Что сделать", filter: "all" },
    { id: todoListId2, title: "Что купить", filter: "all" },
  ])

  const removeTask = (id: string, todoListId: string) => {
    let newTasks = allTasks[todoListId].filter(task => task.id !== id)
    setAllTasks({ ...allTasks, [todoListId]: newTasks })
  }

  const changeIsDown = (id: string, todoListId: string) => {
    let task = allTasks[todoListId].find(task => task.id === id)
    if (task) {
      task.isDone = !task.isDone
    }
    setAllTasks({ ...allTasks })
  }

  const changeFilter = (filter: FilterValuesType, todoListId: string) => {
    let todoList = todoLists.find(todoList => todoList.id === todoListId)
    if (todoList) {
      todoList.filter = filter
      setTodoLists([...todoLists])
    }
  }

  const addTask = (taskTitle: string, todoListId: string) => {
    setAllTasks({
      ...allTasks,
      [todoListId]: [
        { id: v1(), title: taskTitle, isDone: false },
        ...allTasks[todoListId]
      ]
    })
  }

  return (
    <div className="App">
      {todoLists.map((todoList) => {
        let tasksForTodoList = allTasks[todoList.id];
        if (todoList.filter === "completed") {
          tasksForTodoList = allTasks[todoList.id].filter(task => task.isDone === true)
        }
        if (todoList.filter === "active") {
          tasksForTodoList = allTasks[todoList.id].filter(task => task.isDone === false)
        }

        return <TodoList
          key={todoList.id}
          title={todoList.title}
          todoListId={todoList.id}
          tasks={tasksForTodoList}
          filter={todoList.filter}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeIsDown={changeIsDown} />
      }
      )}
    </div>
  );
}

export default App;
