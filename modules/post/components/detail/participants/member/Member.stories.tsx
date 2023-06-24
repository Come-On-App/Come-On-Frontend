import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Component from './Member';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Participants',
  component: Component,
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

export const Member: Meta = {
  args: {
    nickname: 'John Doe',
    profileImageUrl: 'https://picsum.photos/200/300',
  },
};

export const WrongUriMember: Meta = {
  args: {
    nickname: 'John Doe',
    profileImageUrl: 'https://xxx.jpg',
  },
};

export const EmptyUriMember: Meta = {
  args: {
    nickname: 'John Doe',
    profileImageUrl: '',
  },
};
