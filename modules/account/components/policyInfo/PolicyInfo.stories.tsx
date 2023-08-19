import { ComponentMeta } from '@storybook/react-native';

import Component from './PolicyInfo';

type Meta = ComponentMeta<typeof Component>;

const IconButtonMeta: ComponentMeta<typeof Component> = {
  title: 'Account',
  component: Component,
};

export default IconButtonMeta;

export const PolicyInfo: Meta = {
  args: {
    title: '약관 및 정책',
    showIcon: true,
  },
};

export const Version: Meta = {
  args: {
    title: '현재 버전 2.0.0',
    showIcon: false,
  },
};
