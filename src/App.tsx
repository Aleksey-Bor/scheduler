import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoList, TaskType } from './TodoList';

function App() {
  let tasks: Array<TaskType>  = [
    {id: 1, title:"Выучить уроки", isDone: true },
    {id: 2, title:"Пропылесосить", isDone: true },
    {id: 3, title:"Вымыть посуду", isDone: false },
  ]
  let tasks2: Array<TaskType> = [
    {id: 1, title:"Каласы пад сярпом тваiм", isDone: true },
    {id: 2, title:"Гоблин", isDone: true },
    {id: 3, title:"Травля", isDone: false },
  ]
  let tasks3: Array<TaskType> = [
    {id: 1, title:"Бесславные ублюдки", isDone: false },
    {id: 2, title:"Версаль", isDone: true },
    {id: 3, title:"ХХХ", isDone: false },
  ]

  return (
    <div className="App">
      <TodoList title="Что сделать" tasks={tasks}/>
      <TodoList title="Книги" tasks={tasks2}/>
      <TodoList title="Фильмы" tasks={tasks3}/>
    </div>
  );
}

export default App;
