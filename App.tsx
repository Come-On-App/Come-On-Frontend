/* eslint-disable react/style-prop-object */

import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import { QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './src/app/store';
import Navigation from './src/navigation';
import theme from './src/constants/themed';
import { queryClient } from './src/api/queryClient';
import useCachedResources from './src/hooks/useCachedResources';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SafeAreaProvider>
              <Navigation />
            </SafeAreaProvider>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
