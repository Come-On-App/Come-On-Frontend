import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RootNavigation from './modules/app/navigation/RootNavigation';

/**
 * 작업 목표
 * 0. 프로젝트 구조 구성 (https://www.reactnative.express/app/project_structure) [v]
 * 1. 네비게이터 구조화 [v]
 * 2. 네비게이터 테스트 작성 [v]
 * 3. 네비게이터 리팩토링 [x]
 * 4. 네비게이터 타입작성 [v]
 */

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RootNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
