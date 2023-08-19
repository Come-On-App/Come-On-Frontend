import { ComponentMeta } from '@storybook/react-native';

import Component from './PolicyVersionList';

type Meta = ComponentMeta<typeof Component>;

const IconButtonMeta: ComponentMeta<typeof Component> = {
  title: 'Account',
  component: Component,
};

export default IconButtonMeta;

export const PolicyVersionList: Meta = {
  args: {},
};
