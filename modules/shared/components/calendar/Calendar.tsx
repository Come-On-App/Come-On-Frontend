import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import {
  Calendar as RNCalendar,
  LocaleConfig,
  DateData,
} from 'react-native-calendars';
import { View } from 'react-native';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

import TestId from '@shared/constants/testIds';
import generateMarkedDate from '@shared/utils/markedDate';
import checkDateRelationship from '@shared/utils/checkDateRelationship';
import { MarkedDates } from 'react-native-calendars/src/types';
import calendarConfig from './config';
import useStyles, { calendarTheme } from './style';
import {
  CalendarAction,
  CalendarState,
  DateInfo,
  FocusDate,
  Icalendar,
  RangeDatePressHandler,
  SingleDatePressHandler,
} from './type';
import {
  UPDATE_DAYS,
  UPDATE_ENDING_DAY,
  UPDATE_STARTING_DAY,
  calendarReducer,
  initialState,
} from './reducer';

LocaleConfig.locales.kr = calendarConfig.locales;

LocaleConfig.defaultLocale = 'kr';

/**
 * 날짜 범위를 선택할 수 있는 캘린더 컴포넌트
 * - `current`: 캘린더가 렌더링 될 기준 날짜를 설정.
 * - `onDayPress`: 사용자가 하루를 클릭했을 때의 이벤트 데이터에 접근할 수 있다.
 * - `loadPreviousDate`: 이 속성을 전달하면, 캘린더가 이전에 선택한 날짜 범위로 업데이트.
 * - `blockLocalEvent`: 내부 이벤트 발생을 방지.
 * - `focusDate`: 특정 날짜를 포커스 한다.
 * - `focusDotColor`: 포커스 색상을 지정한다 기본값: '#24ABE4'
 *
 * **주의**: `blockLocalEvent`가 true로 설정되면, `onDayPress` 핸들러의 매개변수 개수가 변경.
 */
function Calendar({
  current,
  onDayPress,
  loadPreviousDate,
  focusDate,
  focusDotColor = '#24ABE4',
  blockLocalEvent = false,
}: Icalendar) {
  const { cCalendar, wrap } = useStyles();
  const isFirstLoad = useRef(true);
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const { startingDay, endingDay } = state;
  const setSelectedDateRange = useCallback(
    (newStart: DateInfo, newEnd: DateInfo) => {
      dispatch({
        type: UPDATE_DAYS,
        payload: { startingDay: newStart, endingDay: newEnd },
      });
    },
    [],
  );
  const markedDates = useMemo(() => {
    if (!startingDay) {
      return undefined;
    }

    const newMarkedDates = updateSpecificMarkedDate(
      generateMarkedDate(startingDay.dateString, endingDay?.dateString ?? null),
      { focusDate, focusDotColor },
    );

    return newMarkedDates;
  }, [endingDay?.dateString, focusDate, focusDotColor, startingDay]);
  const localOnDayPress = useMemo(
    () => manageCalendarSelection(state, dispatch),
    [state],
  );
  const conditionalDatePress = useCallback(
    (date: DateData) =>
      blockLocalEvent
        ? (onDayPress as SingleDatePressHandler)(date)
        : localOnDayPress(date),
    [blockLocalEvent, localOnDayPress, onDayPress],
  );

  // 사용자 인터랙션(날짜 클릭)이 발생할 때 호출된다.
  useEffect(() => {
    if (!blockLocalEvent)
      (onDayPress as RangeDatePressHandler)(startingDay, endingDay);
  }, [blockLocalEvent, endingDay, onDayPress, startingDay]);

  // 첫 렌더링 시에 기존 날짜 정보가 있으면 이를 반영한다.
  useEffect(() => {
    if (isFirstLoad.current && loadPreviousDate) {
      const prev = loadPreviousDate();

      setSelectedDateRange(prev.startingDay, prev.endingDay);
      isFirstLoad.current = false;
    }
  }, [loadPreviousDate, setSelectedDateRange]);

  return (
    <View style={wrap}>
      <RNCalendar
        current={current}
        enableSwipeMonths
        testID={TestId.shared.calender}
        style={cCalendar}
        onDayPress={conditionalDatePress}
        theme={calendarTheme}
        markingType="period"
        markedDates={markedDates}
      />
    </View>
  );
}

// 특정 날짜(focusDate)가 존재할 경우, 해당 날짜의 속성을 업데이트
const updateSpecificMarkedDate = (
  markedDates: MarkedDates,
  focusDate: FocusDate,
) => {
  const newMarkedDates = { ...markedDates };

  Object.keys(newMarkedDates).forEach((date) => {
    const dateAttributes = newMarkedDates[date];

    // focusDate가 설정되어 있고, 현재 날짜와 일치하면 속성을 업데이트
    newMarkedDates[date] = updateMarkedDateAttributes(
      date,
      dateAttributes,
      focusDate,
    );
  });

  return newMarkedDates;
};
// 표시된 날짜의 속성을 업데이트
const updateMarkedDateAttributes = (
  date: string,
  dateAttributes: MarkingProps,
  { focusDate, focusDotColor }: FocusDate,
) => {
  if (focusDate && date === focusDate) {
    return {
      ...dateAttributes,
      marked: true,
      dotColor: focusDotColor,
    };
  }

  if (!focusDate && (dateAttributes.marked || dateAttributes.dotColor)) {
    return {
      ...dateAttributes,
      marked: undefined,
      dotColor: undefined,
    };
  }

  return dateAttributes;
};

// 캘린더 내부 인터랙션 핸들러
function manageCalendarSelection(
  { startingDay, endingDay }: CalendarState,
  dispatch: React.Dispatch<CalendarAction>,
) {
  const setSelectedDateRange = (newStart: DateInfo, newEnd: DateInfo) => {
    dispatch({
      type: UPDATE_DAYS,
      payload: { startingDay: newStart, endingDay: newEnd },
    });
  };
  const setStartDate = (targetDay: DateInfo) => {
    dispatch({
      type: UPDATE_STARTING_DAY,
      payload: { startingDay: targetDay },
    });
  };
  const setEndDate = (targetDay: DateInfo) => {
    dispatch({
      type: UPDATE_ENDING_DAY,
      payload: { endingDay: targetDay },
    });
  };

  return (targetDay: DateData) => {
    const date = checkDateRelationship(startingDay, endingDay, targetDay);

    // 기존의 선택된 날짜가 존재하지 않을때
    if (date.isEmptyDay) {
      setStartDate(targetDay);

      return;
    }

    // -- 선택된 연도가 다를때
    if (date.isEarlierYear) {
      if (endingDay?.day === targetDay.day) {
        setSelectedDateRange(targetDay, null);

        return;
      }

      setEndDate(targetDay);

      return;
    }

    if (date.isLaterYear) {
      setSelectedDateRange(targetDay, startingDay);

      return;
    }
    // --

    // -- 선택된 월 다를때
    if (date.isLaterMonth) {
      setSelectedDateRange(targetDay, startingDay);

      return;
    }

    if (date.isEarlierMonth) {
      if (endingDay?.day === targetDay.day) {
        setSelectedDateRange(targetDay, null);

        return;
      }

      setEndDate(targetDay);

      return;
    }
    // --

    // 시작 - 끝 범위가 이미 지정되어있을때
    if (date.startingAndEndingDays && startingDay?.day === targetDay.day) {
      setSelectedDateRange(targetDay, null);

      return;
    }

    // 시작 범위만 존재할때
    if (startingDay?.day === targetDay.day) {
      setSelectedDateRange(null, null);

      return;
    }

    // 시작 - 끝 범위가 이미 지정되어있을때
    if (date.startingAndEndingDays && endingDay?.day === targetDay.day) {
      setSelectedDateRange(endingDay, null);

      return;
    }

    // 기준점부터 왼쪽방향을 선택했을때
    if (date.isLaterDay) {
      // 시작 - 끝 범위가 이미 지정되어있을때
      if (date.startingAndEndingDays) {
        setStartDate(targetDay);

        return;
      }

      setSelectedDateRange(targetDay, startingDay);

      return;
    }

    // 기준점부터 오른쪽방향을 선택했을때
    if (date.isEarlierDay) {
      setEndDate(targetDay);
    }
  };
}

export default React.memo(Calendar);
