import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import {
  Calendar as RNcalendar,
  LocaleConfig,
  DateData,
} from 'react-native-calendars';
import * as Haptics from 'expo-haptics';

import TestId from '@shared/constants/testIds';
import markedDate from '@shared/utils/markedDate';
import checkDateRelationship from '@shared/utils/checkDateRelationship';
import calendarConfig from './confing';
import useStyles, { calendarTheme } from './style';
import { DateInfo, Icalendar } from './type';

LocaleConfig.locales.kr = calendarConfig.locales;

LocaleConfig.defaultLocale = 'kr';

/**
 * 날짜 범위 선택이 가능한 캘린더 컴포넌트
 *
 * current 속성을 통해서 캘린더는 전달된 날짜를 기준으로 렌더링 된다.
 *
 * onDayPress 속성을 통해서 사용자 이벤트 데이터에 접근이 가능.
 *
 * loadPreviousDate 속성을 전달하면 기존 날짜 범위로 업데이트 가능.
 */
function Calendar({
  current,
  onDayPress,
  loadPreviousDate,
  calendarStyle,
  containerStyle,
}: Icalendar) {
  const { wrap, cCalendar } = useStyles();
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [startingDay, setStartingDay] = useState<DateInfo>(null);
  const [endingDay, setEndingDay] = useState<DateInfo>(null);
  const markedDates = useMemo(() => {
    if (!startingDay) {
      return {};
    }

    return markedDate(startingDay.dateString, endingDay?.dateString ?? null);
  }, [startingDay, endingDay]);

  // 사용자 인터랙션(날짜 클릭)이 발생할 때 호출된다.
  useEffect(() => {
    onDayPress(startingDay, endingDay);
  }, [onDayPress, startingDay, endingDay]);

  useEffect(() => {
    if (isFirstLoad && loadPreviousDate) {
      const prev = loadPreviousDate();

      if (prev.startingDay) {
        setStartingDay(prev.startingDay);
        setEndingDay(prev.endingDay);
      }

      setFirstLoad(false);
    }
  }, [isFirstLoad, loadPreviousDate]);

  // 캘린더 내부 인터랙션 핸들러
  const localOnDayPress = useCallback(
    (targetDay: DateData) => {
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
      if (date.startingAndEndingDays && startingDay?.day === targetDay.day) {
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
    },
    [endingDay, startingDay],
  );

  return (
    <View style={[wrap, containerStyle]}>
      <RNcalendar
        enableSwipeMonths
        testID={TestId.shared.calender}
        onDayPress={localOnDayPress}
        current={current}
        style={[cCalendar, calendarStyle]}
        theme={calendarTheme}
        markingType="period"
        markedDates={markedDates}
      />
    </View>
  );
}

export default memo(Calendar, (prev, next) => {
  return prev.onDayPress === next.onDayPress;
});
