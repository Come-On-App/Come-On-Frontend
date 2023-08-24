import { ComponentMeta } from '@storybook/react-native';

import Component from './UserInfo';
import { BASE_URL } from '@app/api/config';
import { rest } from 'msw';

type Meta = ComponentMeta<typeof Component>;

const UserInfoMeta: ComponentMeta<typeof Component> = {
  title: 'Account',
  component: Component,
};

export default UserInfoMeta;

export const UserInfo: Meta = {};

export const UserInfoLoading: Meta = {
  parameters: {
    msw: {
      handlers: [
        rest.get(`${BASE_URL}/api/v2/users/me`, (_req, res, ctx) => {
          return res(ctx.delay('infinite'));
        }),
      ],
    },
  },
};
