/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles, Overlay } from '@rneui/themed';
import { View } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

import {
  requestAddDateVoting,
  requestDeleteDateVoting,
} from '@api/meeting/voting';

import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Font from '../Font';
import LocaleConfig from './LocaleConfig';
import CustomCalendarTheme, { DayTheme } from './CustomCalendarTheme';
import {
  CalendarPeriodTypeProps,
  CalendarProps,
  CalendarVotingTypeProps,
  CalenderClickEventType,
} from '../../types';
import LoadingComponent from './LoadingComponent';
import DateModal, { NoUserModal } from './DateModal';

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
const DAYSTYLE = {
  selected: true,
  textColor: 'white',
  customContainerStyle: DayTheme.DayTheme?.dayStyle?.oneDaySelectedStyle,
};
/** 로직에 사용되는 함수들 */
const returnMonthDiff = (startDate: Date, endDate: Date) => {
  const msecDiff = endDate.getTime() - startDate.getTime();
  const monthDiff = msecDiff / (24 * 60 * 60 * 1000) / 12;

  return monthDiff;
};
const renderMonth = (startDate: string, endDate: string) => {
  const endDay = new Date(endDate);
  const startDay = new Date(startDate);
  const dayDiff = Math.floor(returnMonthDiff(startDay, endDay));

  return dayDiff;
};
const dateToKorString = (date: string) => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  return `${year}년 ${month}월 ${day}일`;
};
const renderSelectedDate = (
  dates: string[],
  userCounts: number[],
  totalUsers: number,
) => {
  const markedDates = new Map<string, object>();

  dates.forEach((date, idx) => {
    markedDates.set(date, {
      customStyles: {
        container: {
          borderRadius: 0,
          backgroundColor: `rgba(51,127,254, ${userCounts[idx] / totalUsers})`,
        },
        text: {
          color: 'black',
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

/** 캘린더 컴포넌트들 */

function CalendarHeader(date: XDate) {
  const styles = useStyles();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const strMonth = month < 10 ? `0${month}` : String(month);

  return (
    <View style={styles.calendarTitle}>
      <Font>{`${year}년 ${strMonth}월`}</Font>
    </View>
  );
}

function setCalendarStyle(array: Array<string>) {
  const dataMap = new Map<string, object>();

  array.forEach((key: string, index: number) => {
    if (index === 0) {
      dataMap.set(key, STARTSTYLE);
    } else if (index === array.length - 1) {
      dataMap.set(key, ENDSTYLE);
    } else {
      dataMap.set(key, PERIODSTYLE);
    }
  });

  return dataMap;
}

function PeriodCalendar({ setDate }: CalendarPeriodTypeProps) {
  const styles = useStyles();
  const today = new Date().toISOString().substring(0, 10);
  const [markedDate, setMarkedDate] = useState<MarkedDates>();
  const [day, setDay] = useState({ startDay: '', endDay: '' });
  const onPressDayHandlerPeriod = useCallback(
    (date: DateData) => {
      const { startDay, endDay } = day;
      const isEnd = !!endDay;
      const isStart = !!startDay;
      const selectedDay = date.dateString;
      const markedDates = new Map<string, object>();

      // 1. 단일 날짜만 선택됐을 경우
      if (!startDay) {
        markedDates.set(selectedDay, DAYSTYLE);
        setDay({ ...day, startDay: selectedDay });
        setMarkedDate(Object.fromEntries(markedDates.entries()));

        return;
      }

      // 2. start와 end가 있는데 시작날짜보다 작은 값을 선택했을 경우 => 초기화
      if (isStart && isEnd && startDay >= selectedDay) {
        setDay({ startDay: '', endDay: '' });
        setMarkedDate({});

        if (setDate)
          setDate({ startDate: '0000-00-00', endDate: '0000-00-00' });

        return;
      }

      // 3. start가 있을때 들어온 값이 start보다 큰 경우
      if (isStart && startDay < selectedDay) {
        const newDay = { ...day, endDay: selectedDay };
        const periodArray = getDatesRangeArray(startDay, selectedDay);
        const periodMap = setCalendarStyle(periodArray);

        setDay(newDay);
        setMarkedDate(Object.fromEntries(periodMap.entries()));
      }
    },
    [day, setDate],
  );

  useEffect(() => {
    if (setDate && day.startDay && day.endDay)
      setDate({ startDate: day.startDay, endDate: day.endDay });
  }, [day.endDay, day.startDay, setDate]);

  return (
    <CalendarList
      theme={CustomCalendarTheme}
      calendarStyle={styles.calendarStyle}
      onDayPress={onPressDayHandlerPeriod}
      minDate={today}
      markingType="period"
      scrollToOverflowEnabled
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
  startFrom,
  endTo,
  hostId,
  totalUsers,
}: CalendarVotingTypeProps) {
  const styles = useStyles();
  const { contents, contentsCount } = data;
  const [meetingDates, setMeetingDates] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [meetingMemberCount, setMeetingMemberCount] = useState<number[]>([]);
  const [myVotingDates, setMyVotingDates] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<{
    [k: string]: object;
  }>({});
  const [userSelected, setUserSelected] = useState<boolean>();
  const [userSelectedDate, setUserSelectedDate] =
    useState<CalenderClickEventType>();
  let month = renderMonth(startFrom, endTo) - 1;
  const meetingId = 130;

  if (month <= 0) month = 0;

  useEffect(() => {
    setMeetingDates(contents.map(content => content.date));
    setMeetingMemberCount(contents.map(content => content.memberCount));
    setMyVotingDates(
      contents
        .filter(content => content.myVoting === true)
        .map(content => content.date),
    );
  }, [contents, contentsCount]);

  useEffect(() => {
    setSelectedDates(
      renderSelectedDate(meetingDates, meetingMemberCount, totalUsers),
    );
  }, [meetingDates, meetingMemberCount, totalUsers]);

  const onPressHandler = useCallback(
    async (e: CalenderClickEventType) => {
      const date = {
        date: e.dateString,
      };
      const korStr = dateToKorString(date.date);

      if (myVotingDates.includes(date.date)) {
        requestDeleteDateVoting({ meetingId, payload: date }).then(res => {
          if (res.success) {
            Toast.show({
              text1: `${korStr} 에 투표가 취소되었습니다.`,
            });
          }
        });
      } else {
        requestAddDateVoting({ meetingId, payload: date }).then(res => {
          if (res.success) {
            Toast.show({ text1: `${korStr} 에 투표 되었습니다.` });
          }
        });
      }

      // api받아오기
    },
    [myVotingDates],
  );
  const onDayLongPressHandler = useCallback(
    (e: CalenderClickEventType) => {
      setVisible(true);
      const isSelected = meetingDates.includes(e.dateString);

      setUserSelected(isSelected);
      setUserSelectedDate(e);
    },
    [meetingDates],
  );

  return (
    <>
      <CalendarList
        calendarStyle={styles.calendarStyle}
        onDayPress={onPressHandler}
        minDate={startFrom}
        maxDate={endTo}
        markingType="custom"
        markedDates={selectedDates}
        pastScrollRange={0}
        scrollEnabled
        onDayLongPress={onDayLongPressHandler}
        renderPlaceholder={(_year, _months) => (
          <LoadingComponent size="large" />
        )}
        displayLoadingIndicator={false}
        futureScrollRange={month}
        showScrollIndicator
        theme={CustomCalendarTheme}
        renderHeader={date => {
          if (!date) return null;

          return CalendarHeader(date);
        }}
      />
      {userSelectedDate ? (
        <Overlay
          isVisible={visible}
          onBackdropPress={() => setVisible(!visible)}
          style={{ padding: 0 }}
          overlayStyle={{ padding: 0, borderRadius: 100 }}
        >
          {userSelected ? (
            <DateModal date={userSelectedDate} hostId={hostId || 0} />
          ) : (
            <NoUserModal date={userSelectedDate} />
          )}
        </Overlay>
      ) : null}
    </>
  );
}

export const MemorizedPeriodCalendar = React.memo(PeriodCalendar);

export const MemorizedDefaultCalendar = React.memo(DefaultCalendar);

function Calendar({
  type,
  data,
  totalUsers,
  startFrom,
  endTo,
  setDate,
  hostId,
}: CalendarProps): JSX.Element {
  const styles = useStyles();

  LocaleConfig.defaultLocale = 'kr';

  return (
    <View style={styles.calendarContainer}>
      {type === 'DEFAULT' &&
      data &&
      totalUsers !== undefined &&
      startFrom &&
      endTo ? (
        <MemorizedDefaultCalendar
          data={data}
          totalUsers={totalUsers}
          startFrom={startFrom}
          endTo={endTo}
          hostId={hostId}
        />
      ) : (
        <MemorizedPeriodCalendar setDate={setDate} />
      )}
    </View>
  );
}

export default Calendar;

const useStyles = makeStyles(theme => ({
  calendarContainer: {
    width: '100%',

    height: '98%',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  calendarStyle: {
    width: '100%',
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));
