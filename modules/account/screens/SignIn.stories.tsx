import { ComponentMeta } from '@storybook/react-native';

import SignInComponent from './SignIn';

type Meta = ComponentMeta<typeof SignInComponent>;

export default {
  title: 'Screens',
  component: SignInComponent,
  decorators: [(Story) => <Story />],
} as Meta;

export const SignIn: Meta = {};
