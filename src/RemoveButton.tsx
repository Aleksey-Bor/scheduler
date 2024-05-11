import React from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type RemoveButtonType = {
  remover: (elemId: string) => void;
  elemId: string;
};

export const RemoveButton = React.memo((props: RemoveButtonType) => {
  const onRemoveHandler = () => {
    props.remover(props.elemId);
  };

  console.log("RemoveButton is called");

  return (
    <IconButton aria-label="delete" onClick={onRemoveHandler}>
      <Delete fontSize="small" />
    </IconButton>
  );
});
