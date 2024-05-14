import { action } from '@storybook/addon-actions';
import { AddItemForm } from './AddItemForm';

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
};

const callback = action("Button 'add' was pressed inside the form")

export const AddItemFormExample = (props: any) => {
  return <AddItemForm addItem={callback} />;
};