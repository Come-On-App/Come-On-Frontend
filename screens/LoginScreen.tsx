import axios from 'axios';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import { makeStyles } from '@rneui/themed';
import { View, Text, Pressable, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {
  REACT_APP_REST_API_KEY,
  REACT_APP_REDIRECT_URI,
  REACT_APP_EXPO_CLIENT_ID,
  REACT_APP_ANDROID_CLIENT_ID,
  REACT_APP_WEB_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID,
} from '@env';
import Logo from '../components/Logo';
import useAuth from '../hooks/useAuth';
import AppleLogo from '../assets/images/logo/AppleLogo';
import KakaoLogo from '../assets/images/logo/KakaoLogo';
import GoogleLogo from '../assets/images/logo/GoogleLogo';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("check")`;

WebBrowser.maybeCompleteAuthSession();

function GoogleLoginHandler() {
  const { setLogin } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: REACT_APP_EXPO_CLIENT_ID,
    iosClientId: REACT_APP_IOS_CLIENT_ID,
    androidClientId: REACT_APP_ANDROID_CLIENT_ID,
    webClientId: REACT_APP_WEB_CLIENT_ID,
    responseType: ResponseType.IdToken,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { params } = response;

      console.log(response);

      setLogin(JSON.stringify(params));
    }
  }, [response, setLogin]);

  return (
    <Pressable onPress={() => promptAsync()}>
      <GoogleLogo />
    </Pressable>
  );
}

function TestWebView() {
  const { setLogin } = useAuth();

  function LogInProgress(data: string) {
    const exp = 'code=';
    const condition = data.indexOf(exp);

    if (condition !== -1) {
      const requestCode = data.substring(condition + exp.length);

      // 토큰값 받기
      requestToken(requestCode);
    }
  }

  const requestToken = async (requestCode: string) => {
    const requestTokenUrl = 'http://211.204.19.184:8088/api/v1/oauth/kakao';

    await axios({
      method: 'post',
      url: requestTokenUrl,
      data: {
        code: requestCode,
      },
    })
      .then(async response => {
        const { data } = response;

        setLogin(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, width: '100%' }}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit
        style={{ marginTop: 30 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          LogInProgress(event.nativeEvent.url);
        }}
      />
      <View />
    </SafeAreaView>
  );
}

function LoginScreen() {
  const styles = useStyles();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {visible ? (
        <TestWebView />
      ) : (
        <>
          <Logo />
          <View
            style={{
              width: '100%',
              height: 30,
              alignItems: 'center',
            }}
          >
            <Text style={styles.label}>소셜 로그인</Text>
            <View style={styles.line} />
          </View>
          <View
            style={{
              width: '100%',
              height: '30%',
              alignItems: 'center',
              position: 'relative',
              top: -30,
              marginBottom: 30,
            }}
          >
            {/** 추후 Pressable 스타일링 추가해서 공통컴포넌트, apple/android에 따른 구분할것 */}
            <Pressable onPress={() => setVisible(!visible)}>
              <View style={styles.kakaoLogoStyle}>
                <KakaoLogo />
              </View>
            </Pressable>

            <View style={styles.appleLogoStyle}>
              <AppleLogo />
            </View>
            <View style={styles.googleLogoStyle}>
              <GoogleLoginHandler />
            </View>
          </View>
        </>
      )}
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
  kakaoLogoStyle: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#FEE500',
    borderRadius: 12,
    margin: 5,
  },
  appleLogoStyle: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#000000',
    margin: 5,
    borderRadius: 12,
  },
  googleLogoStyle: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#ffffff',
    margin: 5,
    borderRadius: 12,
  },
  appleText: {
    color: 'white',
  },
  googleText: {
    color: 'white',
  },
  kakaoText: {
    color: 'white',
  },
}));
