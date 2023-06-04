import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ThemeProvider from './modules/shared/components/ThemeProvider';
import RootNavigation from './modules/app/navigation/RootNavigation';

/**
 * 목표
 * 1. 디자인 프레임 워크 도입 [v]
 * 2. 디자인 레이아웃 반응형 설계 고민 []
 * 3. 레퍼 컴포넌트 유틸 알아보기 [v]
 */
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ThemeProvider>
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
