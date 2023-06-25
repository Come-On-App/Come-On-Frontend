import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import TestId from '@shared/constants/testIds';
import Icon from '@shared/components/icon/Icon';
import useStyles from './style';

const DESCRIPTION = '새로운 장소를 추가해 보세요!';

export default function AddVenue() {
  const { container, font, icon } = useStyles();

  return (
    <View testID={TestId.post.button.addVenue} style={container}>
      <Icon name="place" size={icon.size} color={icon.color} />
      <Font style={font}>{DESCRIPTION}</Font>
    </View>
  );
}
