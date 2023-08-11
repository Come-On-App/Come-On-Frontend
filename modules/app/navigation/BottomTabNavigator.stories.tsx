import { rest } from 'msw';
import { ComponentMeta } from '@storybook/react-native';

import { Tab } from './config';
import BottomTabNavigator from './BottomTabNavigator';
import { BASE_URL } from '@app/api/axiosInstance';
import { EmptyResponse } from '@post/mocks/getMeetingsSliceResponse';

type Meta = ComponentMeta<typeof BottomTabNavigator>;

export default {
  title: 'Screens',
  component: BottomTabNavigator,
} as Meta;

export const MeetingDashboard: Meta = {
  title: '(API) MeetingDashboard - Success',
  args: {
    initialRouteName: Tab.one,
  },
};

export const MeetingDashboardEmpty: Meta = {
  title: '(API) MeetingDashboard - Empty',
  args: {
    initialRouteName: Tab.one,
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(`${BASE_URL}/api/v2/meetings`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(EmptyResponse));
        }),
      ],
    },
  },
};

export const MeetingDashboardError: Meta = {
  title: '(API) MeetingDashboard - Error',
  args: {
    initialRouteName: Tab.one,
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(`${BASE_URL}/api/v2/meetings`, (_req, res, ctx) => {
          return res(ctx.status(500));
        }),
      ],
    },
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
