import axios from "axios";

export const todoListsAPI = {
  getTodoLists() {
    return axios.get("http://localhost:3001/todo-lists");
  },

  addTodoList(title: string) {
    const data = { title };
    return axios.post("http://localhost:3001/todo-lists", data);
  },

  updateTodoList(id: string, title: string) {
    const data = { title };
    return axios.put(`http://localhost:3001/todo-lists/${id}`, data);
  },

  deleteTodoList(id: string) {
    return axios.delete(`http://localhost:3001/todo-lists/${id}`);
  },
};
