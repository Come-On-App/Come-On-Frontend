import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Component from './Duration';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Duration',
  component: Component,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const Duration: Meta = {
  args: {
    range: {
      range: { startFrom: '2023-06-10', endTo: '2023-06-20' },
      isFixed: false,
    },
    time: {
      time: '06:00:00',
      isHost: false,
    },
  },
};
