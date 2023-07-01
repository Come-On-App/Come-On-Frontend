import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import AccountManagement from './AccountManagement';

type Meta = ComponentMeta<typeof AccountManagement>;

const IconButtonMeta: ComponentMeta<typeof AccountManagement> = {
  title: 'Account - AccountManagement',
  component: AccountManagement,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
};

export default IconButtonMeta;

export const Defualt: Meta = {
  args: {},
};
