import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';
import { makeStyles } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '@components/Logo';
import InviteCode from '@components/InviteCode';

// 모임 입장 스크린
export default function TabTwoScreen() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screenContainer}
      >
        <ScreenTop />
        <ScreenMain />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    <Pressable style={styles.codeContainer} onPress={Keyboard.dismiss}>
      <InviteCode />
    </Pressable>
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
