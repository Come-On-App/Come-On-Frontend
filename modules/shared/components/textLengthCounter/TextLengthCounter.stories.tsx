import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import TextLengthCounter from './TextLengthCounter';

type Meta = ComponentMeta<typeof TextLengthCounter>;

export default {
  title: 'TextLengthCounter',
  component: TextLengthCounter,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ padding: 10 }}>
          <Story />
        </View>
      </FontThemeProvider>
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
