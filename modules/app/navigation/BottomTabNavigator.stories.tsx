import { ComponentMeta } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Tab } from './config';
import BottomTabNavigator from './BottomTabNavigator';
import { FontLoader } from '@shared/components/ThemeProvider';

type Meta = ComponentMeta<typeof BottomTabNavigator>;

export default {
  title: 'BottomTab',
  component: BottomTabNavigator,
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

export const MeetingDashboard: Meta = {
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
