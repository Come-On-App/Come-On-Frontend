import React from 'react';
import { makeStyles } from '@rneui/themed';

import Button from '../buttons/Buttons';
import type { PlaceSelectButtonProps } from '../../types';
import usePlace from '../../hooks/usePlace';

export default function PlaceSelectButton({ onPress }: PlaceSelectButtonProps) {
  const styles = useStyles();
  const { placeState } = usePlace();
  const isDisabled = !placeState.marker;

  return (
    <Button
      bold
      text="장소선택"
      onPress={onPress}
      disabled={isDisabled}
      textStyle={styles.buttonText}
    />
  );
}

const useStyles = makeStyles(theme => ({
  buttonText: {
    fontSize: theme.textStyles.body1.fontSize,
  },
}));
