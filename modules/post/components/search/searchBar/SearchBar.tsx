import { View } from 'react-native';
import React from 'react';
import _ from 'lodash';

import { formatDateRange } from '@shared/utils';
import TestId from '@shared/constants/testIds';
import PressableInput from '@shared/components/input/PressableInput';
import useStyles from './style';
import { ISearchBar } from './type';

const INITIAL_VALUE = '모이기로 한 날짜를 검색해 보세요!';

export default function SearchBar({ dateRange }: ISearchBar) {
  const { searchBarkIcon } = useStyles();

  return (
    <View style={{ flex: 1 }}>
      <PressableInput
        icon={{
          name: 'date-range',
          color: searchBarkIcon.color,
        }}
        text={_.isEmpty(dateRange) ? INITIAL_VALUE : formatDateRange(dateRange)}
        testID={TestId.post.button.searchBar}
      />
    </View>
  );
}
