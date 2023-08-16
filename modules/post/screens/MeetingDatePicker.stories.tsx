import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import MeetingDatePicker from './MeetingDatePicker';

import PostNavigator from '@post/navigation/PostNavigator';

type Meta = ComponentMeta<typeof MeetingDatePicker>;

export default {
  title: 'Screens',
  component: MeetingDatePicker,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

type MeetingDatePickerStory = ComponentStory<typeof MeetingDatePicker>;

export const MeetingDateSelector: MeetingDatePickerStory = (arg) => {
  return <PostNavigator initialRouteName="MeetingDateSelector" />;
};
