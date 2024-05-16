import { action } from '@storybook/addon-actions';
import { RemoveButton } from './RemoveButton';

export default {
  title: 'RemoveButton Component',
  component: RemoveButton,
};

const callback = action("The elem (task or todolist) was deleted")

export const RemoveButtonExample = () => {
  return <RemoveButton remover={callback} elemId={'elemId1'} />;
};