import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import MemberCount from './MemberCount';
import mockMembers from '@post/mocks/members';

type Meta = ComponentMeta<typeof MemberCount>;

const IconButtonMeta: ComponentMeta<typeof MemberCount> = {
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
};

export default IconButtonMeta;

export const Defualt: Meta = {
  args: {
    headcount: 1,
  },
};
