import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Members from './Members';
import mockMembers from '@post/mocks/members';

type Meta = ComponentMeta<typeof Members>;

const IconButtonMeta: ComponentMeta<typeof Members> = {
  title: 'Detail - Members',
  component: Members,
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
    users: mockMembers,
  },
};
