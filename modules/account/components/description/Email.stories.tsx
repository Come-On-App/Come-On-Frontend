import { ComponentMeta } from '@storybook/react-native';

import Component from './Email';

type Meta = ComponentMeta<typeof Component>;

const IconButtonMeta: ComponentMeta<typeof Component> = {
  title: 'Account',
  component: Component,
};

export default IconButtonMeta;

export const Email: Meta = {
  args: {
    email: 'jeongbaebang_dev@naver.com',
  },
};
