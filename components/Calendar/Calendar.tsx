/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
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

/** 캘린더 컴포넌트들 */

function CalendarHeader(date: XDate) {
  const styles = useStyles();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let strMonth = '';

  strMonth = month < 10 ? `0${month}` : String(month);

  return (
    <View style={styles.calendarTitle}>
      <Font>{`${year}년 ${strMonth}월`}</Font>
    </View>
  );
}

function PeriodCalendar({
  data,
  onPressHandler,
  markedDate,
}: CalendarTypeProps) {
  const styles = useStyles();

  return (
    <CalendarList
      theme={CustomCalendarTheme}
      calendarStyle={styles.calendarStyle}
      onDayPress={onPressHandler}
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

function DefaultCalendar({
  data,
  onPressHandler,
  markedDate,
}: CalendarTypeProps) {
  const styles = useStyles();
  let selectedDate; // 임시
  let month;

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

function Calendar({ type, data }: CalendarProps): JSX.Element {
  const styles = useStyles();
  const [markedDate, setMarkedDate] = useState<MarkedDates>();
  const [day, setDay] = useState({ startDay: '', endDay: '' });

  LocaleConfig.defaultLocale = 'kr';

  const onPressDayHandlerPeriod = (date: DateData) => {
    let start = day.startDay;
    let end = day.endDay;
    const markedDates = new Map<string, object>();
    let periodArray = [];

    if (start) {
      markedDates.set(date.dateString, {
        selected: true,
        textColor: 'white',
        customContainerStyle: DayTheme.DayTheme?.dayStyle?.oneDaySelectedStyle,
      });
      start = date.dateString;
      setDay({ ...day, startDay: start });
      const result = Object.fromEntries(markedDates.entries());

      setMarkedDate(result);

      return;
    }

    if (!!start && !!end && start >= date.dateString) {
      start = '';
      setMarkedDate({});
    } else if (!!start && start < date.dateString) {
      end = date.dateString;
    } else if (!!start && !!end) {
      if (date.dateString >= end) {
        end = date.dateString;
      } else {
        setMarkedDate({});
        setDay({ startDay: '', endDay: '' });

        return;
      }
    }

    if (start && end) {
      periodArray = getDatesRangeArray(start, end);
      periodArray.forEach((key, index) => {
        if (index === 0) {
          markedDates.set(key, STARTSTYLE);
        } else if (index === periodArray.length - 1) {
          markedDates.set(key, ENDSTYLE);
        } else {
          markedDates.set(key, PERIODSTYLE);
        }
      });
    }

    if (markedDates) {
      const result = Object.fromEntries(markedDates.entries());

      setMarkedDate(result);
    }

    setDay({ startDay: start, endDay: end });
  };
  const onPressHandler = () => {
    console.log('날짜 클릭!');
  };

  return (
    <View style={styles.viewview}>
      <View style={styles.calendarContainer}>
        <View style={styles.shadowBox}>
          {data && type === 'DEFAULT' ? (
            <DefaultCalendar
              data={data}
              onPressHandler={onPressHandler}
              markedDate={markedDate}
            />
          ) : (
            <PeriodCalendar
              data={data}
              onPressHandler={onPressDayHandlerPeriod}
              markedDate={markedDate}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default Calendar;

const useStyles = makeStyles(theme => ({
  viewview: {
    width: '100%',
    justifyContent: 'center',
    height: '98%',
    backgroundColor: 'none',
  },
  calendarContainer: {
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    shadowRadius: 12,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    overflow: 'hidden',
    borderRadius: 12,
  },
  calendarStyle: {
    width: '100%',
    borderRadius: 12,
  },
  shadowBox: {
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    shadowRadius: 12,
    shadowOpacity: 0.25,
    overflow: 'hidden',
    shadowColor: '#000',
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
