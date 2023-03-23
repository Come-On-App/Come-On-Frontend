import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles } from '@rneui/themed';

import useAuth from '@hooks/useAuth';
import useWebSocket from '@hooks/useWebSocket';

export default function LogoutButton() {
  const { setLogout } = useAuth();
  const { deactivate } = useWebSocket();
  const styles = useStyles();
  const TITLE = '로그아웃';
  const onPressLogout = () => {
    setLogout();
    deactivate();
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
