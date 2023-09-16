import { ComponentMeta } from '@storybook/react-native';

import Component from './Skeleton';

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

export const Skeleton: Meta = {};
