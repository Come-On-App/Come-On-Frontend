import { View, Pressable } from 'react-native';
import React from 'react';
import _ from 'lodash';

import Font from '@shared/components/font/Font';
import { formatDateRange } from '@shared/utils/utils';
import Icon from '@shared/components/icon/Icon';
import TestId from '@shared/constants/testIds';
import useStyles from './style';
import { ISearchBar } from './type';

const INITIAL_VALUE = '모이기로 한 날짜를 검색해 보세요!';

export default function SearchBar({ dateRange }: ISearchBar) {
  const {
    cSearchBar,
    cInputSearchBar,
    cSearchBarkIcon,
    searchBarkIcon,
    searchBarkFont,
  } = useStyles();

  return (
    <View style={{ flex: 1 }}>
      <Pressable testID={TestId.post.button.searchBar}>
        <View style={cSearchBar}>
          <View style={cInputSearchBar}>
            <View style={cSearchBarkIcon}>
              <Icon
                name="date-range"
                color={searchBarkIcon.color}
                size={searchBarkIcon.size}
              />
            </View>
            <Font style={searchBarkFont}>
              {_.isEmpty(dateRange)
                ? INITIAL_VALUE
                : formatDateRange(dateRange)}
            </Font>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
