import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import UserAvatar from './UserAvatar';
import { mockUserAvatarImage } from '@account/mocks/mockUserAvatarImage';

type Meta = ComponentMeta<typeof UserAvatar>;

const IconButtonMeta: ComponentMeta<typeof UserAvatar> = {
  title: 'Account - Avatar',
  component: UserAvatar,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
};

export default IconButtonMeta;

export const Defualt: Meta = {
  args: {
    path: mockUserAvatarImage,
  },
};
