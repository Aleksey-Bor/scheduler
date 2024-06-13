import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const tasksAPI = {
  getTasks(todoListId: string) {
    return axios.get(`${BASE_URL}/todo-lists/${todoListId}/tasks`);
  },

  addTask(title: string, todoListId: string) {
    const data = { title };
    return axios.post(`${BASE_URL}/todo-lists/${todoListId}/tasks`, data);
  },

  updateTaskTitle(taskId: string, todoListId: string, title: string) {
    const data = { title };
    return axios.put(
      `${BASE_URL}/todo-lists/${todoListId}/tasks/${taskId}`,
      data
    );
  },

  updateTaskStatus(taskId: string, todoListId: string, isDone: boolean) {
    const data = { isDone };
    return axios.put(
      `${BASE_URL}/todo-lists/${todoListId}/tasks/${taskId}`,
      data
    );
  },

  deleteTask(todoListId: string, taskId: string) {
    return axios.delete(`${BASE_URL}/todo-lists/${todoListId}/tasks/${taskId}`);
  },
};
