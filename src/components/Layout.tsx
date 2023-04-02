import { makeStyles } from '@rneui/themed';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface LayoutProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

// 모임 상세 레이아웃 (모임 디테일)
export function MeetingLayout({ style, children }: LayoutProps) {
  const styles = useStyles();

  return <View style={[styles.meetingLayout, style]}>{children}</View>;
}

// 기본 스크린 레이아웃
export function ScrrenLayout({ style, children }: LayoutProps) {
  const styles = useStyles();

  return <View style={[styles.scrrenLayout, style]}>{children}</View>;
}

const useStyles = makeStyles(() => ({
  meetingLayout: {
    width: '100%',
    marginVertical: 5,
  },
  scrrenLayout: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 30,
  },
}));
