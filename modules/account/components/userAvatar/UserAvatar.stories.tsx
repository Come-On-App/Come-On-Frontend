import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import UserAvatar from './UserAvatar';
import { mockUserAvatarImage } from '@account/mocks/mockUserAvatarImage';

type Meta = ComponentMeta<typeof UserAvatar>;

const IconButtonMeta: ComponentMeta<typeof UserAvatar> = {
  title: 'Account - Avatar',
  component: UserAvatar,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
};

export default IconButtonMeta;

export const Defualt: Meta = {
  args: {
    path: mockUserAvatarImage,
  },
};
