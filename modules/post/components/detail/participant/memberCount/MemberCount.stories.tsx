import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Component from './MemberCount';

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

export const MemberCount: Meta = {
  args: {
    headcount: 1,
  },
};
