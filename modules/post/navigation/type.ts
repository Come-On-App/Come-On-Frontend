import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MeetingPostListParamList = {
  MeetingPostList: undefined;
};

export type postListNavigationProps =
  NativeStackScreenProps<MeetingPostListParamList>['navigation'];
