/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/no-var-requires */
import './globalConfig';
import 'expo-dev-client';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import QueryClientProvider from '@shared/provider/QueryClientProvider';
import FontThemeProvider from '@shared/provider/FontProvider';
import ReduxProvider from '@app/redux/Provider';
import RootNavigation from '@app/navigation/RootNavigation';
import isStorybookEnabled from '@shared/utils/isStorybookEnabled';
import { fullScreenContainer } from '@shared/constants/style';
import { toastConfig } from '@shared/components/toastMessage/Config';

export function App() {
  return (
    <View style={fullScreenContainer}>
      <StatusBar style="dark" animated />
      <QueryClientProvider>
        <ReduxProvider>
          <FontThemeProvider>
            <RootNavigation />
          </FontThemeProvider>
        </ReduxProvider>
      </QueryClientProvider>
      <Toast
        visibilityTime={6000}
        onPress={() => Toast.hide()}
        config={toastConfig}
      />
    </View>
  );
}

let AppEntryPoint = App;

/**
 * Hide/Show storybook
 * @see docs https://github.com/storybookjs/react-native#hideshow-storybook
 */

if (isStorybookEnabled()) {
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;
