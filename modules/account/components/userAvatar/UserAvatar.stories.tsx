import { ComponentMeta } from '@storybook/react-native';

import UserAvatar from './UserAvatar';
import { mockUserAvatarImage } from '@account/mocks/mockUserAvatarImage';

type Meta = ComponentMeta<typeof UserAvatar>;

const AvatarMeta: ComponentMeta<typeof UserAvatar> = {
  title: 'Account',
  component: UserAvatar,
};

export default AvatarMeta;

export const Avatar: Meta = {
  args: {
    path: mockUserAvatarImage,
  },
};

export const AvatarLoading: Meta = {
  args: {
    isLoading: true,
  },
};
