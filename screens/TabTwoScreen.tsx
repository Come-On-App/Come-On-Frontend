import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../components/Logo';
import Code from '../components/Code';

export default function TabTwoScreen() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.codeContainer}>
        <Code />
      </View>
    </SafeAreaView>
  );
}

const useStyles = makeStyles(() => ({
  screenContainer: {
    flex: 2,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));
