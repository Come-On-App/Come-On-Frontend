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
import KakaoLogo from '../../assets/images/logo/KakaoLogo';

export default function KakaoLoginBtn({ setLoading }: LoginButtonProps) {
  const styles = useStyles();
  const { setLogin: login } = useAuth();
  const requestToken = useCallback(
    async (requestCode: string) => {
      const requestTokenUrl = '/api/v1/oauth/kakao';
      const data: SocialLoginProps = {
        url: requestTokenUrl,
        data: { code: requestCode },
      };

      setLogin(data).then(res => {
        login(res);
      });
    },
    [login],
  );
  const baseUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code&`;
  const openBrowserAsync = useCallback(async () => {
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
    }
  }, [baseUrl, requestToken, setLoading]);

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
