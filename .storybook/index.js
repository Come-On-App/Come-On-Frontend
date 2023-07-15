import { getStorybookUI } from '@storybook/react-native';

import './storybook.requires';
import { initialize } from './mswDecorator';

initialize();

const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
