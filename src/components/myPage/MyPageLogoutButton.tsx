import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles } from '@rneui/themed';

import useAuth from '@hooks/useAuth';
import useWebSocket from '@hooks/useWebSocket';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { COMEON_API_URL } from '@env';

WebBrowser.maybeCompleteAuthSession({ skipRedirectCheck: true });
export default function LogoutButton() {
  const { setLogout, authSelector } = useAuth();
  const { deactivate } = useWebSocket();
  const { accessToken } = authSelector;
  const styles = useStyles();
  const callbackUrl = Linking.createURL('/logout/callback');
  const TITLE = '로그아웃';
  const baseUrl = `${COMEON_API_URL}/logout?atk=${accessToken?.token}&redirect_uri=${callbackUrl}`;
  const onPressLogout = async () => {
    const result = await WebBrowser.openAuthSessionAsync(baseUrl, callbackUrl);

    if (result.type === 'success') {
      setLogout();
      deactivate();
    }
  };

  return (
    <View>
      <Button
        title={TITLE}
        type="clear"
        titleStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={onPressLogout}
      />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  button: {
    fontFamily: 'pretendard-regular',
    fontSize: 12,
    color: theme.grayscale['500'],
  },
  buttonContainer: {
    marginRight: 8,
  },
}));
