import { ComponentMeta } from '@storybook/react-native';

import Component from './PolicyVersionMenu';

type Meta = ComponentMeta<typeof Component>;

const PolicyVersionMenuMeta: ComponentMeta<typeof Component> = {
  title: 'Account',
  component: Component,
};

export default PolicyVersionMenuMeta;

export const PolicyVersionMenu: Meta = {
  args: {},
};
