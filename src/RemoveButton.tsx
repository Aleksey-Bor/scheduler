import React from "react";

type RemoveButtonType = {
  remover: (elemId: string) => void;
  elemId: string;
};

export function RemoveButton(props: RemoveButtonType) {
  const onRemoveHandler = () => {
    props.remover(props.elemId);
  };

  return <button onClick={onRemoveHandler}>x</button>;
}
