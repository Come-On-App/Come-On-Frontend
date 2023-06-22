import { MeetingPostListParamList } from '@post/navigation/type';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoryFnReactReturnType } from '@storybook/react-native';
import { StyleProp, ViewStyle } from 'react-native';

const StoryBookStack = createNativeStackNavigator();

/**
 * 스토리북에서 mock 네비게이터를 활성화
 */
function generateNavigationDecorator(
  name: keyof MeetingPostListParamList,
  contentStyle?: StyleProp<ViewStyle>
) {
  return function NavigationDecorator(Story: () => StoryFnReactReturnType) {
    const Screen = () => Story();

    return (
      <NavigationContainer independent>
        <StoryBookStack.Navigator
          screenOptions={{
            contentStyle: [{ backgroundColor: undefined }, contentStyle],
          }}
        >
          <StoryBookStack.Screen
            name={name}
            component={Screen}
            options={{ header: () => null }}
          />
        </StoryBookStack.Navigator>
      </NavigationContainer>
    );
  };
}

export default generateNavigationDecorator;
