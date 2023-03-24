import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Button } from '@rneui/themed';

import { makeStyles } from '@rneui/base';
import theme from '../../constants/themed';

interface ButtonProps {
  title: string;
  onPressHandler: () => void;
  style?: StyleProp<TextStyle>;
  width?: number;
}

function ConfirmButton({ title, onPressHandler, style, width }: ButtonProps) {
  const styles = useStyles();

  return (
    <View style={style}>
      <Button
        title={title}
        onPress={onPressHandler}
        buttonStyle={[style]}
        containerStyle={[styles.confirmBtnStyle, { width }]}
      />
    </View>
  );
}

export default ConfirmButton;

const useStyles = makeStyles({
  confirmBtnStyle: {
    borderRadius: 4,
    width: 202,
    height: 48,
    justifyContent: 'center',
    backgroundColor: theme.lightColors?.primary,
    color: 'white',
  },
});
