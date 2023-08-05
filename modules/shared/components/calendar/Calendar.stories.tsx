import { ComponentMeta } from '@storybook/react-native';

import Calendar from './Calendar';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof Calendar>;

export default {
  title: 'Calendar',
  component: Calendar,
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    onDayPress: () => null,
  },
};
