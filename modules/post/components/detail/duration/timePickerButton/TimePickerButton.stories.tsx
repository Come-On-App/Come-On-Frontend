import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Component from './TimePickerButton';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Duration',
  component: Component,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
  argTypes: {
    isHost: {
      type: 'boolean',
    },
  },
} as Meta;

export const TimePickerButton: Meta = {
  args: {
    time: '12:00:00',
    isHost: false,
  },
};

export const HostTimePickerButton: Meta = {
  args: {
    time: '12:00:00',
    isHost: true,
  },
};
