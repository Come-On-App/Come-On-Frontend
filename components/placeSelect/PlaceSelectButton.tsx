import React from 'react';
import { makeStyles } from '@rneui/themed';

import Button from '../buttons/Buttons';
import type { PlaceSelectButtonProps } from '../../types';

export default function PlaceSelectButton({ onPress }: PlaceSelectButtonProps) {
  const styles = useStyles();

  return (
    <Button
      bold
      text="장소선택"
      onPress={onPress}
      textStyle={styles.buttonText}
    />
  );
}

const useStyles = makeStyles(theme => ({
  buttonText: {
    fontSize: theme.textStyles.body1.fontSize,
  },
}));
