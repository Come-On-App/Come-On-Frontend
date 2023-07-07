import { ComponentMeta } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import Logo from './Logo';

type Meta = ComponentMeta<typeof Logo>;

export default {
  title: 'Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {};
