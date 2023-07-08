import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Description from './Description';

type Meta = ComponentMeta<typeof Description>;

export default {
  title: 'Description',
  component: Description,
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
    description: '메시지를 입력해 주세요',
  },
};
