import axios from "axios";

// const settings = {
//    withCredentials: true,
// }

export const todoListsAPI = {
  getTodoLists() {
    return axios.get("http://localhost:3001/todo-lists");
  },

  addTodoList(title: string) {
    const data = { title };
    return axios.post("http://localhost:3001/todo-lists", data);
  },
};
