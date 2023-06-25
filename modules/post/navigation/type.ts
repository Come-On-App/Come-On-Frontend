import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MeetingPostListParamList = {
  MeetingPostList: undefined;
  MeetingPostCreation: undefined;
  MeetingDateSelector: undefined;
  MeetingPostDetail: undefined;
};

export type postListNavigationProps =
  NativeStackScreenProps<MeetingPostListParamList>['navigation'];

type InitialRouteName = keyof MeetingPostListParamList;

export interface IpostNavigator {
  children: React.ReactNode;
  initialRouteName?: InitialRouteName;
}

export interface Inavigation {
  initialRouteName?: InitialRouteName;
}
