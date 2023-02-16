import { Theme as CalendarTheme } from 'react-native-calendars/src/types';
import { createTheme } from '@rneui/themed';

import theme from '../../constants/themed';

const CustomCalendarTheme: CalendarTheme = {
  'stylesheet.calendar.header': {
    dayTextAtIndex0: {
      color: theme.lightColors?.warning,
    },
  },

  textDayFontSize: 16,
  'stylesheet.day.period': {
    selected: {
      selectedText: {
        color: 'red',
      },
      customContainerStyle: {
        backgroundColor: 'red',
      },
    },
    color: 'black',
  },
  selectedDayTextColor: 'black',
  todayTextColor: theme.lightColors?.primary,
  selectedDayBackgroundColor: theme.calendarStyles?.period,
};

export default CustomCalendarTheme;

export const DayTheme = createTheme({
  DayTheme: {
    colors: {
      dayFilteredColor: theme.calendarStyles?.period,
      dayStartColor: theme.lightColors?.primary,
      dayEndColor: theme.lightColors?.primary,
    },
    startDayStyle: {
      container: {
        width: 34,
        height: 34,
      },
      textColor: {
        color: 'white',
      },
    },
    endDayStyle: {
      container: {
        width: 34,
        height: 34,
      },
      textColor: {
        color: 'white',
      },
    },
    dayStyle: {
      container: {
        width: 34,
        height: 34,
      },
      oneDaySelectedStyle: {
        width: 34,
        height: 34,
        backgroundColor: theme.lightColors?.primary,
      },
    },
  },
});
