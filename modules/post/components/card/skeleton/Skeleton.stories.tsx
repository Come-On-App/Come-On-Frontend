import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Skeleton from './Skeleton';
import { View } from 'react-native';
import Card from '../Card';

type Meta = ComponentMeta<typeof Skeleton>;

export default {
  title: 'Card',
  component: Skeleton,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Loading: Meta = {};
