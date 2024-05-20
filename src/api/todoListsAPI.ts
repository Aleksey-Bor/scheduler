import axios from "axios";

// const settings = {
//    withCredentials: true,
// }

export const todoListsAPI = {
  getTodoLists() {
    return axios.get(
      "http://localhost:3001/todo-lists"
    );
  },
};
