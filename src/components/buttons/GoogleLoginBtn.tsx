import { Pressable } from 'react-native';
import { ResponseType } from 'expo-auth-session';
import React, { useCallback, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { makeStyles } from '@rneui/themed';

import {
  REACT_APP_EXPO_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID,
  REACT_APP_ANDROID_CLIENT_ID,
  REACT_APP_WEB_CLIENT_ID,
} from '@env';

import { setLogin } from '@api/auth/auth';
import useAuth from '../../hooks/useAuth';
import { SocialLoginProps } from '../../types';
import GoogleLogo from '../../assets/images/logo/GoogleLogo';

function GoogleLoginBtn() {
  const styles = useStyles();
  const { isValidUser } = useAuth();
  const requestTokenUrl = '/api/v1/oauth/google';
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: REACT_APP_EXPO_CLIENT_ID,
    iosClientId: REACT_APP_IOS_CLIENT_ID,
    androidClientId: REACT_APP_ANDROID_CLIENT_ID,
    webClientId: REACT_APP_WEB_CLIENT_ID,
    responseType: ResponseType.IdToken,
  });
  const requestTokenGoogle = useCallback(
    async (idToken: string) => {
      const data: SocialLoginProps = {
        url: requestTokenUrl,
        data: { idToken },
      };

      setLogin(data).then(res => {
        if (res.status === 200) isValidUser();
      });
    },
    [isValidUser],
  );

  useEffect(() => {
    if (response && response.type === 'success') {
      const { params } = response;

      requestTokenGoogle(params.id_token);
    }
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
