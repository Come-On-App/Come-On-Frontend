import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';

import PostNavigator from '@post/navigation/PostNavigator';
import Component from './MeetingPostDetail';

type Meta = ComponentMeta<typeof MeetingPostDetail>;

export default {
  title: 'Screens',
  component: Component,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

type MeetingPostDetailStory = ComponentStory<typeof Component>;

export const MeetingPostDetail: MeetingPostDetailStory = () => {
  return (
    <PostNavigator initialRouteName="MeetingPostDetail" ONLY_TEST_ID={1} />
  );
};
