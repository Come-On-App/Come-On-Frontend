import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import MeetingDatePicker from './MeetingDatePicker';
import { NavigationContainer } from '@react-navigation/native';

import PostNavigator from '@post/navigation/PostNavigator';

type Meta = ComponentMeta<typeof MeetingDatePicker>;

export default {
  title: 'Screens',
  component: MeetingDatePicker,
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

type IconButtonStory = ComponentStory<typeof MeetingDatePicker>;

export const MeetingDateSelector: IconButtonStory = () => {
  return <PostNavigator initialRouteName="MeetingDateSelector" />;
};
