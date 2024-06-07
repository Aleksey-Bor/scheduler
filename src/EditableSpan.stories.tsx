import { action } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
};

const callback = action("The title was changed");

export const EditableSpanExample100 = () => {
  return (
    <EditableSpan
      title={"Hello! I am test task title!"}
      maxLength={100}
      onChangeTitle={callback}
    />
  );
};

export const EditableSpanExample500 = () => {
  return (
    <EditableSpan
      title={"Hello! I am test task title!"}
      maxLength={500}
      onChangeTitle={callback}
    />
  );
};
