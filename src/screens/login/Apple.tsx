import React from 'react';
import {
  AppleAuthenticationCredential,
  AppleAuthenticationFullName,
  AppleAuthenticationScope,
  AppleAuthenticationSignInOptions,
  signInAsync,
} from 'expo-apple-authentication';
import { log } from '@utils/log';
import { Pressable } from 'react-native';
import AppleLogo from '@assets/images/logo/AppleLogo';
import { makeStyles } from '@rneui/themed';
import { promiseFlow } from '@utils/promise';
import { requestPostApple } from '@api/user/user';
import { PostApplePayload, PostAppleResponse } from '@type/api.user';

type AppleLoginErrorCodes =
  | 'ERR_INVALID_OPERATION'
  | 'ERR_INVALID_RESPONSE'
  | 'ERR_INVALID_SCOPE'
  | 'ERR_REQUEST_CANCELED'
  | 'ERR_REQUEST_FAILED'
  | 'ERR_REQUEST_NOT_HANDLED'
  | 'ERR_REQUEST_NOT_INTERACTIVE'
  | 'ERR_REQUEST_UNKNOWN';

interface AppleError {
  code: AppleLoginErrorCodes;
}

function createName(fullName: AppleAuthenticationFullName | null) {
  if (!fullName || !fullName.familyName || !fullName.givenName) return null;

  return `${fullName.familyName}${fullName.givenName}`;
}

function createPaylaod(credential: AppleAuthenticationCredential) {
  if (!credential.identityToken) {
    throw new Error('identityToken does not exist');
  }

  const payload: PostApplePayload = {
    identityToken: credential.identityToken,
    user: credential.user,
    email: credential.email,
    name: createName(credential.fullName),
  };

  return payload;
}

function onPressHandlr() {
  promiseFlow<AppleAuthenticationSignInOptions, PostAppleResponse>(
    {
      requestedScopes: [
        AppleAuthenticationScope.FULL_NAME,
        AppleAuthenticationScope.EMAIL,
      ],
    },
    [signInAsync, createPaylaod, requestPostApple],
    {
      onSuccess: response => {
        // 로그인 성공
        log('response', response);
      },
      onError: (e: AppleError) => {
        if (e.code === 'ERR_REQUEST_CANCELED') {
          // handle that the user canceled the sign-in flow
          log('ERR_REQUEST_CANCELED', e);
        } else {
          // handle other errors
          log('error outer', e);
        }
      },
    },
  );
}

function AppleLoginBtn() {
  const styles = useStyles();

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, styles.btnStyle]}
      onPress={onPressHandlr}
    >
      <AppleLogo />
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

export default AppleLoginBtn;
