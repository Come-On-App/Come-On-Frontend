import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import RootNavigation from './modules/app/navigation/RootNavigation';
import { theme } from './modules/shared/constants/themed';

/**
 * 목표
 * 1. 디자인 프레임 워크 도입 [v]
 * 2. 디자인 레이아웃 반응형 설계 고민 []
 * 3. 레퍼 컴포넌트 유틸 알아보기 []
 */
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ThemeProvider theme={theme}>
        <RootNavigation />
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
