import { ComponentMeta } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import EntranceInput from './EntranceInput';

type Meta = ComponentMeta<typeof EntranceInput>;

export default {
  title: 'Connection - EntranceInput',
  component: EntranceInput,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {};
