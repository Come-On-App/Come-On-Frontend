import React from 'react';
import { makeStyles } from '@rneui/themed';
import { View } from 'react-native';

import { BoldFont } from '@components/Font';
import type { PlaceCardOrderProps } from '@type/component.placecard';

function PlaceCardOrder({ order }: PlaceCardOrderProps) {
  const style = useStyles();

  return (
    <View style={style.container}>
      <BoldFont style={style.index}>{order}</BoldFont>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.colors.primary,
    width: 26,
    height: 26,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  index: {
    color: theme.grayscale['0'],
    fontSize: theme.textStyles.body1.fontSize,
  },
}));

export default PlaceCardOrder;
