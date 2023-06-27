import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Description from './Description';

type Meta = ComponentMeta<typeof Description>;

export default {
  title: 'Connection - Description',
  component: Description,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {};
