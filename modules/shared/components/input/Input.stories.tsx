import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Input from './Input';

type Meta = ComponentMeta<typeof Input>;

export default {
  title: 'Input',
  component: Input,
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
    text: 'apple 모임',
  },
};

export const Placeholder: Meta = {
  args: {
    text: '',
    placeholder: '모임 이름을 입력해 주세요!',
  },
};
