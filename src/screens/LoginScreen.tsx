import React, { useState, useEffect } from 'react';
import { makeStyles } from '@rneui/themed';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, Pressable } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import useAuth from '@hooks/useAuth';
import { useDispatch } from 'react-redux';
import { getTokenData, setTokensToDB, StoreKey } from '@api/token/token';
import { login as loginDispatch } from '@features/authSlice';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { LoginParamList, RootStackParamList } from '@type/navigation';
import Logo from '../components/Logo';
import KakaoLoginBtn from '../components/button/KakaoLoginBtn';

import AppleLogo from '../assets/images/logo/AppleLogo';
import GoogleLoginBtn from '../components/button/GoogleLoginBtn';

WebBrowser.maybeCompleteAuthSession();

function LoginScreen({
  route,
}: {
  route: RouteProp<RootStackParamList, 'LoginScreen'>;
}) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const [login, setLogin] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const accessTkn = await getTokenData(StoreKey.accessToken);
  //     const refreshTkn = await getTokenData(StoreKey.refreshToken);
  //     const data = { accessToken: accessTkn, refreshToken: refreshTkn };

  //     if (accessTkn !== null && refreshTkn !== null) {
  //       // TODO추후 토큰 암호화해서 저장
  //       dispatch(loginDispatch(data));
  //       setIsLogin(true);
  //       navigation.navigate('Root', { screen: 'TabOne' });
  //     } else {
  //       console.log(accessTkn, refreshTkn);

  //       setIsLogin(false);
  //     }
  //   })();
  // }, [dispatch, navigation, setIsLogin]);

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
