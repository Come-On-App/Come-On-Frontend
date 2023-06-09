import { ComponentMeta } from '@storybook/react-native';

import Display from './Display';
import { FontLoader } from '@shared/components/ThemeProvider';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof Display>;

export default {
  title: 'Card - Display',
  component: Display,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
} as Meta;

export const GroupDisplay: Meta = {
  args: {
    name: 'group',
    children: '999명',
    disabled: false,
  },
};

export const ConfirmedDisplay: Meta = {
  args: {
    name: 'check-circle',
    children: '확정',
    disabled: false,
  },
};

export const UnConfirmedDisplay: Meta = {
  args: {
    name: 'check-circle',
    children: '미확정',
    disabled: true,
  },
};
