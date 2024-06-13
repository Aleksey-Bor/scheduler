import { action } from "@storybook/addon-actions";
import { TodoList } from "./TodoList";

export default {
  title: "TodoList Component",
  component: TodoList,
};

const callbackChangeTask = action("The task changed");
const callbackRemoveTask = action("The task deleted");
const callbackRemoveTodoList = action("The TodoList deleted");
const callbackChangeFilter = action("The tasks filtered");
const callbackAddTask = action("The new task added");
const callbackChangeIsDown = action("Task status changed");
const callbackChangeTodoListTitle = action("The TodoList title changed");

export const TodoListExample = () => {
  return (
    <TodoList
      title={"What to buy"}
      tasks={[
        { id: "taskId1", title: "Milk", isDone: true },
        { id: "taskId2", title: "Broad", isDone: false },
      ]}
      todoListId={"todoListId1"}
      filter={"all"}
      changeTask={callbackChangeTask}
      removeTask={callbackRemoveTask}
      removeTodoList={callbackRemoveTodoList}
      changeFilter={callbackChangeFilter}
      addTask={callbackAddTask}
      changeIsDone={callbackChangeIsDown}
      changeTodoListTitle={callbackChangeTodoListTitle}
    />
  );
};
