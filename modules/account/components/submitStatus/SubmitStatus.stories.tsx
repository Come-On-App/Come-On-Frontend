import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import Component from './SubmitStatus';

type Meta = ComponentMeta<typeof Component>;

const SubmitStatus: ComponentMeta<typeof Component> = {
  title: 'SubmitStatus',
  component: Component,
  decorators: [
    (Story) => (
      <View style={{ margin: 10 }}>
        <Story />
      </View>
    ),
  ],
};

export default SubmitStatus;

export const Default: Meta = {
  args: {
    isLoading: true,
    title: '이미지 업데이트 중',
    backgroundColor: 'pink',
  },
};
