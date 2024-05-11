import { TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string
  onChangeTitle: (newTitle: string) => void
};

export const EditableSpan = React.memo(
  (props: EditableSpanPropsType) => {
    let [editableMode, setEditableMode] = useState(false)
    let [newTitle, setNewTitle] = useState("")

    const activateEditableMode = () => {
      setEditableMode(true)
      setNewTitle(props.title)
    }

    const activateViewMode = () => {
      if (newTitle) {
        setEditableMode(false)
        props.onChangeTitle(newTitle)
      }
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(event.currentTarget.value)
    }

    return editableMode ? (
      <TextField
        value={newTitle}
        onChange={onChangeTitleHandler}
        onBlur={activateViewMode}
        autoFocus
        variant="standard"
      />
    ) : (
      <span className="editable"
        onDoubleClick={activateEditableMode}
        title='Изменить - двойной клик.'>{props.title}</span>
    );
  }
) 
