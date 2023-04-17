import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Logo from '../assets/images/logo/Logo';
import KakaoLoginBtn from '../components/button/KakaoLoginBtn';
import GoogleLoginBtn from '../components/button/GoogleLoginBtn';
import AppleLoginBtn from './login/Apple';

function LoginScreen() {
  const styles = useStyles();
  const platform = Platform.OS;
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <>
        <Toast />
        <Logo />
        <View style={styles.labels}>
          <Text style={styles.label}>소셜 로그인</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.buttons}>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <KakaoLoginBtn setLoading={setLoading} />
              {platform === 'ios' ? (
                <AppleLoginBtn setLoading={setLoading} />
              ) : null}
              <GoogleLoginBtn setLoading={setLoading} />
            </>
          )}
        </View>
      </>
    </View>
  );
}

function LoadingComponent() {
  const styles = useStyles();

  return <ActivityIndicator color={styles.color.color} size="large" />;
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
    top: Platform.OS === 'ios' ? -30 : 0,
    marginBottom: 30,
  },
  labels: { width: '100%', height: 30, alignItems: 'center' },
  color: {
    color: theme.colors.secondary,
  },
}));
