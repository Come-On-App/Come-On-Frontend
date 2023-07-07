import { ComponentMeta } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import Email from './Email';

type Meta = ComponentMeta<typeof Email>;

const IconButtonMeta: ComponentMeta<typeof Email> = {
  title: 'Account - Email',
  component: Email,
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
  args: {
    email: 'jeongbaebang_dev@naver.com',
  },
};
