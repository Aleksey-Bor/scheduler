import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormType = {
  addItem: (title: string) => void;  
};

export function AddItemForm(props: AddItemFormType) {
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const onNewItemChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
    setError(null);
  };

  const onAddItemKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addItemHandler();
    }
  };

  const addItemHandler = () => {
    if (newTitle.trim() !== "") {
      props.addItem(newTitle);
      setNewTitle("");
    } else {
      setError("Поле обязательно!");
      setNewTitle("");
    }
  };

  return <div>    
    <input className={error ? "error" : ""}
      onChange={onNewItemChangeHandler}
      onKeyDown={onAddItemKeyDownHandler}
      value={newTitle} />
    <button onClick={addItemHandler}>+</button>
    <div className={error ? "error-message" : ""}>{error}</div>
  </div>;
}
