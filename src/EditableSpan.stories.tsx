import { action } from '@storybook/addon-actions';
import { EditableSpan } from './EditableSpan';

export default {
  title: 'EditableSpan Component',
  component: EditableSpan,
};

const callback = action("The title was changed")

export const AddItemFormExample = () => {
  return <EditableSpan title={'Hello! I am test task title!'} onChangeTitle={callback}/>;
};