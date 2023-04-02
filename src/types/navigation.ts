/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
import '@rneui/themed';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MeetingMode } from '@features/meetingSlice';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type PlaceSelectParamList = {
  Main: undefined;
  Map: undefined;
};

export type RoomCalendarParamList = {
  meetingId: undefined;
};

export type PlaceSelectScreenProps =
  NativeStackScreenProps<PlaceSelectParamList>;

export type PlaceSelectNavigation = PlaceSelectScreenProps['navigation'];

export type RootScreenParams = NavigatorScreenParams<RootTabParamList>;

export type PlaceSelectParams = NavigatorScreenParams<PlaceSelectParamList>;

export type RootNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Root'
>;

export type BottomTabScreenNavigation =
  BottomTabScreenProps<RootTabParamList>['navigation'];

export type NativeStackScreenNavigation =
  NativeStackScreenProps<RootStackParamList>['navigation'];

export type MeetingDetailNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'MeetingDetail',
  undefined
>;

export type CreateMeetingNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'CreateMeeting'
>;

export type RootStackParamList = {
  Root: RootScreenParams;
  MeetingRoom: undefined;
  CreateMeeting: { mode: MeetingMode; meetingId?: number };
  PlaceSelect: PlaceSelectParams;
  MeetingDetail: { meetingId: number };
  PeriodCalendar: undefined;
  SelectCalendar: { meetingId: number };
  LoginScreen: undefined;
  KakaoLoginWebView: undefined;
  EasterEgg: undefined;
  ReportPost: { meetingId: number };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
