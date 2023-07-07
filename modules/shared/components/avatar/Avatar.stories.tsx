import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import Avatar, { BadgedAvatar as BadgedAvatarComponent } from './Avatar';

const PATH = 'https://picsum.photos/200/300';

type Meta = ComponentMeta<typeof Avatar>;

const IconButtonMeta: ComponentMeta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontThemeProvider>
    ),
  ],
  argTypes: {
    size: {
      type: 'number',
    },
  },
};

export default IconButtonMeta;

export const Defualt: Meta = {
  args: {
    path: PATH,
  },
};

export const WrongAvatar: Meta = {
  args: {
    path: 'https://xxx.jpg',
  },
};

export const EmptyAvatar: Meta = {
  args: {
    path: '',
  },
};

type BadgedAvatarStory = ComponentStory<typeof BadgedAvatarComponent>;

export const BadgedAvatar: BadgedAvatarStory = (args) => {
  return (
    <BadgedAvatarComponent
      size={args.size}
      badgeName={'photo-camera'}
      path={PATH}
    />
  );
};
