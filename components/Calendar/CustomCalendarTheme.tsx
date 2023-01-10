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
      backgroundColor: 'red',
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'black',
    },
  },
  todayTextColor: theme.lightColors?.primary,
  selectedDayTextColor: 'black',

  selectedDotColor: 'red',
};

export default CustomCalendarTheme;
declare module '@rneui/themed' {
  export interface Theme {
    DayTheme: {
      colors: {
        dayFilteredColor: string;
        dayStartColor: string;
        dayEndColor: string;
      };
      startDayStyle: {
        container: object;
        textColor: object;
      };
      endDayStyle: {
        container: object;
        textColor: object;
      };
      dayStyle: {
        container: object;
        oneDaySelectedStyle: object;
      };
    };
  }
}

export const DayTheme = createTheme({
  DayTheme: {
    colors: {
      dayFilteredColor: '#EFF6FE',
      dayStartColor: '#337FFE',
      dayEndColor: '#337FFE',
    },
    startDayStyle: {
      container: {
        width: 34,
        height: 34,
        borderRadius: 10000,
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
        backgroundColor: '#337FFE',
      },
    },
  },
});
