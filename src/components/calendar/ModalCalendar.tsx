import FlexButtons from '@components/button/FlexButtons';
import useMeeting from '@hooks/useMeeting';
import { View } from 'react-native';
import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { emptyString } from '@utils/fn';
import PeriodArrowCalendar from './PeriodArrowCalendar';

export default function ModalCalendar({
  toggleOverlay,
}: {
  toggleOverlay: () => void;
}) {
  const styles = useStyles();
  const [date, setDate] = useState({
    startDate: emptyString,
    endDate: emptyString,
  });
  const { resetMeetingData, setCalendarDate } = useMeeting();
  const cancelHandler = () => {
    resetMeetingData();
    toggleOverlay();
  };
  const confirmHandelr = () => {
    const data = { startDate: date.startDate, endDate: date.endDate };

    setCalendarDate(data);
    toggleOverlay();
  };

  return (
    <>
      <View style={styles.calendarContainer}>
        <PeriodArrowCalendar setDate={setDate} />
      </View>
      <FlexButtons
        style={styles.flexButtonStyle}
        cancelHandler={cancelHandler}
        onPressConfirm={confirmHandelr}
      />
    </>
  );
}

const useStyles = makeStyles(() => ({
  calendarContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  overlayStyle: {
    flex: 0.56,
    width: '80%',

    borderRadius: 10,
  },
  flexButtonStyle: {
    marginBottom: 12,
  },
}));
