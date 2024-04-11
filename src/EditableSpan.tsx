import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = { 
  title: string
  onChangeTitle: (newTitle: string) => void
 };

export function EditableSpan(props: EditableSpanPropsType) {
  let [editableMode, setEditableMode] = useState(false)
  let [newTitle, setNewTitle] = useState("")

  const activateEditableMode = () => {
    setEditableMode(true)
    setNewTitle(props.title)
  }

  const activateViewMode = () => {
    setEditableMode(false)
    props.onChangeTitle(newTitle)
  }

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  return editableMode ? (
    <input
      value={newTitle}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span className="editable" onDoubleClick={activateEditableMode}>{props.title}</span>
  );
}
