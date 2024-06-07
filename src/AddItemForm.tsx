import { AddCircleOutlineRounded } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormType = {
  addItem: (title: string) => void;
  maxLength: number;
};

export const AddItemForm = React.memo((props: AddItemFormType) => {
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const onNewItemChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
    if (newTitle.length > props.maxLength) {
      setError(`Заголовок не должен превышать ${props.maxLength} символов.`);
    } else {
      setError(null);
    }
  };

  const onAddItemKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItemHandler();
    }
  };

  const addItemHandler = () => {
    if (newTitle.length > props.maxLength) {
      setError(`Заголовок не должен превышать ${props.maxLength} символов.`);
      setNewTitle(newTitle);
    } else if (newTitle.trim() !== "") {
      props.addItem(newTitle);
      setNewTitle("");
    } else {
      setError("Поле обязательно!");
      setNewTitle("");
    }
  };

  return (
    <div>
      <TextField
        onChange={onNewItemChangeHandler}
        onKeyDown={onAddItemKeyDownHandler}
        value={newTitle}
        label="Введите заголовок"
        variant="outlined"
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addItemHandler} color="primary">
        <AddCircleOutlineRounded fontSize="large" />
      </IconButton>
    </div>
  );
});
