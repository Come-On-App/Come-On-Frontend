import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import EntranceInput from './EntranceInput';

type Meta = ComponentMeta<typeof EntranceInput>;

export default {
  title: 'Connection - EntranceInput',
  component: EntranceInput,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {};
