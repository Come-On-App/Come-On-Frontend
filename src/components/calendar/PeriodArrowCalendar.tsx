import { CalendarPeriodTypeProps } from '@type/meeting.calendar';
import React, { useCallback, useState, useEffect } from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { makeStyles } from '@rneui/themed';
import CustomCalendarTheme, { DayTheme } from './CustomCalendarTheme';
import { getDatesRangeArray, setCalendarStyle } from './Calendar';

const DAYSTYLE = {
  selected: true,
  textColor: 'white',
  customContainerStyle: DayTheme.DayTheme?.dayStyle?.oneDaySelectedStyle,
};

function PeriodArrowCalendar({ setDate }: CalendarPeriodTypeProps) {
  const styles = useStyles();
  const [markedDate, setMarkedDate] = useState<MarkedDates>();
  const [day, setDay] = useState({ startDay: '', endDay: '' });
  const onPressDayHandlerPeriod = useCallback(
    (date: DateData) => {
      const { startDay, endDay } = day;
      const isEnd = !!endDay;
      const isStart = !!startDay;
      const selectedDay = date.dateString;
      const markedDates = new Map<string, object>();

      // 1. 단일 날짜만 선택됐을 경우
      if (!startDay) {
        markedDates.set(selectedDay, DAYSTYLE);
        setDay({ ...day, startDay: selectedDay });
        const oneDay = { startDate: selectedDay, endDate: selectedDay };

        if (setDate) setDate(oneDay);

        setMarkedDate(Object.fromEntries(markedDates.entries()));

        return;
      }

      // 2. start와 end가 있는데 시작날짜보다 작은 값을 선택했을 경우 => 초기화
      if (isStart && isEnd && startDay >= selectedDay) {
        setDay({ startDay: '', endDay: '' });
        setMarkedDate({});

        if (setDate)
          setDate({ startDate: '0000-00-00', endDate: '0000-00-00' });

        return;
      }

      // 3. start가 있을때 들어온 값이 start보다 큰 경우
      if (isStart && startDay < selectedDay) {
        const newDay = { ...day, endDay: selectedDay };
        const periodArray = getDatesRangeArray(startDay, selectedDay);
        const periodMap = setCalendarStyle(periodArray);

        setDay(newDay);
        setMarkedDate(Object.fromEntries(periodMap.entries()));
      }
    },
    [day, setDate],
  );

  useEffect(() => {
    if (setDate && day.startDay && day.endDay)
      setDate({ startDate: day.startDay, endDate: day.endDay });
  }, [day.endDay, day.startDay, setDate]);

  return (
    <Calendar
      calendarStyle={styles.calendarStyle}
      onDayPress={onPressDayHandlerPeriod}
      markedDates={markedDate || {}}
      theme={CustomCalendarTheme}
      markingType="period"
    />
  );
}

export default PeriodArrowCalendar;

export const MemorizedPeriodArrowCalendar = React.memo(PeriodArrowCalendar);
const useStyles = makeStyles(theme => ({
  calendarContainer: {
    width: '100%',
    height: '98%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingBottom: 20,
  },
  calendarStyle: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 30,
  },
  calendarTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  calendarTitleFont: {
    fontSize: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));
