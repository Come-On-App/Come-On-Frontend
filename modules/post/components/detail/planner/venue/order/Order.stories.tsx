import { ComponentMeta } from '@storybook/react-native';

import Component from './Order';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Planner',
  component: Component,
  decorators: [
    (Story) => (
      <View style={{ margin: 10 }}>
        <Story />
      </View>
    ),
  ],
} as Meta;

export const Order: Meta = {
  args: {
    order: 1,
  },
};
