/* eslint-disable react/style-prop-object */

import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from '@rneui/themed';

import { store } from './src/app/store';
import Navigation from './src/navigation';
import { queryClient } from './src/api/queryClient';
import useCachedResources from './src/hooks/useCachedResources';
import theme from './src/constants/themed';

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
      <Toast />
    </>
  );
}
