import React, { useCallback } from "react";
import { TaskType } from "./TodoList";
import { EditableSpan } from "./EditableSpan";
import { RemoveButton } from "./RemoveButton";
import { Checkbox } from "@mui/material";

export type TaskProps = {
  tasks: Array<TaskType>;
  todoListId: string;
  removeTask: (id: string, todoListId: string) => void;
  changeIsDown: (id: string, todoListId: string) => void;
  changeTask: (taskId: string, todoListId: string, newTitle: string) => void;
};

export const Task = React.memo((props: TaskProps) => {
  const remover = useCallback(
    (elemId: string) => {
      props.removeTask(elemId, props.todoListId);
    },
    [props.removeTask, props.todoListId]
  );

  console.log("Task is called");

  return (
    <>
      {props.tasks &&
        props.tasks.map((task) => {
          const onChangeTitle = (newTitle: string) => {
            props.changeTask(task.id, props.todoListId, newTitle);
          };

          const onSetIsDownHandler = () => {
            props.changeIsDown(task.id, props.todoListId);
          };

          return (
            <li className={task.isDone ? "completed" : ""} key={task.id}>
              <Checkbox
                onChange={onSetIsDownHandler}
                color="success"
                checked={task.isDone}
              />
              <EditableSpan title={task.title} onChangeTitle={onChangeTitle} />
              <RemoveButton elemId={task.id} remover={remover} />
            </li>
          );
        })}
    </>
  );
});
