import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles } from '@rneui/themed';

export default function LogoutButton() {
  const styles = useStyles();
  const TITLE = '로그아웃';

  return (
    <View>
      <Button
        title={TITLE}
        type="clear"
        titleStyle={styles.button}
        containerStyle={styles.buttonContainer}
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
