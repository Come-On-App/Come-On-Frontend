import 'expo-dev-client';
import * as encoding from 'text-encoding';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { focusManager, QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from '@rneui/themed';
import { AppStateStatus, Platform } from 'react-native';

import useOnlineManager from '@hooks/query/useOnlineManager';
import useAppState from '@hooks/query/useAppState';
import { store } from './src/app/store';
import Navigation from './src/navigation';
import { queryClient } from './src/api/queryClient';
import useCachedResources from './src/hooks/useCachedResources';
import theme from './src/constants/themed';

Object.assign(global, {
  TextEncoder: encoding.TextEncoder,
  TextDecoder: encoding.TextDecoder,
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources();

  useOnlineManager();
  useAppState(onAppStateChange);

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
