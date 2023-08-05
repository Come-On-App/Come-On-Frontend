import React from 'react';

import DateRange from '@post/components/dateRange/DateRange';
import usePostManagement from '@post/hooks/usePostManagement';

const TITLE = '투표 기간';
const DESCRIPTION = '날짜 범위를 선택해 주세요';

export default function VotingTimeRangePicker() {
  const {
    postState: { dateRange },
  } = usePostManagement();

  return (
    <DateRange title={TITLE} description={DESCRIPTION} dateRange={dateRange} />
  );
}
