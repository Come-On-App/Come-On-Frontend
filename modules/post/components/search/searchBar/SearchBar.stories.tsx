import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import SearchBar from './SearchBar';

type Meta = ComponentMeta<typeof SearchBar>;

export default {
  title: 'SearchBar',
  component: SearchBar,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ padding: 10, height: 100 }}>
          <Story />
        </View>
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {},
};

export const WithDate: Meta = {
  args: {
    dateRange: {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    },
  },
};
