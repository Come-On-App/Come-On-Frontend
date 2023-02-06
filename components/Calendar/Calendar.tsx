/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@rneui/themed';
import { CalendarList, DateData } from 'react-native-calendars';
import { View } from 'react-native';
import { MarkedDates } from 'react-native-calendars/src/types';

import Font from '../Font';
import LocaleConfig from './LocaleConfig';
import CustomCalendarTheme, { DayTheme } from './CustomCalendarTheme';
import {
  CalendarProps,
  CalendarTypeProps,
  MeetingDate,
  MeetingUser,
} from '../../types';

const STARTSTYLE = {
  selected: true,
  startingDay: true,
  color: DayTheme.DayTheme?.colors?.dayStartColor,
  customContainerStyle: DayTheme.DayTheme?.startDayStyle?.container,
  customTextStyle: DayTheme.DayTheme?.startDayStyle?.textColor,
};
const ENDSTYLE = {
  selected: true,
  endingDay: true,
  color: DayTheme.DayTheme?.colors?.dayEndColor,
  customContainerStyle: DayTheme.DayTheme?.endDayStyle?.container,
  customTextStyle: DayTheme.DayTheme?.endDayStyle?.textColor,
};
const PERIODSTYLE = {
  selected: true,
  customContainerStyle: DayTheme.DayTheme?.dayStyle?.container,
  color: DayTheme.DayTheme?.colors?.dayFilteredColor,
};
const DAYSTYLE = {
  selected: true,
  textColor: 'white',
  customContainerStyle: DayTheme.DayTheme?.dayStyle?.oneDaySelectedStyle,
};
/** 로직에 사용되는 함수들 */
const returnMonthDiff = (startDate: Date, endDate: Date) => {
  const msecDiff = endDate.getTime() - startDate.getTime();
  const monthDiff = msecDiff / (24 * 60 * 60 * 1000) / 12;

  return monthDiff;
};
const renderMonth = (startDate: string, endDate: string) => {
  const startDay = new Date(startDate);
  const endDay = new Date(endDate);
  const dayDiff = Math.floor(returnMonthDiff(startDay, endDay));

  return dayDiff;
};
const renderSelectedDate = (
  dates: MeetingDate[],
  meetingUsers: MeetingUser[],
) => {
  const markedDates = new Map<string, object>();
  const userCount = meetingUsers.length;

  dates.forEach(item => {
    markedDates.set(item.date, {
      customStyles: {
        container: {
          borderRadius: 0,
          backgroundColor: `rgba(51,127,254, ${item.userCount / userCount})`,
        },
        text: {
          color: 'white',
        },
      },
    });
  });

  const result = Object.fromEntries(markedDates.entries());

  return result;
};
const getDatesRangeArray = (start: string, end: string) => {
  const arr = [];

  for (
    let dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    const date = new Date(dt);

    arr.push(
      new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
    );
  }

  return arr;
};

/** 캘린더 컴포넌트들 */

function CalendarHeader(date: XDate) {
  const styles = useStyles();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const strMonth = month < 10 ? `0${month}` : String(month);

  return (
    <View style={styles.calendarTitle}>
      <Font>{`${year}년 ${strMonth}월`}</Font>
    </View>
  );
}

function setCalendarStyle(array: Array<string>) {
  const dataMap = new Map<string, object>();

  array.forEach((key: string, index: number) => {
    if (index === 0) {
      dataMap.set(key, STARTSTYLE);
    } else if (index === array.length - 1) {
      dataMap.set(key, ENDSTYLE);
    } else {
      dataMap.set(key, PERIODSTYLE);
    }
  });

  return dataMap;
}

function PeriodCalendar({ data, setDate }: CalendarTypeProps) {
  console.log('asd');
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

      console.log(selectedDay);

      // 1. 단일 날짜만 선택됐을 경우
      if (!startDay) {
        markedDates.set(selectedDay, DAYSTYLE);
        setDay({ ...day, startDay: selectedDay });
        setMarkedDate(Object.fromEntries(markedDates.entries()));

        return;
      }

      // 2. start와 end가 있는데 시작날짜보다 작은 값을 선택했을 경우 => 초기화
      if (isStart && isEnd && startDay >= selectedDay) {
        setDay({ startDay: '', endDay: '' });
        setMarkedDate({});

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
    [day],
  );

  useEffect(() => {
    if (setDate && day.startDay && day.endDay)
      setDate({ startDate: day.startDay, endDate: day.endDay });
  }, [day.endDay, day.startDay, setDate]);

  return (
    <CalendarList
      theme={CustomCalendarTheme}
      calendarStyle={styles.calendarStyle}
      onDayPress={onPressDayHandlerPeriod}
      markingType="period"
      markedDates={markedDate || {}}
      nestedScrollEnabled
      pastScrollRange={0}
      displayLoadingIndicator={false}
      futureScrollRange={12}
      initialNumToRender={1}
      showScrollIndicator={false}
      renderHeader={date => {
        if (!date) return null;

        return CalendarHeader(date);
      }}
    />
  );
}

function DefaultCalendar({ data }: CalendarTypeProps) {
  const styles = useStyles();
  let selectedDate; // 임시
  let month;
  const onPressHandler = useCallback(() => {
    console.log('날짜 클릭!');
  }, []);

  if (data?.meetingDates) {
    selectedDate = renderSelectedDate(data.meetingDates, data.meetingUsers);
    month = renderMonth(data?.startDate, data?.endDate) - 1;
  }

  return (
    <CalendarList
      calendarStyle={styles.calendarStyle}
      onDayPress={onPressHandler}
      minDate={data?.startDate}
      maxDate={data?.endDate}
      markingType="custom"
      disableAllTouchEventsForDisabledDays
      markedDates={selectedDate}
      nestedScrollEnabled
      pastScrollRange={0}
      displayLoadingIndicator={false}
      futureScrollRange={month}
      showScrollIndicator={false}
      theme={CustomCalendarTheme}
      renderHeader={date => {
        if (!date) return null;

        return CalendarHeader(date);
      }}
    />
  );
}

export const MemorizedPeriodCalendar = React.memo(PeriodCalendar);

export const MemorizedDefaultCalendar = React.memo(DefaultCalendar);

function Calendar({ type, data, setDate }: CalendarProps): JSX.Element {
  const styles = useStyles();

  LocaleConfig.defaultLocale = 'kr';

  return (
    <View style={styles.calendarContainer}>
      {data && type === 'DEFAULT' ? (
        <MemorizedDefaultCalendar data={data} />
      ) : (
        <MemorizedPeriodCalendar data={data} setDate={setDate} />
      )}
    </View>
  );
}

export default Calendar;

const useStyles = makeStyles(theme => ({
  calendarContainer: {
    width: '100%',
    justifyContent: 'center',
    height: '98%',
    backgroundColor: 'none',
    borderRadius: 12,
  },
  calendarStyle: {
    width: '100%',
    borderRadius: 12,
  },
  dayTextAtIndex0: {
    color: theme.colors.warning,
  },
  calendarTitle: {
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 10,

    width: '100%',
  },
}));
