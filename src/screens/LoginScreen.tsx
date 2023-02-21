import React, { useState, useEffect } from 'react';
import { makeStyles } from '@rneui/themed';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, Pressable } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { RootStackScreenProps } from '@type/navigation';
import Logo from '../components/Logo';
import KakaoLoginBtn from '../components/buttons/KakaoLoginBtn';

import AppleLogo from '../assets/images/logo/AppleLogo';
import GoogleLoginBtn from '../components/buttons/GoogleLoginBtn';

WebBrowser.maybeCompleteAuthSession();

function LoginScreen({ navigation }: RootStackScreenProps<'LoginScreen'>) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <>
        <Toast />
        <Logo />
        <View style={styles.labels}>
          <Text style={styles.label}>소셜 로그인</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.buttons}>
          <KakaoLoginBtn />
          <Pressable
            style={({ pressed }) => [
              pressed && styles.pressed,
              styles.btnStyle,
            ]}
          >
            <AppleLogo />
          </Pressable>
          <GoogleLoginBtn />
        </View>
      </>
    </View>
  );
}

export default LoginScreen;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tempImageStyle: {
    width: 50,
    height: 50,
    marginTop: 15,
  },
  line: {
    width: '90%',
    height: 1.5,
    alignItems: 'center',
    position: 'relative',
    top: -50,
    backgroundColor: theme.grayscale[300],
  },
  label: {
    position: 'relative',
    top: -50,
    fontSize: 14,
    marginBottom: 3,
    color: theme.grayscale[400],
  },
  btnStyle: {
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttons: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    position: 'relative',
    top: -30,
    marginBottom: 30,
  },
  labels: { width: '100%', height: 30, alignItems: 'center' },
}));
