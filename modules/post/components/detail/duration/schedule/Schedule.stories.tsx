import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Component from './Schedule';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Duration',
  component: Component,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontThemeProvider>
    ),
  ],
  args: {
    range: {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    },
  },
  argTypes: {
    isFixed: {
      type: 'boolean',
    },
  },
} as Meta;

export const Schedule: Meta = {
  args: {
    range: {
      startFrom: '2023-06-10',
      endTo: '2023-06-10',
    },
    fixedDate: null,
    isHost: false,
    members: [],
    votingStatus: { contents: [], contentsCount: 0 },
  },
};

export const FixedSchedule: Meta = {
  args: {
    range: {
      startFrom: '2023-06-10',
      endTo: '2023-06-10',
    },
    fixedDate: {
      startFrom: '2023-06-10',
      endTo: '2023-06-10',
    },
    isHost: false,
    members: [],
    votingStatus: { contents: [], contentsCount: 0 },
  },
};
