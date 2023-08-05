import type { DateData } from 'react-native-calendars';

const checkDateRelationship = (
  endingDay: DateData | null,
  startingDay: DateData | null,
  targetDay: DateData,
) => {
  // 시작일과 끝일이 모두 비어있는지 확인
  const isEmptyDay = !startingDay && !endingDay;
  // 시작일과 끝일이 모두 존재하는지 확인
  const startingAndEndingDays = startingDay && endingDay;
  // 시작일이 선택한 날짜(targetDay) 보다 이전 연도인지 확인
  const isEarlierYear = startingDay && startingDay.year < targetDay.year;
  // 시작일이 선택한 날짜(targetDay) 보다 이후 연도인지 확인
  const isLaterYear = startingDay && startingDay.year > targetDay.year;
  // 시작일이 선택한 날짜(targetDay) 보다 이후 월인지 확인
  const isLaterMonth = startingDay && startingDay.month > targetDay.month;
  // 시작일이 선택한 날짜(targetDay) 보다 이전 월인지 확인
  const isEarlierMonth = startingDay && startingDay.month < targetDay.month;
  // 시작일이 선택한 날짜(targetDay) 보다 이후 일인지 확인
  const isLaterDay = startingDay && startingDay.day > targetDay.day;
  // 시작일이 선택한 날짜(targetDay) 보다 이전 일인지 확인
  const isEarlierDay = startingDay && startingDay.day < targetDay.day;

  return {
    isEmptyDay,
    startingAndEndingDays,
    isEarlierYear,
    isLaterYear,
    isLaterMonth,
    isEarlierMonth,
    isLaterDay,
    isEarlierDay,
  };
};

export default checkDateRelationship;
