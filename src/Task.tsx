import React from "react";
import { TaskType } from "./TodoList";
import { EditableSpan } from "./EditableSpan";
import { RemoveButton } from "./RemoveButton";

type TaskProps = {
  tasks: Array<TaskType>;
  todoListId: string;
  removeTask: (id: string, todoListId: string) => void;
  changeIsDown: (id: string, todoListId: string) => void;
  changeTask: (taskId: string, todoListId: string, newTitle: string) => void;
};

export function Task(props: TaskProps) {
  const onSetIsDownHandler = (taskId: string) => {
    props.changeIsDown(taskId, props.todoListId);
  };

  const remover = (elemId: string) => {
    props.removeTask(elemId, props.todoListId)
  }

  return (
    <>
      {props.tasks &&
        props.tasks.map((task) => {
          const onChangeTitle = (newTitle: string) => {
            props.changeTask(task.id, props.todoListId, newTitle);
          };

          return (
            <li className={task.isDone ? "completed" : ""} key={task.id}>
              <input
                onChange={() => onSetIsDownHandler(task.id)}
                type="checkbox"
                checked={task.isDone}
              />
              <EditableSpan
                title={task.title}
                onChangeTitle={onChangeTitle}
              />
              <RemoveButton 
                elemId={task.id}
                remover={remover} />
            </li>
          );
        })}
    </>
  );
}



