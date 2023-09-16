import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Component from './NoteCard';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Planner',
  component: Component,
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

export const NoteCard: Meta = {
  args: {
    info: {
      title: '용산역',
      content: '오전 8시에 모여!',
      address: '서울특별시 마포구 망원동',
      type: 'RESTAURANT',
      fields: [],
    },
  },
};
