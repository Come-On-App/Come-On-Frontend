import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import MeetingPostCreator from './MeetingPostCreator';
import { NavigationContainer } from '@react-navigation/native';

import PostNavigator from '@post/navigation/PostNavigator';

type Meta = ComponentMeta<typeof MeetingPostCreator>;

export default {
  title: 'Screens',
  component: MeetingPostCreator,
  decorators: [
    (Story) => (
      <FontLoader>
        <NavigationContainer>
          <Story />
        </NavigationContainer>
      </FontLoader>
    ),
  ],
} as Meta;

type MeetingPostCreatorStory = ComponentStory<typeof MeetingPostCreator>;

export const MeetingPostCreation: MeetingPostCreatorStory = () => {
  return <PostNavigator initialRouteName="MeetingPostCreation" />;
};
