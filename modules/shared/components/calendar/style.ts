import { makeStyles } from '@rneui/themed';
import { theme } from '@shared/constants/themed';
import { applyRelativeSizes } from '@shared/utils';
import { StyleProp, TextStyle } from 'react-native';

const [
  CALENDAR_DAY_FONT_SIZE,
  CALENDAR_MONTH_FONT_SIZE,
  CALENDAR_DAY_HEADER_FONT_SIZE,
  CONTAINER_BORDER_RADIUS,
] = applyRelativeSizes({
  textDayFontSize: 14,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 13,
  borderRadius: 12,
});

export const customTextStyle: StyleProp<TextStyle> = {
  color: 'white',
  width: '100%',
  height: '100%',
  lineHeight: 34,
  textAlign: 'center',
  backgroundColor: theme.lightColors?.primary,
};

export const calendarTheme = {
  todayTextColor: theme.lightColors?.primary,
  todayButtonFontFamily: 'Pretendard-SemiBold',
  textDayFontFamily: 'Pretendard-Medium',
  textMonthFontFamily: 'Pretendard-SemiBold',
  textDayHeaderFontFamily: 'Pretendard-SemiBold',
  textDayFontSize: CALENDAR_DAY_FONT_SIZE,
  textMonthFontSize: CALENDAR_MONTH_FONT_SIZE,
  textDayHeaderFontSize: CALENDAR_DAY_HEADER_FONT_SIZE,
  textDayStyle: { width: 100, height: 100 },
};

export default makeStyles(() => {
  const [CALENDAR_WRAP_HEIGHT] = applyRelativeSizes({
    wrapCalendar: 325,
  });

  return {
    wrap: {
      alignSelf: 'center',
      width: '90%',
      height: CALENDAR_WRAP_HEIGHT,
    },
    cCalendar: {
      borderRadius: CONTAINER_BORDER_RADIUS,
      height: '100%',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.18,
      shadowRadius: 4.59,
      elevation: 5,
    },
  };
});
