/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import ThemeProvider from './modules/shared/components/ThemeProvider';
import RootNavigation from './modules/app/navigation/RootNavigation';

/**
 * 목표
 * 1. 디자인 프레임 워크 도입 [v]
 * 2. 디자인 레이아웃 반응형 설계 고민 [v]
 * 3. 레퍼 컴포넌트 유틸 알아보기 [v]
 * 4. 스토리북 도입 고려하기 [v]
 * 5. 스토리북 전체적인 사용법 익히기 []
 * 6. 스토리북 사용하여 컴포넌트 CDD []
 */
export function App() {
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
/**
 * Hide/Show storybook
 * @see docs https://github.com/storybookjs/react-native#hideshow-storybook
 */
let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;
