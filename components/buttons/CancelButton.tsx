import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { Button } from '@rneui/themed';

import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/Colors';

interface ButtonProps {
  title: string;
  onPressHandler: () => void;
  style?: StyleProp<TextStyle>;
}

// useNavigation();

function CancelButton({ title, onPressHandler, style }: ButtonProps) {
  return (
    <View style={style}>
      <Button
        title={title}
        onPress={onPressHandler}
        buttonStyle={[styles.cancelBtnStyle]}
      />
    </View>
  );
}

export default CancelButton;

const styles = StyleSheet.create({
  cancelBtnStyle: {
    minWidth: 150,
    borderRadius: 4,
    height: 48,
    backgroundColor: theme.grayscale?.[300],
    color: 'white',
  },
});

CancelButton.defaultProps = {
  style: styles.cancelBtnStyle,
};
