import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { Tab } from './config';

export type BottomTabParamList = {
  [Tab.one]: undefined;
  [Tab.two]: undefined;
  [Tab.three]: undefined;
};

export type BottomTabProps = BottomTabScreenProps<BottomTabParamList>;

export type BottomTabNavigation = BottomTabProps['navigation'];

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
};

export interface IbottomTabNavigator {
  children: React.ReactNode;
  initialRouteName?: Tab;
}

export interface Inavigation {
  initialRouteName?: Tab;
}
