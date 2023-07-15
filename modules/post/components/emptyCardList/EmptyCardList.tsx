import { View } from 'react-native';
import React from 'react';

import useStyles from './style';
import EmptyDescription from './description/EmptyDescription';
import RobotIcon from './logo/RobotIcon';
import CreationButton from './button/CreationButton';
import { SEARCH_ADN_CREATE_HEIGHT } from '../search/searchAndCreate/style';

export default function EmptyCardList() {
  const { container, iconContainer } = useStyles();

  return (
    <View style={[container, { paddingBottom: SEARCH_ADN_CREATE_HEIGHT }]}>
      <View style={iconContainer}>
        <RobotIcon />
      </View>
      <CreationButton />
      <EmptyDescription />
    </View>
  );
}
