import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';

import PostNavigator from '@post/navigation/PostNavigator';
import MeetingPostViewer from './MeetingPostViewer';

type Meta = ComponentMeta<typeof MeetingPostViewer>;

export default {
  title: 'Screens',
  component: MeetingPostViewer,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

type MeetingPostViewerStory = ComponentStory<typeof MeetingPostViewer>;

export const MeetingPostDetail: MeetingPostViewerStory = () => {
  return <PostNavigator initialRouteName="MeetingPostDetail" />;
};
