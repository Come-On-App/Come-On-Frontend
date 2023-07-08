import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Logo from './Logo';
import ErrorLogo from './ErrorLogo';

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

export const Error = () => <ErrorLogo />;
