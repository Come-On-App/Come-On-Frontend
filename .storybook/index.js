import { addDecorator, getStorybookUI } from '@storybook/react-native';

import './storybook.requires';
import { withMsw, initialize } from './mswDecorator';
import { queryClient } from '../modules/app/api/queryClient';

const StorybookUIRoot = getStorybookUI({});

initialize();
addDecorator(withMsw);
addDecorator((storyFn) => {
  queryClient.clear();

  return storyFn();
});

export default StorybookUIRoot;
