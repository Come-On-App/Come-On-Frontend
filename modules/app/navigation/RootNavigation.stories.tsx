import { ComponentMeta } from '@storybook/react-native';
import { RootNavigator } from './RootNavigation';

type Meta = ComponentMeta<typeof RootNavigator>;

export default {
  title: 'Screens',
  component: RootNavigator,
} as Meta;

export const Root: Meta = {};
