import { View } from 'react-native';
import React, { memo } from 'react';

import Modal from '@shared/components/modal/Modal';
import TestId from '@shared/constants/testIds';
import Calendar from '@shared/components/calendar/Calendar';
import VoteGuideRobot from '@post/components/voteDateMessage/VoteDateMessage';
import useSearchManagement from '@post/hooks/useSearchManagement';
import useStyles from './style';
import { IcalendarModal } from './type';

function CalendarModal({ isOpen, dispatch }: IcalendarModal) {
  const { modalContainer, voteGuideRobotContainer } = useStyles();
  const {
    searchState: { dateRange },
    dispatchSearchRange,
  } = useSearchManagement();

  return (
    <Modal
      testID={TestId.post.modal.calender}
      isVisible={isOpen}
      onBackdropPress={() => dispatch(false)}
      modalStyle={modalContainer}
    >
      <Calendar
        onDayPress={dispatchSearchRange}
        loadPreviousDate={() => dateRange}
        current={dateRange.startingDay?.dateString}
      />
      <View style={voteGuideRobotContainer}>
        <VoteGuideRobot dateRange={dateRange} type="search" />
      </View>
    </Modal>
  );
}

export default memo(CalendarModal);
