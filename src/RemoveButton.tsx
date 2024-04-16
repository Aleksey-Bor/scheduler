import React from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type RemoveButtonType = {
  remover: (elemId: string) => void;
  elemId: string;
};

export function RemoveButton(props: RemoveButtonType) {
  const onRemoveHandler = () => {
    props.remover(props.elemId);
  };

  return <IconButton aria-label="delete" onClick={onRemoveHandler}>
    <Delete fontSize="small" />
  </IconButton>
}
