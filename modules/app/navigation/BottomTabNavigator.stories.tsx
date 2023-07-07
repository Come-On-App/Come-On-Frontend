import { ComponentMeta } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Tab } from './config';
import BottomTabNavigator from './BottomTabNavigator';
import FontThemeProvider from '@shared/provider/FontProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import postHandlers from '@post/mocks/handlers';

type Meta = ComponentMeta<typeof BottomTabNavigator>;
const queryClient = new QueryClient();

export default {
  title: 'Screens',
  component: BottomTabNavigator,
  parameters: {
    msw: {
      handlers: [postHandlers],
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <FontThemeProvider>
          <NavigationContainer>
            <Story />
          </NavigationContainer>
        </FontThemeProvider>
      </QueryClientProvider>
    ),
  ],
} as Meta;

export const MeetingDashboard: Meta = {
  args: {
    initialRouteName: Tab.one,
  },
};

export const EnterMeeting: Meta = {
  args: {
    initialRouteName: Tab.two,
  },
};

export const MyPage: Meta = {
  args: {
    initialRouteName: Tab.three,
  },
};
