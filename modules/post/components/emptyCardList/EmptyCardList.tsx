import { View } from 'react-native';
import React from 'react';

import RobotLogo from '@shared/components/logo/RobotLogo';
import useStyles from './style';
import EmptyDescription from './description/EmptyDescription';
import CreationButton from './button/CreationButton';
import { SEARCH_ADN_CREATE_HEIGHT } from '../search/searchAndCreate/style';
import DateRangeResetButton from './button/DateRangeResetButton';
import ResetRangeDescription from './description/ResetRangeDescription';
import { IemptyCardList } from './type';

export default function EmptyCardList({ type = 'empty' }: IemptyCardList) {
  const { container, iconContainer } = useStyles();

  return (
    <View style={[container, { paddingBottom: SEARCH_ADN_CREATE_HEIGHT }]}>
      <View style={iconContainer}>
        <RobotLogo />
      </View>
      {type === 'empty' ? <CreationButton /> : <DateRangeResetButton />}
      {type === 'empty' ? <EmptyDescription /> : <ResetRangeDescription />}
    </View>
  );
}
