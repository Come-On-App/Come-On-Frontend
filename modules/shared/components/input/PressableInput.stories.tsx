import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import PressableInput from './PressableInput';

type Meta = ComponentMeta<typeof PressableInput>;

export default {
  title: 'PressableInput',
  component: PressableInput,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ padding: 10 }}>
          <Story />
        </View>
      </FontThemeProvider>
    ),
  ],
  argTypes: {
    onPress: { action: 'pressed the Component' },
  },
} as Meta;

export const Default: Meta = {
  args: {
    text: 'apple 모임',
  },
};

export const WithIcon: Meta = {
  args: {
    text: 'apple 모임',
    icon: {
      name: 'forum',
      color: 'black',
    },
  },
};

export const WithStyle: Meta = {
  args: {
    text: '날짜 범위를 선택해주세요',
    icon: {
      name: 'date-range',
      color: '#9E9E9E',
    },
    containerStyle: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#EEEEEE',
    },
    fontColor: '#9E9E9E',
  },
};
