import { ComponentMeta } from '@storybook/react-native';

import SignInComponent from './SignIn';
import { rest } from 'msw';
import { BASE_URL } from '@app/api/axiosInstance';

type Meta = ComponentMeta<typeof SignInComponent>;

export default {
  title: 'Screens',
  component: SignInComponent,
} as Meta;

export const SignIn: Meta = {};

export const SignInError: Meta = {
  title: '(API) SignInError - Error',
  parameters: {
    msw: {
      handlers: [
        rest.post(`${BASE_URL}/api/v1/oauth/apple`, (_req, res, ctx) => {
          return res(ctx.delay(3000), ctx.status(505));
        }),
        rest.post(`${BASE_URL}/api/v1/oauth/google`, (_req, res, ctx) => {
          return res(ctx.delay(3000), ctx.status(505));
        }),
      ],
    },
  },
};
