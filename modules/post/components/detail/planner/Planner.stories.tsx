import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import Component from './Planner';
import { ScrollView } from 'react-native';
import store from '@app/redux/store';
import { updateCurrentPostId } from '@post/features/detail/detailSlice';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Planner',
  component: Component,
  decorators: [
    (Story) => (
      <ScrollView>
        <Story />
      </ScrollView>
    ),
  ],
} as Meta;

type MeetingDatePickerStory = ComponentStory<typeof Component>;

export const Planner: MeetingDatePickerStory = () => {
  // 특정 포스트 게시물 아이디 재현
  store.dispatch(updateCurrentPostId(1));

  return <Component />;
};
