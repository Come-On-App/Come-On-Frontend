import { View } from 'react-native';
import React, { useState } from 'react';
import { isNull } from 'lodash';

import { getFormattedDateRange } from '@shared/utils';
import TestId from '@shared/constants/testIds';
import useSearchManagement from '@post/hooks/useSearchManagement';
import PressableInput from '@shared/components/input/PressableInput';
import { fullScreenContainer } from '@shared/constants/style';
import useStyles from './style';
import CalendarModal from '../modal/SearchModal';

const INITIAL_VALUE = '모이기로 한 날짜를 검색해 보세요!';

export default function SearchBar() {
  const [showModal, setModalState] = useState(false);
  const { searchBarkIcon } = useStyles();
  const {
    searchState: { dateRange },
  } = useSearchManagement();

  return (
    <View style={fullScreenContainer}>
      <PressableInput
        icon={{
          name: 'date-range',
          color: searchBarkIcon.color,
        }}
        text={
          isNull(dateRange.startingDay)
            ? INITIAL_VALUE
            : getFormattedDateRange(dateRange)
        }
        testID={TestId.post.button.searchBar}
        onPress={() => setModalState(true)}
      />
      <CalendarModal isOpen={showModal} dispatchModalState={setModalState} />
    </View>
  );
}
