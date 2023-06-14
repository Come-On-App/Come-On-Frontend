import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import TextLengthCounter from './TextLengthCounter';

type Meta = ComponentMeta<typeof TextLengthCounter>;

export default {
  title: 'TextLengthCounter',
  component: TextLengthCounter,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ padding: 10 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    text: 'abcd',
    max: 10,
  },
};

export const Max: Meta = {
  args: {
    text: 'appleapple',
    max: 10,
  },
};
