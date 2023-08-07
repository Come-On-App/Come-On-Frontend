import { DateRange } from '@post/features/post/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PostStackParamList = {
  MeetingPostList: undefined;
  MeetingPostCreation: undefined;
  MeetingDateSelector: {
    prevDateRange: DateRange;
  };
  MeetingPostDetail: undefined;
  MeetingPostReport: {
    id: number;
  };
  MeetingPostModification: {
    id: number;
  };
};

type PostRouteNames = keyof PostStackParamList;

export type PostNativeStack<T extends PostRouteNames> = NativeStackScreenProps<
  PostStackParamList,
  T
>;

export type PostListNavigation =
  PostNativeStack<'MeetingPostList'>['navigation'];

export interface IpostNavigator {
  children: React.ReactNode;
  initialRouteName?: PostRouteNames;
}

export interface Inavigation {
  initialRouteName?: PostRouteNames;
}
