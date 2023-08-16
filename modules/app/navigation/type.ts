import { Tab } from './config';

export type BottomTabParamList = {
  [Tab.one]: undefined;
  [Tab.two]: undefined;
  [Tab.three]: undefined;
};

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
