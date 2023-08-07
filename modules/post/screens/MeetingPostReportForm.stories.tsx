import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import { NavigationContainer } from '@react-navigation/native';

import PostNavigator from '@post/navigation/PostNavigator';
import MeetingPostReportForm from './MeetingPostReportForm';

type Meta = ComponentMeta<typeof MeetingPostReport>;

export default {
  title: 'Screens',
  component: MeetingPostReportForm,
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

type MeetingPostViewerStory = ComponentStory<typeof MeetingPostReportForm>;

export const MeetingPostReport: MeetingPostViewerStory = () => {
  return <PostNavigator initialRouteName="MeetingPostReport" />;
};
