import React, { memo, useMemo, useState } from 'react';
import { View } from 'react-native';
import {
  Calendar as RNcalendar,
  LocaleConfig,
  DateData,
} from 'react-native-calendars';
import * as Haptics from 'expo-haptics';

import TestId from '@shared/constants/testIds';
import calendarConfig from './confing';
import useStyles, { calendarTheme } from './style';
import markedDate from './utils/markedDate';
import checkDateRelationship from './utils/checkDateRelationship';

LocaleConfig.locales.kr = calendarConfig.locales;

LocaleConfig.defaultLocale = 'kr';

function Calendar({ current }: { current?: string }) {
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
        testID={TestId.shared.calender}
        onDayPress={(targetDay: DateData) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          const date = checkDateRelationship(endingDay, startingDay, targetDay);

          // 기존의 선택된 날짜가 존재하지 않을때
          if (date.isEmptyDay) {
            setStartingDay(targetDay);

            return;
          }

          // -- 선택된 연도가 다를때
          if (date.isEarlierYear) {
            if (endingDay?.day === targetDay.day) {
              setStartingDay(targetDay);
              setEndingDay(null);

              return;
            }

            setEndingDay(targetDay);

            return;
          }

          if (date.isLaterYear) {
            setStartingDay(targetDay);
            setEndingDay(startingDay);

            return;
          }
          // --

          // -- 선택된 월 다를때
          if (date.isLaterMonth) {
            setStartingDay(targetDay);
            setEndingDay(startingDay);

            return;
          }

          if (date.isEarlierMonth) {
            if (endingDay?.day === targetDay.day) {
              setStartingDay(targetDay);
              setEndingDay(null);

              return;
            }

            setEndingDay(targetDay);

            return;
          }
          // --

          // 시작 - 끝 범위가 이미 지정되어있을때
          if (
            date.startingAndEndingDays &&
            startingDay?.day === targetDay.day
          ) {
            setStartingDay(targetDay);
            setEndingDay(null);

            return;
          }

          // 시작 범위만 존재할때
          if (startingDay?.day === targetDay.day) {
            setStartingDay(null);
            setEndingDay(null);

            return;
          }

          // 시작 - 끝 범위가 이미 지정되어있을때
          if (date.startingAndEndingDays && endingDay?.day === targetDay.day) {
            setStartingDay(endingDay);
            setEndingDay(null);

            return;
          }

          // 기준점부터 왼쪽방향을 선택했을때
          if (date.isLaterDay) {
            // 시작 - 끝 범위가 이미 지정되어있을때
            if (date.startingAndEndingDays) {
              setStartingDay(targetDay);

              return;
            }

            setStartingDay(targetDay);
            setEndingDay(startingDay);

            return;
          }

          // 기준점부터 오른쪽방향을 선택했을때
          if (date.isEarlierDay) {
            setEndingDay(targetDay);
          }
        }}
        current={current}
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
