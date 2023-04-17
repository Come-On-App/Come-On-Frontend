import React, { useCallback } from 'react';
import { makeStyles } from '@rneui/themed';
import { Pressable } from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import useAuth from '@hooks/useAuth';
import { SocialLoginProps } from '@type/index';
import { setLogin } from '@api/auth/auth';
import { REACT_APP_REST_API_KEY, REACT_APP_REDIRECT_URI } from '@env';
import { LoginButtonProps } from '@type/component.button';
import { errorAlert } from '@utils/alert';
import KakaoLogo from '../../assets/images/logo/KakaoLogo';

export default function KakaoLoginBtn({ setLoading }: LoginButtonProps) {
  const styles = useStyles();
  const { setLogin: login } = useAuth();
  const baseUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code&`;
  const openBrowserAsync = async () => {
    const callbackUrl = Linking.createURL('/oauth/callback/kakao?code=');
    const response = await WebBrowser.openAuthSessionAsync(
      baseUrl,
      callbackUrl,
      { showInRecents: true },
    );

    setLoading(true);

    if (response.type === 'success') {
      const exp = 'code=';
      const condition = response.url.indexOf(exp);
      const resquestCode = response.url.substring(condition + exp.length);

      await requestToken(resquestCode);
    } else {
      setLoading(false);
    }
  };
  const requestToken = async (requestCode: string) => {
    const ERRORTEXT = '문제가 발생했습니다.';
    const requestTokenUrl = '/api/v1/oauth/kakao';
    const data: SocialLoginProps = {
      url: requestTokenUrl,
      data: { code: requestCode },
    };

    setLogin(data)
      .then(res => {
        login(res);
        setLoading(false);
      })
      .catch(() => {
        errorAlert(ERRORTEXT);
      });
  };

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, styles.btnStyle]}
      onPress={openBrowserAsync}
    >
      <KakaoLogo />
    </Pressable>
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
