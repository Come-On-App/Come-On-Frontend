import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../components/Logo';
import InviteCode from '../components/InviteCode';

function ScreenTop() {
  const styles = useStyles();

  return (
    <View style={styles.logoContainer}>
      <Logo />
    </View>
  );
}

function ScreenMain() {
  const styles = useStyles();

  return (
    <View style={styles.codeContainer}>
      <InviteCode />
    </View>
  );
}

export default function TabTwoScreen() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScreenTop />
      <ScreenMain />
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
