import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Description from './Description';

type Meta = ComponentMeta<typeof Description>;

export default {
  title: 'Connection - Description',
  component: Description,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {};
