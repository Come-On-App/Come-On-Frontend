import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DateRange } from '@post/features/post/type';
import { Ischedule } from '@post/components/detail/duration/schedule/type';
import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabProps } from '@app/navigation/type';
import { MetaData } from '@post/components/detail/planner/customField/type';

export type PostStackParamList = {
  MeetingPostList: undefined;
  MeetingPostCreation: undefined;
  MeetingDateSelector: { prevDateRange: DateRange };
  MeetingPostDetail: NavigatorScreenParams<PostDetailStackParamLis>;
  MeetingPostReport: { id: number };
  MeetingPostModification: { id: number };
};

export type PostRouteNames = keyof PostStackParamList;

export type PostScreenProps = NativeStackScreenProps<PostStackParamList>;

export type PostNativeStack<T extends PostRouteNames> = NativeStackScreenProps<
  PostStackParamList,
  T
>;

export type PostNavigation<T extends PostRouteNames> =
  PostNativeStack<T>['navigation'];

// Post Detail Navigation
export type PostDetailStackParamLis = {
  PostDetail: { id: number; imagePath: string; title: string };
  PostDetailVote: Omit<Ischedule, 'fixedDate'>;
  PostDetailPlanner: undefined;
  PostDetailPlannerField: undefined;
  PostDetailMeetingCardDetail: { fields: MetaData[] };
};

type PostDetailRouteNames = keyof PostDetailStackParamLis;

export type PostDetailNativeStack<T extends PostDetailRouteNames> =
  NativeStackScreenProps<PostDetailStackParamLis, T>;

export type PostDetailNavigation<T extends PostDetailRouteNames> =
  PostDetailNativeStack<T>['navigation'];

interface Navigator {
  children: React.ReactNode;
}

export interface IPostNavigator extends Navigator {
  initialRouteName?: PostRouteNames;
}

export interface IPostDetailNavigator extends Navigator {
  initialRouteName?: PostDetailRouteNames;
}

export interface IPostDetailNavigation {
  initialRouteName?: PostDetailRouteNames;
  ONLY_TEST_ID?: number;
}

export interface IPostNavigation extends Partial<BottomTabProps> {
  initialRouteName?: PostRouteNames;
  ONLY_TEST_ID?: number;
}
