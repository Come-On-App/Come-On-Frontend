import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { Button } from '@rneui/themed';
import theme from '../../constants/themed';

interface ButtonProps {
  title: string;
  onPressHandler: () => void;
  width?: number;
  style?: StyleProp<TextStyle>;
  color?: { backgroundColor: string };
}

function CancelButton({
  title,
  onPressHandler,
  style,
  width,
  color,
}: ButtonProps) {
  const buttonColor = color || { backgroundColor: theme.grayscale?.[300] };

  return (
    <View style={style}>
      <Button
        title={title}
        onPress={onPressHandler}
        buttonStyle={[styles.cancelBtnStyle, { width }, buttonColor]}
      />
    </View>
  );
}

export default CancelButton;

const styles = StyleSheet.create({
  cancelBtnStyle: {
    borderRadius: 4,
    height: 48,
    backgroundColor: theme.grayscale?.[300],
    color: 'white',
  },
});

CancelButton.defaultProps = {
  style: styles.cancelBtnStyle,
};
