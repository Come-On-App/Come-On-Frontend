import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Component from './MemberCount';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Participants',
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

export const MemberCount: Meta = {
  args: {
    headcount: 1,
  },
};
