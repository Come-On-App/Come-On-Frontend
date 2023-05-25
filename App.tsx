import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyPage from '@account/screens/MyPage';

/**
 * 작업 목표
 * 0. 프로젝트 구조 구성 (https://www.reactnative.express/app/project_structure) [v]
 * 1. 네비게이터 구조화 [x]
 * 2. 네비게이터 테스트 작성 [x]
 * 3. 네비게이터 리팩토링 [x]
 */

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <MyPage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
