import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import CodeEntryButton from './CodeEntryButton';

type Meta = ComponentMeta<typeof CodeEntryButton>;

export default {
  title: 'Connection - CodeEntryButton',
  component: CodeEntryButton,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
  argTypes: {
    code: {
      type: 'string',
    },
  },
} as Meta;

export const Default: Meta = {};

export const Enabled: Meta = {
  args: {
    code: '1A2B3C',
  },
};
