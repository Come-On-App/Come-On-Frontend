import { View } from 'react-native';
import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import TestId from '@shared/constants/testIds';
import useStyles from './style';

export default function Map() {
  const { cMap, map } = useStyles();

  return (
    <View testID={TestId.post.map} style={cMap}>
      <MapView showsUserLocation provider={PROVIDER_GOOGLE} style={map} />
    </View>
  );
}
