import { MarkedDates } from 'react-native-calendars/src/types';
import _ from 'lodash';

import { getDatesInRange } from '@shared/utils';
import { SelectedDates } from '../components/calendar/type';
import { customTextStyle } from '../components/calendar/style';

/**
 * 시작 날짜부터 끝 날짜까지 선택된 범위를 캘린더 속성에 맞게 반환한다.
 */
export default function markedDate(
  starting: string,
  ending: string | null,
): MarkedDates {
  const backgroundDay = '#EBF4FE';
  const dayConfig = {
    color: ending ? backgroundDay : undefined,
    customTextStyle,
  };
  const startingDate = {
    [starting]: {
      startingDay: true,
      ...dayConfig,
    },
  };

  if (!ending) {
    return { ...startingDate };
  }

  const markedDates = {
    ...startingDate,
    [ending]: {
      endingDay: true,
      ...dayConfig,
    },
  };
  // 시작 - 끝 중간 범위 값 계산
  const selectedDates = _.reduce(
    getDatesInRange(starting, ending),
    (obj: SelectedDates, date) => {
      // eslint-disable-next-line no-param-reassign
      obj[date] = { color: backgroundDay };

      return obj;
    },
    {},
  );

  return { ...markedDates, ...selectedDates };
}
