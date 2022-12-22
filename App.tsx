/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <Text style={styles.text}>Hi fontTest 1234 가나다</Text>
      <Text style={styles.text2}>Hi fontTest 1234 가나다</Text>
      <Text style={styles.text3}>Hi fontTest 1234 가나다</Text>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { fontFamily: 'pretendard', fontSize: 25 },
  text2: { fontSize: 25 },
  text3: { fontFamily: 'blackHanSans', fontSize: 25 },
});
