import React, { Dispatch, SetStateAction } from 'react';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, View } from 'react-native';
import { REACT_APP_REST_API_KEY, REACT_APP_REDIRECT_URI } from '@env';
import { makeStyles } from '@rneui/themed';
import apis from '../../api';
import useAuth from '../../hooks/useAuth';
import { SocialLoginProps } from '../../types';
import KakaoLogo from '../../assets/images/logo/KakaoLogo';

type BtnProps = {
  setVisible: React.Dispatch<SetStateAction<boolean>>;
};

export default function KakaoLoginBtn({ setVisible }: BtnProps) {
  const styles = useStyles();

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, styles.btnStyle]}
      onPress={() => setVisible(true)}
    >
      <KakaoLogo />
    </Pressable>
  );
}

export function KakaoLoginWebView() {
  const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("check")`;
  const { setTokens } = useAuth();

  function LogInProgress(data: string) {
    const exp = 'code=';
    const condition = data.indexOf(exp);

    if (condition !== -1) {
      const requestCode = data.substring(condition + exp.length);

      requestToken(requestCode);
    }
  }

  const requestToken = async (requestCode: string) => {
    const requestTokenUrl = '/api/v1/oauth/kakao';
    const data: SocialLoginProps = {
      url: requestTokenUrl,
      data: { code: requestCode },
    };

    await apis
      .setLogin(data)
      .catch(err => {
        console.log(err);

        return null;
      })
      .then(response => {
        if (response) setTokens(response!.data);
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

const useStyles = makeStyles(() => ({
  btnStyle: {
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.7,
  },
}));
