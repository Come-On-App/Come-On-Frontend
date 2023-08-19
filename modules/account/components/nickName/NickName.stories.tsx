import { ComponentMeta } from '@storybook/react-native';
import { View } from 'react-native';

import Component from './NickName';

type Meta = ComponentMeta<typeof Component>;

const IconButtonMeta: ComponentMeta<typeof Component> = {
  title: 'Account',
  component: Component,
  decorators: [
    (Story) => (
      <View style={{ margin: 10 }}>
        <Story />
      </View>
    ),
  ],
};

export default IconButtonMeta;

export const NickName: Meta = {
  args: {
    name: 'Apple',
  },
};

export const EmptyNickName: Meta = {
  args: {
    name: '',
  },
};
