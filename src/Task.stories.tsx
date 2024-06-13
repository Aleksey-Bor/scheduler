import { action } from "@storybook/addon-actions";
import { Task } from "./Task";

export default {
  title: "Task Component",
  component: Task,
};

const callbackRemove = action("The task deleted");
const callbackChangeIsDone = action("The task status changed");
const callbackChange = action("The task title changed");

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
        changeIsDone={callbackChangeIsDone}
        changeTask={callbackChange}
      />
    </>
  );
};
