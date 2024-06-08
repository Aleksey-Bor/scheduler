import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const todoListsAPI = {
  getTodoLists() {
    return axios.get(`${BASE_URL}/todo-lists`);
  },

  addTodoList(title: string) {
    const data = { title };
    return axios.post(`${BASE_URL}/todo-lists`, data);
  },

  updateTodoList(id: string, title: string) {
    const data = { title };
    return axios.put(`${BASE_URL}/todo-lists/${id}`, data);
  },

  deleteTodoList(id: string) {
    return axios.delete(`${BASE_URL}/todo-lists/${id}`);
  },
};
