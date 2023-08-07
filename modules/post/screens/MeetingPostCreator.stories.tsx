import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import MeetingPostCreator from './MeetingPostCreator';

import PostNavigator from '@post/navigation/PostNavigator';

type Meta = ComponentMeta<typeof MeetingPostCreator>;

export default {
  title: 'Screens',
  component: MeetingPostCreator,
  decorators: [(Story) => <Story />],
} as Meta;

type MeetingPostCreatorStory = ComponentStory<typeof MeetingPostCreator>;

export const MeetingPostCreation: MeetingPostCreatorStory = () => {
  return <PostNavigator initialRouteName="MeetingPostCreation" />;
};
