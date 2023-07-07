import { addDecorator, getStorybookUI } from '@storybook/react-native';

import './storybook.requires';
import { withMsw, initialize } from './mswDecorator';

const StorybookUIRoot = getStorybookUI({});

initialize();
addDecorator(withMsw);

export default StorybookUIRoot;
