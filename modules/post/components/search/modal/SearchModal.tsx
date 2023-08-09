import { View } from 'react-native';
import React, { memo, useCallback, useState } from 'react';

import Modal from '@shared/components/modal/Modal';
import TestId from '@shared/constants/testIds';
import Calendar from '@shared/components/calendar/Calendar';
import VoteGuideRobot from '@post/components/voteDateMessage/VoteDateMessage';
import useSearchManagement from '@post/hooks/useSearchManagement';
import { DateRange } from '@post/features/post/type';
import { DateInfo } from '@shared/components/calendar/type';
import { initialSearchState } from '@post/features/search/searchSlice';
import useStyles from './style';
import { IcalendarModal } from './type';

function CalendarModal({ isOpen, dispatchModalState }: IcalendarModal) {
  const { modalContainer, voteGuideRobotContainer } = useStyles();
  const [localDateRange, setLocalDateRange] = useState<DateRange>(
    initialSearchState.dateRange,
  );
  const onDayPressHandler = useCallback(
    (startingDay: DateInfo, endingDay: DateInfo) => {
      setLocalDateRange({ startingDay, endingDay });
    },
    [],
  );
  const {
    searchState: { dateRange },
    dispatchSearchRange,
  } = useSearchManagement();

  return (
    <Modal
      testID={TestId.post.modal.calender}
      isVisible={isOpen}
      onBackdropPress={() => {
        dispatchModalState(false);
        dispatchSearchRange(
          localDateRange.startingDay,
          localDateRange.endingDay,
        );
      }}
      modalStyle={modalContainer}
    >
      <Calendar
        onDayPress={onDayPressHandler}
        loadPreviousDate={() => dateRange}
        current={dateRange.startingDay?.dateString}
      />
      <View style={voteGuideRobotContainer}>
        <VoteGuideRobot dateRange={localDateRange} type="search" />
      </View>
    </Modal>
  );
}

export default memo(CalendarModal);
