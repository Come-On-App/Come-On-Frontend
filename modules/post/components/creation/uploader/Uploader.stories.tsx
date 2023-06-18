import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Uploader from './Uploader';

type Meta = ComponentMeta<typeof Uploader>;

export default {
  title: 'Creation - Uploader',
  component: Uploader,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ paddingHorizontal: 15 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {},
};
