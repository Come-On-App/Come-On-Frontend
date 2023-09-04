import React from 'react';

import ScreenLayout from '@shared/components/layout/ScreenLayout';
import Calendar from '@shared/components/calendar/Calendar';
import { convertDateRangeToDateInfo } from '@shared/utils';
import { IvoteCalendar } from './type';

export default function VoteCalendar({
  range,
  onDayPress,
  fixedDate,
}: IvoteCalendar) {
  const loadPreviousDateHandler = () => convertDateRangeToDateInfo(range);

  return (
    <ScreenLayout>
      <Calendar
        blockLocalEvent
        focusDate={fixedDate?.startFrom}
        current={range.startFrom}
        loadPreviousDate={loadPreviousDateHandler}
        onDayPress={onDayPress}
      />
    </ScreenLayout>
  );
}
