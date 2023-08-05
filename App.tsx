/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import QueryClientProvider from '@shared/provider/QueryClientProvider';
import FontThemeProvider from '@shared/provider/FontProvider';
import ReduxProvider from '@app/redux/Provider';
import RootNavigation from '@app/navigation/RootNavigation';

export function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <QueryClientProvider>
        <ReduxProvider>
          <FontThemeProvider>
            <RootNavigation />
          </FontThemeProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
let AppEntryPoint = App;

/**
 * Hide/Show storybook
 * @see docs https://github.com/storybookjs/react-native#hideshow-storybook
 */

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;
