import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DateRange } from '@post/features/post/type';
import { Ischedule } from '@post/components/detail/duration/schedule/type';

export type PostStackParamList = {
  MeetingPostList: undefined;
  MeetingPostCreation: undefined;
  MeetingDateSelector: { prevDateRange: DateRange };
  MeetingPostDetail: { id: number };
  MeetingPostReport: { id: number };
  MeetingPostModification: { id: number };
  MeetingVote: Omit<Ischedule, 'votingStatus' | 'fixedDate'>;
  MeetingPlanner: undefined;
  MeetingPlannerDetail: undefined;
};

type PostRouteNames = keyof PostStackParamList;

export type PostScreenProps = NativeStackScreenProps<PostStackParamList>;

export type PostNativeStack<T extends PostRouteNames> = NativeStackScreenProps<
  PostStackParamList,
  T
>;

export type PostNavigation<T extends PostRouteNames> =
  PostNativeStack<T>['navigation'];

export interface IpostNavigator {
  children: React.ReactNode;
  initialRouteName?: PostRouteNames;
}

export interface Inavigation {
  initialRouteName?: PostRouteNames;
  ONLY_TEST_ID?: number;
}
