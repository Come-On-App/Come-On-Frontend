import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Component from './Members';
import mockMembers from '@post/mocks/members';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Participant',
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

export const Members: Meta = {
  args: {
    members: mockMembers,
  },
};
