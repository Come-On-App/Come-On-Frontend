import { ComponentMeta } from '@storybook/react-native';

import Component from './Email';

type Meta = ComponentMeta<typeof Component>;

const EmailMeta: ComponentMeta<typeof Component> = {
  title: 'Account',
  component: Component,
};

export default EmailMeta;

export const Email: Meta = {
  args: {
    email: 'jeongbaebang_dev@naver.com',
  },
};
