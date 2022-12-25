import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { Button } from '@rneui/themed';
import { RootStackScreenProps } from '../../types';
import { theme } from '../../constants/Colors';

interface ButtonProps {
  title: string;
  onPressHandler: () => void;
  style?: StyleProp<TextStyle>;
}

function ConfirmButton({ title, onPressHandler, style }: ButtonProps) {
  return (
    <View style={style}>
      <Button
        title={title}
        onPress={onPressHandler}
        buttonStyle={[styles.cancelBtnStyle, style]}
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
