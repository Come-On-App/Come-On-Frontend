import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';

import PostNavigator from '@post/navigation/PostNavigator';
import MeetingPostViewer from './MeetingPostViewer';

type Meta = ComponentMeta<typeof MeetingPostViewer>;

export default {
  title: 'Screens',
  component: MeetingPostViewer,
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

type MeetingPostViewerStory = ComponentStory<typeof MeetingPostViewer>;

export const MeetingPostDetail: MeetingPostViewerStory = () => {
  return <PostNavigator initialRouteName="MeetingPostDetail" />;
};
