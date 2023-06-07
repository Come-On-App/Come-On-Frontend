import { ComponentMeta } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Tab } from './config';
import BottomTabNavigator from './BottomTabNavigator';

type Meta = ComponentMeta<typeof BottomTabNavigator>;

export default {
  title: 'BottomTab',
  component: BottomTabNavigator,
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} as Meta;

export const First: Meta = {
  args: {
    initialRouteName: Tab.one,
  },
};

export const Second: Meta = {
  args: {
    initialRouteName: Tab.two,
  },
};

export const Third: Meta = {
  args: {
    initialRouteName: Tab.three,
  },
};
