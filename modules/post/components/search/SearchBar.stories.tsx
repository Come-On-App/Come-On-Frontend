import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import SearchBar from './SearchBar';

type Meta = ComponentMeta<typeof SearchBar>;

export default {
  title: 'SearchBar',
  component: SearchBar,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ padding: 10 }}>
          <Story />
        </View>
      </FontLoader>
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
