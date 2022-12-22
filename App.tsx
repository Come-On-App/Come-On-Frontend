/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

SplashScreen.preventAutoHideAsync();
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    pretendard: require('./assets/fonts/Pretendard-Medium.ttf'),
    blackHanSans: require('./assets/fonts/BlackHanSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Text style={styles.text}>Hi fontTest 1234 가나다</Text>
        <Text style={styles.text2}>Hi fontTest 1234 가나다</Text>
        <Text style={styles.text3}>Hi fontTest 1234 가나다</Text>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { fontFamily: 'pretendard', fontSize: 25 },
  text2: { fontSize: 25 },
  text3: { fontFamily: 'blackHanSans', fontSize: 25 },
});
