import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import MeetingNameInput from './MeetingNameInput';

type Meta = ComponentMeta<typeof MeetingNameInput>;

export default {
  title: 'Creation - MeetingNameInput',
  component: MeetingNameInput,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {},
};
