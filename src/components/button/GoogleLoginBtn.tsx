import { Pressable } from 'react-native';
import { ResponseType } from 'expo-auth-session';
import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@rneui/themed';

import {
  REACT_APP_EXPO_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID,
  REACT_APP_ANDROID_CLIENT_ID,
} from '@env';

import { setLogin } from '@api/auth/auth';
import useAuth from '@hooks/useAuth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { SocialLoginProps } from '../../types';
import GoogleLogo from '../../assets/images/logo/GoogleLogo';

WebBrowser.maybeCompleteAuthSession();

function GoogleLoginBtn() {
  const styles = useStyles();
  const { setLogin: setLoginAuth } = useAuth();
  const requestTokenUrl = '/api/v1/oauth/google';
  const [_request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: REACT_APP_EXPO_CLIENT_ID,
    iosClientId: REACT_APP_IOS_CLIENT_ID,
    androidClientId: REACT_APP_ANDROID_CLIENT_ID,
    responseType: ResponseType.IdToken,
  });
  const requestTokenGoogle = useCallback(
    async (idToken: string) => {
      const data: SocialLoginProps = {
        url: requestTokenUrl,
        data: { idToken },
      };

      setLogin(data).then(res => {
        setLoginAuth(res);
      });
    },
    [setLoginAuth],
  );

  useEffect(() => {
    (async () => {
      if (response && response.type === 'success') {
        const { params } = response;

        await requestTokenGoogle(params.id_token);
      }
    })();
  }, [response, requestTokenGoogle]);

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, styles.btnStyle]}
      onPress={() => {
        promptAsync();
      }}
    >
      <GoogleLogo />
    </Pressable>
  );
}

export default GoogleLoginBtn;

const useStyles = makeStyles(() => ({
  btnStyle: {
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.7,
  },
}));
