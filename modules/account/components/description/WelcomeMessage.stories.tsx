import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import WelcomeMessage from './WelcomeMessage';

type Meta = ComponentMeta<typeof WelcomeMessage>;

const IconButtonMeta: ComponentMeta<typeof WelcomeMessage> = {
  title: 'Account - WelcomeMessage',
  component: WelcomeMessage,
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
    userName: 'John Doe',
  },
};
