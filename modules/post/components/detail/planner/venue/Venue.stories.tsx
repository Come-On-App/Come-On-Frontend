import { ComponentMeta } from '@storybook/react-native';

import Component from './Venue';

import { View } from 'react-native';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Planner',
  component: Component,
  decorators: [
    (Story) => (
      <View style={{ margin: 10 }}>
        <Story />
      </View>
    ),
  ],
} as Meta;

export const Venue: Meta = {
  args: {
    data: {
      order: 1,
      meetingPlaceId: 0,
      category: 'CULTURE',
      placeName: '제목',
      memo: '메모 내용',
      address: '서브 제목',
      lat: 0,
      lng: 0,
      googlePlaceId: 'null',
    },
    showRightIcon: false,
  },
};
