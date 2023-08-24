import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MyPageParamList = {
  MyPage: undefined;
  Policy: NavigatorScreenParams<PolicyParamList>;
};

export type PolicyParamList = {
  PolicyPages: undefined;
  TermsOfUse: undefined;
  PrivacyPolicy: undefined;
};

export type MyPageNativeStack<T extends keyof MyPageParamList> =
  NativeStackScreenProps<MyPageParamList, T>;

export type PolicyNavigation = MyPageNativeStack<'Policy'>['navigation'];

export interface Inavigator {
  children: React.ReactNode;
}
