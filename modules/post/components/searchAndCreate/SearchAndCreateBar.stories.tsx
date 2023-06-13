import { ComponentMeta, StoryFnReactReturnType } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import SearchAndCreateBar from './SearchAndCreateBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const StoryBookStack = createNativeStackNavigator();

const NavigationDecorator = (Story: () => StoryFnReactReturnType) => {
  const Screen = () => Story();

  return (
    <NavigationContainer independent={true}>
      <StoryBookStack.Navigator>
        <StoryBookStack.Screen
          name="MeetingPostCreation"
          component={Screen}
          options={{ header: () => null }}
        />
      </StoryBookStack.Navigator>
    </NavigationContainer>
  );
};

type Meta = ComponentMeta<typeof SearchAndCreateBar>;

export default {
  title: 'SearchAndCreateBar',
  component: SearchAndCreateBar,
  decorators: [
    NavigationDecorator,
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {};
