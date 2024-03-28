import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoList, TaskType, FilterValuesType } from './TodoList';
import { log } from 'console';

function App() {
  /*   let tasks: Array<TaskType> = [
      { id: 1, title: "Выучить уроки", isDone: true },
      { id: 2, title: "Пропылесосить", isDone: true },
      { id: 3, title: "Вымыть посуду", isDone: false },
      { id: 4, title: "Выгулять собаку", isDone: false },
    ] */
 /*  let tasks2: Array<TaskType> = [
    { id: 1, title: "Каласы пад сярпом тваiм", isDone: true },
    { id: 2, title: "Гоблин", isDone: true },
    { id: 3, title: "Травля", isDone: false },
    { id: 4, title: "Код адсутнасцi", isDone: false },
  ]
  let tasks3: Array<TaskType> = [
    { id: 1, title: "Бесславные ублюдки", isDone: false },
    { id: 2, title: "Версаль", isDone: true },
    { id: 3, title: "ХХХ", isDone: false },
  ]
 */

  let [tasks, setTask] = useState([
    { id: 1, title: "Выучить уроки", isDone: true },
    { id: 2, title: "Пропылесосить", isDone: true },
    { id: 3, title: "Вымыть посуду", isDone: false },
    { id: 4, title: "Выгулять собаку", isDone: false },
  ]) 

  let [filter, setFilter] = useState("all")

  const removeTask = (id: number) => {
    setTask(tasks.filter(task => task.id !== id))
  }

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(task => task.isDone === true)
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(task => task.isDone === false)
  }


  return (
    <div className="App">
      <TodoList title="Что сделать" tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} />
      {/* <TodoList title="Книги" tasks={tasks2} /> */}
      {/* <TodoList title="Фильмы" tasks={tasks3} /> */}
    </div>
  );
}

export default App;
