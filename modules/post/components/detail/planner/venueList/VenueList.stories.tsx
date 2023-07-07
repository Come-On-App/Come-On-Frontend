import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Component from './VenueList';
import mockVenueList from '@post/mocks/venueList';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Planner',
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
} as Meta;

export const VenueList: Meta = {
  args: {
    data: mockVenueList,
  },
};
