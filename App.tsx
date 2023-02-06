import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from './navigation';
import theme from './constants/themed';
import useCachedResources from './hooks/useCachedResources';
import store from './store';

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
