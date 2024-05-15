import { action } from "@storybook/addon-actions";
import { Task } from "./Task";

export default {
  title: "Task Component",
  component: Task,
};

const callbackRemove = action("Task was deleted");
const callbackChangeIsDown = action("Task status was changed");
const callbackChange = action("Task title was changed");

export const TaskExample = (props: any) => {
  return (
    <>
      <Task
        tasks={[
          { id: "taskId1", title: "Test task", isDone: true },
          { id: "taskId2", title: "Test task yet", isDone: false },
        ]}
        todoListId={"todoListId1"}
        removeTask={callbackRemove}
        changeIsDown={callbackChangeIsDown}
        changeTask={callbackChange}
      />
    </>
  );
};
