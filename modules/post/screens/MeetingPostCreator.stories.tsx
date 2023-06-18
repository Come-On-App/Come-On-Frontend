import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import MeetingPostCreator from './MeetingPostCreator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MeetingPostListParamList } from '@post/navigation/type';
import { PostNavigator } from '@post/navigation/PostNavigator';

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

type IconButtonStory = ComponentStory<typeof MeetingPostCreator>;

const { Screen } = createNativeStackNavigator<MeetingPostListParamList>();

export const MeetingPostCreation: IconButtonStory = () => {
  return (
    <PostNavigator >
      <Screen
        name="MeetingPostCreation"
        component={MeetingPostCreator}
        options={{
          headerShown: true,
          headerTitle: '모임등록',
          headerTitleAlign: 'center',
        }}
      />
    </PostNavigator>    
  );
};
