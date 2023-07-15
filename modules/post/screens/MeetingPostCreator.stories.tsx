import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import MeetingPostCreator from './MeetingPostCreator';
import { NavigationContainer } from '@react-navigation/native';

import PostNavigator from '@post/navigation/PostNavigator';

type Meta = ComponentMeta<typeof MeetingPostCreator>;

export default {
  title: 'Screens',
  component: MeetingPostCreator,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <NavigationContainer>
          <Story />
        </NavigationContainer>
      </FontThemeProvider>
    ),
  ],
} as Meta;

type MeetingPostCreatorStory = ComponentStory<typeof MeetingPostCreator>;

export const MeetingPostCreation: MeetingPostCreatorStory = () => {
  return <PostNavigator initialRouteName="MeetingPostCreation" />;
};
