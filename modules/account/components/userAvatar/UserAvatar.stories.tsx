import { ComponentMeta } from '@storybook/react-native';

import UserAvatar from './UserAvatar';
import { mockUserAvatarImage } from '@account/mocks/mockUserAvatarImage';

type Meta = ComponentMeta<typeof UserAvatar>;

const IconButtonMeta: ComponentMeta<typeof UserAvatar> = {
  title: 'Account',
  component: UserAvatar,
};

export default IconButtonMeta;

export const Avatar: Meta = {
  args: {
    path: mockUserAvatarImage,
  },
};
