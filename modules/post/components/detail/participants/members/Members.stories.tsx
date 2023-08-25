import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Component from './Members';
import mockMembers from '@post/mocks/members';

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

export const Members: Meta = {
  args: {
    response: mockMembers,
    isLoading: false,
  },
};
