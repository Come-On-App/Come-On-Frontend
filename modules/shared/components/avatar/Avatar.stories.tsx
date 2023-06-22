import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Avatar from './Avatar';

type Meta = ComponentMeta<typeof Avatar>;

const IconButtonMeta: ComponentMeta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontLoader>
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
    path: 'https://picsum.photos/200/300',
  },
};

export const WrongAvatar: Meta = {
  args: {
    path: 'https://xxx.jpg',
  },
};
