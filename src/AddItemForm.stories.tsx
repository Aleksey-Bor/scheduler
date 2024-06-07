import { action } from '@storybook/addon-actions';
import { AddItemForm } from './AddItemForm';

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
};

const callback = action("Button 'add' was pressed inside the form")

export const AddItemFormExample100 = (props: any) => {
  return <AddItemForm addItem={callback} maxLength={100}/>;
};

export const AddItemFormExample500 = (props: any) => {
  return <AddItemForm addItem={callback} maxLength={500}/>;
};