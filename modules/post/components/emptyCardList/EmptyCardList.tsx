import { View } from 'react-native';
import React from 'react';

import RobotLogo from '@shared/components/logo/RobotLogo';
import useStyles from './style';
import EmptyDescription from './description/EmptyDescription';
import CreationButton from './button/CreationButton';
import { SEARCH_ADN_CREATE_HEIGHT } from '../search/searchAndCreate/style';

export default function EmptyCardList() {
  const { container, iconContainer } = useStyles();

  return (
    <View style={[container, { paddingBottom: SEARCH_ADN_CREATE_HEIGHT }]}>
      <View style={iconContainer}>
        <RobotLogo />
      </View>
      <CreationButton />
      <EmptyDescription />
    </View>
  );
}
