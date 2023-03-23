import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Button } from '@rneui/themed';

import theme from '../../constants/themed';

interface ButtonProps {
  title: string;
  onPressHandler: () => void;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

function ConfirmButton({
  title,
  onPressHandler,
  style,
  containerStyle,
}: ButtonProps) {
  return (
    <View style={style}>
      <Button
        title={title}
        onPress={onPressHandler}
        buttonStyle={[styles.cancelBtnStyle, style]}
        containerStyle={containerStyle}
      />
    </View>
  );
}

export default ConfirmButton;

const styles = StyleSheet.create({
  cancelBtnStyle: {
    borderRadius: 4,
    minWidth: 202,
    height: 48,
    backgroundColor: theme.lightColors?.primary,
    color: 'white',
  },
});

ConfirmButton.defaultProps = {
  style: styles.cancelBtnStyle,
};
