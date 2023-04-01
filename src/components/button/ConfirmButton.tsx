import React from 'react';
import { StyleProp, TextStyle, View, ActivityIndicator } from 'react-native';
import { Button } from '@rneui/themed';

import { makeStyles } from '@rneui/base';
import theme from '../../assets/themed';

interface ButtonProps {
  title: string;
  onPressHandler: () => void;
  style?: StyleProp<TextStyle>;
  loading?: boolean;
  width?: number;
}

function ConfirmButton({
  title,
  onPressHandler,
  style,
  width,
  loading,
}: ButtonProps) {
  const styles = useStyles();

  return (
    <View style={style}>
      {loading ? (
        <Button
          title={<ActivityIndicator color="white" />}
          buttonStyle={[style]}
          containerStyle={[styles.confirmBtnStyle, { width }]}
        />
      ) : (
        <Button
          title={title}
          onPress={onPressHandler}
          buttonStyle={[style]}
          containerStyle={[styles.confirmBtnStyle, { width }]}
        />
      )}
    </View>
  );
}

export default ConfirmButton;

const useStyles = makeStyles({
  confirmBtnStyle: {
    borderRadius: 4,

    height: 48,
    justifyContent: 'center',
    backgroundColor: theme.lightColors?.primary,
    color: 'white',
  },
});
