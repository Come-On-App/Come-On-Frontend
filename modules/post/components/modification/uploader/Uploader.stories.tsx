import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Uploader from './Uploader';

type Meta = ComponentMeta<typeof Uploader>;

export default {
  title: 'Modifier - Uploader',
  component: Uploader,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    isLoading: false,
  },
};
