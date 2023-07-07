import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Component from './Planner';
import mockVenueList from '@post/mocks/venueList';
import { ScrollView, View } from 'react-native';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Planner',
  component: Component,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <ScrollView>
          <Story />
        </ScrollView>
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Planner: Meta = {
  args: {
    venueList: mockVenueList,
  },
};
