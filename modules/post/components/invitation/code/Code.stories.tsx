import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Code from './Code';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof Code>;

export default {
  title: 'Invitation - Code',
  component: Code,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    value: '------',
  },
};
