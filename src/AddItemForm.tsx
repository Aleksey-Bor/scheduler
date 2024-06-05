import { AddCircleOutlineRounded } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormType = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormType) => {
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const onNewItemChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (newTitle.length > 100) {
      setNewTitle(event.currentTarget.value);
      setError("Заголовок не должен превышать 100 символов");
    } else {
      setNewTitle(event.currentTarget.value);
      setError(null);
    }
  };

  const onAddItemKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItemHandler();
    }
  };

  const addItemHandler = () => {
    if (newTitle.length > 100) {
      setError("Заголовок не должен превышать 100 символов");
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
