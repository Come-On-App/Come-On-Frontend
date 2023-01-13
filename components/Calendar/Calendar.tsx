/* eslint-disable react/destructuring-assignment */
import React, { ReactNode, useState, useEffect } from 'react';
import { makeStyles } from '@rneui/themed';
import {
  CalendarProvider,
  CalendarList,
  DateData,
} from 'react-native-calendars';
import { View } from 'react-native';
import { MarkedDates } from 'react-native-calendars/src/types';
import LocaleConfig from './LocaleConfig';
import Font from '../StyledText';
import CustomCalendarTheme, { DayTheme } from './CustomCalendarTheme';
import { CalendarProps, MeetingDate, MeetingUser } from '../../types';

function CalendarHeader(date: XDate): ReactNode {
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

const returnDayDiff = (startDate: Date, endDate: Date) => {
  const msecDiff = endDate.getTime() - startDate.getTime();
  const dayDiff = msecDiff / (24 * 60 * 60 * 1000);

  return dayDiff;
};
const returnPeriodArray = (startDate: string, endDate: string) => {
  const startDay = new Date(startDate);
  const endDay = new Date(endDate);
  const dayDiff = returnDayDiff(startDay, endDay);
  const arr = [];

  for (let i = 0; i <= dayDiff; i += 1) {
    if (i === 0) {
      arr.push(returnYYYYmmdd(startDay));
    } else {
      arr.push(
        returnYYYYmmdd(new Date(startDay.setDate(startDay.getDate() + 1))),
      );
    }
  }

  return arr;
};
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
const returnYYYYmmdd = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month >= 10 ? month : `0${month}`}-${
    day >= 10 ? day : `0${day}`
  }`;
};
const renderSelectedDate = (
  dates: MeetingDate[],
  meetingUsers: MeetingUser[],
): MarkedDates => {
  const markedDates: MarkedDates = {};
  const userCount = meetingUsers.length;

  dates.forEach(item => {
    markedDates[item.date] = {
      customStyles: {
        container: {
          borderRadius: 0,
          backgroundColor: `rgba(51,127,254, ${item.userCount / userCount!})`,
        },
        text: {
          color: 'white',
        },
      },
    };
  });

  return markedDates;
};

function Calendar({ type, data }: CalendarProps): JSX.Element {
  const styles = useStyles();
  const [markedDate, setMarkedDate] = useState({});
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');

  LocaleConfig.defaultLocale = 'kr';

  const onPressDayHandlerPeriod = (date: DateData) => {
    let start = startDay;
    let end = endDay;
    const markedDates: MarkedDates = {};
    let periodArray = [];

    if (start === '') {
      setStartDay(date.dateString);
      markedDates[date.dateString] = {
        selected: true,
        startingDay: true,
        color: DayTheme.DayTheme?.colors?.dayEndColor,
        customTextStyle: DayTheme.DayTheme?.startDayStyle?.textColor,
        customContainerStyle: DayTheme.DayTheme?.startDayStyle?.container,
      };
      start = date.dateString;
    } else if (startDay !== '' && startDay >= date.dateString) {
      setStartDay('');
      setEndDay('');
      setMarkedDate([]);
      start = '';
    } else if (startDay !== '' && startDay < date.dateString) {
      setEndDay(date.dateString);
      end = date.dateString;
    } else if (startDay !== '' && endDay !== '') {
      if (date.dateString >= endDay) {
        setEndDay(date.dateString);
        end = date.dateString;
      } else {
        setStartDay('');
        setEndDay('');
        setMarkedDate([]);
        start = '';
        end = '';
      }
    }

    if (start && end) {
      periodArray = returnPeriodArray(start, end);
      periodArray.forEach((key, index) => {
        if (index === 0) {
          markedDates[key] = {
            selected: true,
            startingDay: true,
            color: DayTheme.DayTheme?.colors?.dayStartColor,
            customTextStyle: DayTheme.DayTheme?.startDayStyle?.textColor,
            customContainerStyle: DayTheme.DayTheme?.startDayStyle?.container,
          };
        } else if (index === periodArray.length - 1) {
          markedDates[key] = {
            selected: true,
            endingDay: true,
            color: DayTheme.DayTheme?.colors?.dayStartColor,
            customContainerStyle: DayTheme.DayTheme?.endDayStyle?.container,
            customTextStyle: DayTheme.DayTheme?.endDayStyle?.textColor,
          };
        } else {
          markedDates[key] = {
            selected: true,
            customContainerStyle: DayTheme.DayTheme?.dayStyle?.container,
            color: DayTheme.DayTheme?.colors?.dayFilteredColor,
          };
        }
      });
    } else if (start !== '') {
      markedDates[start] = {
        selected: true,
        textColor: 'white',
        customContainerStyle: DayTheme.DayTheme?.dayStyle?.oneDaySelectedStyle,
      };
    }

    setMarkedDate(markedDates);
  };
  const onPressHandler = () => {
    console.log('날짜 클릭!');
  };
  const renderPeriodCalendar = () => {
    return (
      <View style={styles.viewview}>
        <CalendarProvider
          date="2023-1-1"
          style={styles.calendarContainer}
          theme={CustomCalendarTheme}
        >
          <View style={styles.shadowBox}>
            <CalendarList
              calendarStyle={styles.calendarStyle}
              onDayPress={onPressDayHandlerPeriod}
              markingType="period"
              markedDates={markedDate}
              nestedScrollEnabled
              pastScrollRange={0}
              displayLoadingIndicator={false}
              futureScrollRange={12}
              showScrollIndicator={false}
              theme={CustomCalendarTheme}
              renderHeader={date => CalendarHeader(date!)}
            />
          </View>
        </CalendarProvider>
      </View>
    );
  };
  const renderDefaultCalendar = () => {
    let selectedDate;
    let month;

    if (data?.meetingDates) {
      selectedDate = renderSelectedDate(data.meetingDates, data.meetingUsers);
      month = renderMonth(data?.startDate, data?.endDate) - 1;
    }

    return (
      <View style={styles.viewview}>
        <View style={styles.calendarContainer}>
          <View style={styles.shadowBox}>
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
              renderHeader={date => CalendarHeader(date!)}
            />
          </View>
        </View>
      </View>
    );
  };

  return type === 'DEFAULT' ? renderDefaultCalendar() : renderPeriodCalendar();
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
