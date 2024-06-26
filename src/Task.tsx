import React, { useCallback } from "react";
import { TaskType } from "./TodoList";
import { EditableSpan } from "./EditableSpan";
import { RemoveButton } from "./RemoveButton";
import { Checkbox } from "@mui/material";

export type TaskProps = {
  tasks: Array<TaskType>;
  todoListId: string;
  removeTask: (id: string, todoListId: string) => void;
  changeIsDone: (id: string, todoListId: string, isDone: boolean) => void;
  changeTask: (taskId: string, todoListId: string, newTitle: string) => void;
};

export const Task = React.memo((props: TaskProps) => {
  const remover = useCallback(
    (elemId: string) => {
      props.removeTask(elemId, props.todoListId);
    },
    [props.removeTask, props.todoListId]
  );

  return (
    <>
      {props.tasks &&
        props.tasks.map((task) => {
          const onChangeTitle = (newTitle: string) => {
            props.changeTask(task.id, props.todoListId, newTitle);
          };

          const onSetIsDoneHandler = () => {
            props.changeIsDone(task.id, props.todoListId, !task.isDone);
          };

          return (
            <li className={task.isDone ? "completed" : ""} key={task.id}>
              <Checkbox
                onChange={onSetIsDoneHandler}
                color="success"
                checked={task.isDone}
              />
              <EditableSpan
                title={task.title}
                maxLength={500}
                onChangeTitle={onChangeTitle}
              />
              <RemoveButton elemId={task.id} remover={remover} />
            </li>
          );
        })}
    </>
  );
});
