import { MarkedDates } from 'react-native-calendars/src/types';
import { memoize, reduce } from 'lodash';

import { generateDateRange } from '@shared/utils';
import { SelectedDates } from '../components/calendar/type';
import { customTextStyle } from '../components/calendar/style';
import { IdayConfig } from './type';

const BACKGROUND_DAY = '#EBF4FE';
/**
 * 시작 날짜부터 끝 날짜까지 선택된 범위를 캘린더 속성에 맞게 반환한다.
 */
const generateMarkedDate = memoize(
  (starting: string, ending: string | null): MarkedDates => {
    const dayConfig = createDayConfig(ending);
    const startingDate = createStartingDate(starting, dayConfig);

    if (!ending) {
      return { ...startingDate };
    }

    const endingDate = createEndingDate(ending, dayConfig);
    const selectedDates = createSelectedDates(starting, ending);

    return { ...startingDate, ...endingDate, ...selectedDates };
  },
  (starting, ending) => `${starting}-${ending || 'null'}`,
);

function createDayConfig(ending: string | null): IdayConfig {
  return {
    color: ending ? BACKGROUND_DAY : undefined,
    customTextStyle,
  };
}

function createStartingDate(starting: string, dayConfig: IdayConfig) {
  return {
    [starting]: {
      startingDay: true,
      ...dayConfig,
    },
  };
}

function createEndingDate(ending: string, dayConfig: IdayConfig) {
  return {
    [ending]: {
      endingDay: true,
      ...dayConfig,
    },
  };
}

function createSelectedDates(starting: string, ending: string) {
  return reduce(
    generateDateRange(starting, ending),
    (obj: SelectedDates, date) => {
      // eslint-disable-next-line no-param-reassign
      obj[date] = { color: BACKGROUND_DAY };

      return obj;
    },
    {},
  );
}

export default generateMarkedDate;
