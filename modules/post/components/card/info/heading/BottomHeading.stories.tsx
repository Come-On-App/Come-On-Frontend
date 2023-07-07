import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import BottomHeading from './BottomHeading';

type Meta = ComponentMeta<typeof BottomHeading>;

export default {
  title: 'Card - BottomHeading',
  component: BottomHeading,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    title: '우리들의 모임',
    subTitle: {
      userName: '여행마스터',
      range: {
        startFrom: '2023-06-10',
        endTo: '2023-06-20',
      },
    },
  },
};
