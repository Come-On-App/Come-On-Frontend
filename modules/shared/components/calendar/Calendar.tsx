import React, { memo, useMemo, useState } from 'react';
import { View } from 'react-native';
import {
  Calendar as RNcalendar,
  LocaleConfig,
  DateData,
} from 'react-native-calendars';
import _ from 'lodash';
import * as Haptics from 'expo-haptics';

import calendarConfig from './confing';
import useStyles, { calendarTheme } from './style';
import markedDate from './markedDate';

LocaleConfig.locales.kr = calendarConfig.locales;

LocaleConfig.defaultLocale = 'kr';

function Calendar() {
  const { wrap, cCalendar } = useStyles();
  const [startingDay, setStartingDay] = useState<DateData | null>(null);
  const [endingDay, setEndingDay] = useState<DateData | null>(null);
  const markedDates = useMemo(() => {
    if (!startingDay) {
      return {};
    }

    return markedDate(startingDay.dateString, endingDay?.dateString ?? null);
  }, [startingDay, endingDay]);

  return (
    <View style={wrap}>
      <RNcalendar
        onDayPress={(targetDay) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          // 기존의 선택된 날짜가 존재하지 않을때
          if (_.isEmpty(startingDay) && _.isEmpty(endingDay)) {
            setStartingDay(targetDay);

            return;
          }

          // -- 선택된 연도가 다를때
          if (startingDay && startingDay.year < targetDay.year) {
            setEndingDay(targetDay);

            return;
          }

          if (startingDay && startingDay.year > targetDay.year) {
            setStartingDay(targetDay);
            setEndingDay(startingDay);

            return;
          }
          // --

          // -- 선택된 월 다를때
          if (startingDay && startingDay.month > targetDay.month) {
            setStartingDay(targetDay);
            setEndingDay(startingDay);

            return;
          }

          if (startingDay && startingDay.month < targetDay.month) {
            setEndingDay(targetDay);

            return;
          }
          // --

          // 시작 - 끝 범위가 이미 지정되어있을때
          if (startingDay && endingDay && startingDay.day === targetDay.day) {
            setStartingDay(targetDay);
            setEndingDay(null);

            return;
          }

          // 시작 범위만 존재할때
          if (startingDay && startingDay.day === targetDay.day) {
            setStartingDay(null);
            setEndingDay(null);

            return;
          }

          // 시작 - 끝 범위가 이미 지정되어있을때
          if (startingDay && endingDay && endingDay.day === targetDay.day) {
            setStartingDay(endingDay);
            setEndingDay(null);

            return;
          }

          // 기준점부터 왼쪽방향을 선택했을때
          if (startingDay && startingDay.day > targetDay.day) {
            // 시작 - 끝 범위가 이미 지정되어있을때
            if (startingDay && endingDay) {
              setStartingDay(targetDay);

              return;
            }

            setStartingDay(targetDay);
            setEndingDay(startingDay);
          }

          // 기준점부터 오른쪽방향을 선택했을때
          if (startingDay && startingDay.day < targetDay.day) {
            setEndingDay(targetDay);
          }
        }}
        style={cCalendar}
        theme={calendarTheme}
        markingType="period"
        enableSwipeMonths
        markedDates={markedDates}
      />
    </View>
  );
}

export default memo(Calendar);
