import { ComponentMeta } from '@storybook/react-native';

import Component from './AccountManagement';

type Meta = ComponentMeta<typeof Component>;

const AccountManagementMeta: ComponentMeta<typeof Component> = {
  title: 'Account',
  component: Component,
};

export default AccountManagementMeta;

export const AccountManagement: Meta = {
  args: {},
};
