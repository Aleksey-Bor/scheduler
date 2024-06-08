import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const tasksAPI = {
  getTasks() {},

  addTask(title: string, todoListId: string) {
    const data = { title };
    return axios.post(`${BASE_URL}/todo-lists/${todoListId}/tasks`, data);
  },
};