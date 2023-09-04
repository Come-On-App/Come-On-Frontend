import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';

import PostNavigator from '@post/navigation/PostNavigator';
import MeetingPostReportForm from './MeetingPostReportForm';

type Meta = ComponentMeta<typeof MeetingPostReport>;

export default {
  title: 'Screens',
  component: MeetingPostReportForm,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

type MeetingPostDetailStory = ComponentStory<typeof MeetingPostReportForm>;

export const MeetingPostReport: MeetingPostDetailStory = () => {
  return <PostNavigator initialRouteName="MeetingPostReport" />;
};
