import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import MemberCount from './MemberCount';
import mockMembers from '@post/mocks/members';

type Meta = ComponentMeta<typeof MemberCount>;

export default {
  title: 'Detail - MemberCount',
  component: MemberCount,
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

export const Defualt: Meta = {
  args: {
    headcount: 1,
  },
};
