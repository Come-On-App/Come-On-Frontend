import { ComponentMeta } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import Component from './Category';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Planner',
  component: Component,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ margin: 10, width: 50 }}>
          <Story />
        </View>
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Category: Meta = {
  args: {
    type: '관광명소',
  },
};
