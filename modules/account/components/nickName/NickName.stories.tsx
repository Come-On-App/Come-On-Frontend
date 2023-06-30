import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import NickName from './NickName';
import { mockUserAvatarImage } from '@account/mocks/mockUserAvatarImage';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof NickName>;

const IconButtonMeta: ComponentMeta<typeof NickName> = {
  title: 'Account - NickName',
  component: NickName,
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
    name: 'Apple',
  },
};

export const EmptyNickName: Meta = {
  args: {
    name: '',
  },
};
