import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import Navigation from './navigation';
import theme from './constants/themed';
import useCachedResources from './hooks/useCachedResources';
import store from './store';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </SafeAreaProvider>
      </ThemeProvider>
    </>
  );
}
