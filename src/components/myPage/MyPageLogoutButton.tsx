import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles } from '@rneui/themed';

import useAuth from '@hooks/useAuth';

export default function LogoutButton() {
  const { setLogout } = useAuth();
  const styles = useStyles();
  const TITLE = '로그아웃';

  return (
    <View>
      <Button
        title={TITLE}
        type="clear"
        titleStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => setLogout()}
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
