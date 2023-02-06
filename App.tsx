/* eslint-disable react/style-prop-object */

import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './src/navigation';
import theme from './src/constants/themed';
import useCachedResources from './src/hooks/useCachedResources';
import { store } from './src/app/store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const queryClient = new QueryClient();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Provider store={store}>
              <Navigation />
            </Provider>
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
