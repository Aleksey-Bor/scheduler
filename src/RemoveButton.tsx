import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

type RemoveButtonType = {
  remover: (elemId: string) => void;
  elemId: string;
};

export function RemoveButton(props: RemoveButtonType) {
  const onRemoveHandler = () => {
    props.remover(props.elemId);
  };

  return <IconButton aria-label="delete">
    <Delete onClick={onRemoveHandler} fontSize="small"/>
  </IconButton>
}
