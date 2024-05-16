import App from './App';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProvideDecorator'

export default {
  title: 'App Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
};

// const callback = action("The title was changed")

export const AppExample = () => {
  return <App />
};