import React, { ReactNode, useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@rneui/themed';
import {
  CalendarProvider,
  CalendarList,
  DateData,
} from 'react-native-calendars';
import { View } from 'react-native';

import {
  Theme as CalendarTheme,
  MarkedDates,
} from 'react-native-calendars/src/types';
import LocaleConfig from '../Calendar/LocaleConfig';
import Font from '../StyledText';

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

  console.log(returnDayDiff(startDay, endDay));

  for (let i = 0; i <= dayDiff; i += 1) {
    if (i === 0) {
      arr.push(returnYYYYmmdd(startDay));
    } else {
      arr.push(
        returnYYYYmmdd(new Date(startDay.setDate(startDay.getDate() + 1))),
      );
    }
  }

  console.log(arr);

  return arr;
};
const returnYYYYmmdd = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month >= 10 ? month : `0${month}`}-${
    day >= 10 ? day : `0${day}`
  }`;
};

function Calendar(): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  const [days, setDays] = useState<string[]>([]);
  const [markedDate, setMarkedDate] = useState({});
  const calendarTheme: CalendarTheme = {
    'stylesheet.calendar.header': {
      dayTextAtIndex0: {
        color: theme.colors.warning,
      },
    },
    textDayStyle: {
      color: theme.grayscale[900],
    },
    todayTextColor: theme.colors.primary,
  };

  LocaleConfig.defaultLocale = 'kr';

  const dateSelected = () => {
    if (days.length === 0) return false;

    return true;
  };
  const onPressDayHandler = (date: DateData) => {
    if (!dateSelected()) {
      days.push(date.dateString);
    } else if (dateSelected() && days.length >= 2) {
      if (date.dateString > days[days.length - 1]) {
        days.push(date.dateString);
      } else {
        const temp = [date.dateString];

        setDays([]);
      }
    } else if (dateSelected() && days.length < 2) {
      if (date.dateString < days[0]) {
        setDays([]);
        days.push(date.dateString); // 재설정
      } else if (date.dateString > days[days.length - 1]) {
        days.push(date.dateString);
      }
    }

    let selectedDate = {};

    days.sort();

    if (days.length >= 2) {
      selectedDate = {
        [days[0]]: {
          startingDay: true,
          color: theme.colors.primary,
          textColor: 'white',
        },
        [days[days.length - 1]]: {
          endingDay: true,
          color: theme.colors.primary,
          textColor: 'white',
        },
      };
    } else {
      selectedDate = {
        [days[0]]: {
          startingDay: true,
          color: theme.colors.primary,
          textColor: 'white',
        },
      };
    }

    setMarkedDate(selectedDate);

    console.log('------');
    const periodArray = returnPeriodArray('2023-01-18', '2023-01-23');
    const markedDates: MarkedDates = {};

    periodArray.forEach((key, index) => {
      markedDates[key] = { selected: true, color: 'blue' };
    });

    console.log(periodArray);
    console.log(markedDates);

    setMarkedDate(markedDates);
  };

  return (
    <CalendarProvider
      date="2023-1-1"
      style={styles.calendarContainer}
      theme={calendarTheme}
    >
      <View style={styles.shadowBox}>
        <CalendarList // Callback which gets executed when visible months change in scroll view. Default = undefined
          calendarStyle={styles.calendarStyle}
          onVisibleMonthsChange={months => {
            console.log('now these months are visible', months);
          }}
          onDayPress={onPressDayHandler}
          markingType="period"
          markedDates={markedDate}
          pastScrollRange={0}
          futureScrollRange={12}
          scrollEnabled
          showScrollIndicator={false}
          theme={calendarTheme}
          renderHeader={date => CalendarHeader(date!)}
        />
      </View>
    </CalendarProvider>
  );
}

export default Calendar;

const useStyles = makeStyles(theme => ({
  calendarContainer: {
    flex: 0.7,
    backgroundColor: 'black',
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    shadowRadius: 12,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    overflow: 'hidden',
    borderRadius: 12,
    padding: 0,
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
    shadowColor: '#000',
    borderRadius: 12,
  },
  dayTextAtIndex0: {
    color: theme.colors.warning,
  },
  calendarTitle: {
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },
}));
