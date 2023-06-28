import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Logo from './Logo';

type Meta = ComponentMeta<typeof Logo>;

export default {
  title: 'Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {};
