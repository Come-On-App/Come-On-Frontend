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
  hostId: undefined;
};

export type PlaceSelectScreenProps =
  NativeStackScreenProps<PlaceSelectParamList>;

export type PlaceSelectScreenParams =
  NavigatorScreenParams<PlaceSelectParamList>;

export type PlaceSelectNavigation = PlaceSelectScreenProps['navigation'];

export type RootScreenParams = NavigatorScreenParams<RootTabParamList>;

export type BottomTabScreenNavigation =
  BottomTabScreenProps<RootTabParamList>['navigation'];

export type MeetingDetailNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'MeetingDetail',
  undefined
>;

export type RootStackParamList = {
  Root: RootScreenParams;
  MeetingRoom: undefined;
  CreateMeeting: undefined;
  PlaceSelect: PlaceSelectScreenParams;
  MeetingDetail: { meetingId: number };
  CreateMeetingCalender: undefined;
  MeetingRoomCalendar: NavigatorScreenParams<RoomCalendarParamList> | undefined;
  LoginScreen: undefined;
  KakaoLoginWebView: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
