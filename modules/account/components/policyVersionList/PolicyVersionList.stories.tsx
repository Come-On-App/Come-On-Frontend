import { ComponentMeta } from '@storybook/react-native';

import Component from './PolicyVersionList';

type Meta = ComponentMeta<typeof Component>;

const PolicyVersionListMeta: ComponentMeta<typeof Component> = {
  title: 'Account',
  component: Component,
};

export default PolicyVersionListMeta;

export const PolicyVersionList: Meta = {
  args: {},
};
