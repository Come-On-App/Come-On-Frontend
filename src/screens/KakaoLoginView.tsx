import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { REACT_APP_REST_API_KEY, REACT_APP_REDIRECT_URI } from '@env';
import { setLogin } from '@api/auth/auth';
import useAuth from '@hooks/useAuth';
import { SocialLoginProps } from '@type/index';

export default function KakaoLoginWebView() {
  const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("check")`;
  const { isValidUser } = useAuth();

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

    await setLogin(data).then(res => {
      if (res.status === 200) isValidUser();
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, width: '100%' }}>
      <WebView
        originWhitelist={[`*`]}
        scalesPageToFit
        style={{ marginTop: 30 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code&`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={event => {
          if (!event.nativeEvent.loading) LogInProgress(event.nativeEvent.url);
        }}
      />
    </SafeAreaView>
  );
}
