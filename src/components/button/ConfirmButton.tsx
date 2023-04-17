import React from 'react';
import { StyleProp, TextStyle, View, ActivityIndicator } from 'react-native';
import { Button } from '@rneui/themed';
import { makeStyles } from '@rneui/base';
import theme from '../../constants/themed';

interface ButtonProps {
  title: string;
  onPressHandler: () => void;
  style?: StyleProp<TextStyle>;
  loading?: boolean;
  width?: number;
  color?: { backgroundColor: string };
}

function ConfirmButton({
  title,
  onPressHandler,
  style,
  width,
  loading,
  color,
}: ButtonProps) {
  const styles = useStyles();
  const buttonColor = color || { backgroundColor: theme.lightColors?.primary };

  return (
    <View style={style}>
      {loading ? (
        <Button
          title={<ActivityIndicator color="white" />}
          buttonStyle={[style]}
          containerStyle={[styles.confirmBtnStyle, { width }, buttonColor]}
        />
      ) : (
        <Button
          title={title}
          onPress={onPressHandler}
          buttonStyle={[style, buttonColor]}
          containerStyle={[styles.confirmBtnStyle, { width }, buttonColor]}
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
