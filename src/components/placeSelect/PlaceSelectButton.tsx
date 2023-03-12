import React from 'react';
import { makeStyles } from '@rneui/themed';

import { View } from 'react-native';
import type { PlaceSelectButtonProps } from '@type/component.placeselect';
import Button from '@components/button/Buttons';

export default function PlaceSelectButton({
  text,
  onPress,
  isDisabled,
  buttonStyle,
}: PlaceSelectButtonProps) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Button
        bold
        buttonStyle={buttonStyle}
        text={text}
        onPress={onPress}
        disabled={isDisabled}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    marginVertical: 5,
  },
  buttonText: {
    fontSize: theme.textStyles.body1.fontSize,
  },
}));
