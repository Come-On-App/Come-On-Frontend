import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import AccountManagement from './AccountManagement';

type Meta = ComponentMeta<typeof AccountManagement>;

const IconButtonMeta: ComponentMeta<typeof AccountManagement> = {
  title: 'Account - AccountManagement',
  component: AccountManagement,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
};

export default IconButtonMeta;

export const Defualt: Meta = {
  args: {},
};
