import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  maxLength: number;
  onChangeTitle: (newTitle: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [error, setError] = useState<string | null>(null);
  const [editableMode, setEditableMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const activateEditableMode = () => {
    setEditableMode(true);
    setNewTitle(props.title);
  };

  const activateViewMode = () => {
    if (newTitle.length > props.maxLength) {
      setError(`Заголовок не должен превышать ${props.maxLength} символов.`)
    } else if (newTitle) {
      setEditableMode(false);
      props.onChangeTitle(newTitle);
      setError(null);
    } else {
      setError("Поле не должно быть пустым!")
    }
  };

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
    if (event.currentTarget.value.length > props.maxLength) {
      setError(`Заголовок не должен превышать ${props.maxLength} символов.`)
    } else {
      setError(null);
    }
  };

  return editableMode ? (
    <TextField
      value={newTitle}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
      variant="standard"
      error={!!error}
      helperText={error}
    />
  ) : (
    <span
      className="editable"
      onDoubleClick={activateEditableMode}
      title="Изменить - двойной клик."
    >
      {props.title}
    </span>
  );
});
