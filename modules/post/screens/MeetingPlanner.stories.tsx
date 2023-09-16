import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import Component from './MeetingPlanner';
import PostNavigator from '@post/navigation/PostDetailNavigator';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Screens',
  component: Component,
} as Meta;

type MeetingDatePickerStory = ComponentStory<typeof Component>;

export const MeetingPlanner: MeetingDatePickerStory = () => {
  return <PostNavigator initialRouteName="PostDetailPlanner" />;
};
