import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import MeetingDatePicker from './MeetingDatePicker';
import { NavigationContainer } from '@react-navigation/native';

import PostNavigator from '@post/navigation/PostNavigator';

type Meta = ComponentMeta<typeof MeetingDatePicker>;

export default {
  title: 'Screens',
  component: MeetingDatePicker,
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

type MeetingDatePickerStory = ComponentStory<typeof MeetingDatePicker>;

export const MeetingDateSelector: MeetingDatePickerStory = () => {
  return <PostNavigator initialRouteName="MeetingDateSelector" />;
};
