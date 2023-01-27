/* eslint-disable react/style-prop-object */

import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './app/store';
import Navigation from './navigation';
import theme from './constants/themed';
import useCachedResources from './hooks/useCachedResources';

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
