import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Component from './Venue';
import mockData from '@post/mocks/venue';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Planner',
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
} as Meta;

export const Venue: Meta = {
  args: {
    info: mockData.info,
    order: mockData.order,
  },
};
