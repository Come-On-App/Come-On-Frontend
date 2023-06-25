import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Component from './Duration';
import mockDuration from '@post/mocks/duration';

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
    range: mockDuration.range,
    time: mockDuration.time,
  },
};
