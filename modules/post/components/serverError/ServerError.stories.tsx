import { ComponentMeta } from '@storybook/react-native';

import ServerError from './ServerError';

type Meta = ComponentMeta<typeof ServerError>;

export default {
  title: 'CardList',
  component: ServerError,
} as Meta;

export const Error: Meta = {
  args: {},
};
